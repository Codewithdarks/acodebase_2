<?php

namespace App\Http\Controllers;

define('MAX_FILE_LIMIT', 1024 * 1024 * 2); //2 Megabytes max html file size
define('UPLOAD_PATH', 'media'); //upload path
use App\Models\PageBuilder;
use App\Models\Upsellfunnels;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\Models\StoreSettings;
use Illuminate\Support\Facades\Crypt;

class BuilderController extends Controller
{
    public function PagesListing(Request $request) {
        if ($request->ajax()) {
            $data = PageBuilder::latest()->get();
            return DataTables::of($data)->addIndexColumn()->addColumn('action', function ($data) {
                if(!$data->published){$eyeicon = 'fa-eye-slash';$funnelaction="Publish Page";}else{$eyeicon = 'fa-eye';$funnelaction="Un-Publish Page";}
                return '<a title="Edit Page Details" href="'.route('builder.edit.page', encrypt($data->id)).'" class="table-btn btn"><i class="fas fa-edit"></i></a><a title="Delete Page" href="'.route('builder.delete.page', encrypt($data->id)).'" class="delete-page-confirm table-btn btn"><i class="fas fa-trash-alt"></i></a><a title="'.$funnelaction.'" href="'.route('builder.page.publish-unpublish', encrypt($data->id)).'" class="table-btn btn"><i class="fas '.$eyeicon.'"></i></a><a href="'.route('editor', $data->url_slug).'" class="btn btn-primary btn-sm">Editor</a>';
            })->editColumn('funnel_id', function($data){ $funnel = Upsellfunnels::find($data->funnel_id); if (is_null($funnel) || empty($funnel)) { return 'N/A'; } else { return $funnel->name; } })->editColumn('published', function($data){ return $data->published ? 'Published' : 'Un-Published'; })->rawColumns(['action'])->make(true);
        }
        return view('builder.pages.listing');
    }

    public function CreatePageForBuilder() {
        $funnels = Upsellfunnels::all();
        return view('builder.pages.create', compact('funnels'));
    }

    public function StorePageForBuilder(Request $request) {
        $data = $this->validate($request, [
            'page_name' => 'required|string|unique:page_builders,name',
            'funnel_id' => 'nullable|integer'
        ]);
        $data['url_slug'] = $this->CreateSlug($data['page_name']);
        $build = PageBuilder::create([
            'name' => $data['page_name'],
            'url_slug' => $data['url_slug'],
            'funnel_id' => $data['funnel_id'] ?? null,
            'html' => view('builder.pageeditor.blank')
        ]);
        return redirect()->route('editor', $build->url_slug);
    }

    private function CreateSlug($string) {
        $delimiter = '-';
        return strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z\d-]+/', $delimiter, preg_replace('/&/', 'and', preg_replace('/\'/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $string))))), $delimiter));
    }

    public function Editor($active) {
        $find = PageBuilder::where(['url_slug' => $active])->first();
        if (is_null($find) || empty($find)) {
            abort(404);
        }
        $list = array(
            'name' => $find->url_slug,
            'title' => 'Current Page ('.$find->name.')',
            'url' => route('get.content', encrypt($find->id)),
            'file' => encrypt($find->id),
        );
        $file = encrypt($find->id);
        $all = json_encode($list);
        return view('builder.pageeditor.editor', compact('all', 'active', 'file'));
    }

    public function GetPageContent($id) {
        $page = PageBuilder::find(decrypt($id));
        return $page['html'];
    }

    public function EditPageForBuilder($id) {
        $page = PageBuilder::find(decrypt($id));
        $funnels = Upsellfunnels::all();
        return view('builder.pages.update_page', compact('page', 'funnels'));
    }

    public function UpdatePageForBuilder(Request $request, $id) {
        $data = $this->validate($request, [
            'page_name' => 'required|string',
            'funnel_id' => 'nullable|string',
        ]);
        $page = PageBuilder::find(decrypt($id));
        $slug = $this->CreateSlug($data['page_name']);

        $update = $page->update([
            'name' => $data['page_name'],
            'funnel_id' => $data['funnel_id'] ?? null,
            'url_slug' => $slug,
        ]);
        if ($update !== true){
            return redirect()->route('builder.listing')->with('error', 'Something Went Wrong');
        }
        return  redirect()->route('builder.listing')->with('success', 'Updated Successfully');
    }

    public function DeletePageForBuilder($id) {
        $page = PageBuilder::find(decrypt($id));
        $status = $page->delete();
        if ($status) {
            return redirect()->back()->with('success', 'Deleted Successfully');
        }
        return redirect()->back()->with('error', 'Something Went Wrong.');
    }

    public function PagePublishUnpublish($id) {
        $page = PageBuilder::find(decrypt($id));
        if ($page->published) {
            $page->update(['published' => false]);
        } else {
            $page->update(['published' => true]);
        }
        return redirect()->back()->with('success', 'Status changed successfully');
    }

    public function SaveContent(Request $request) {
        $data = $request->all();
        if (!empty($data['startTemplateUrl'])) {
            $html = file_get_contents(resource_path('views/vvvebjs/blank.blade.php'));
        } elseif ($data['html'] !== null) {
            $html = substr($data['html'], 0, MAX_FILE_LIMIT);
        }
        $file = $data['file'];
        $data = PageBuilder::find(decrypt($file));
        $status = $data->update(['html' => $html]);
        if ($status) {
            return response('Saved Successfully.', 200);
        } else {
            return response('Something Went Wrong.', 500);
        }
    }

    public function FileContent($loc) {
        return view('builder.pageeditor.landing_pages.'.$loc);
    }

    public function UploadImage(Request $request) {
        logger(json_encode($request->all()));
        $upload_path = public_path('media/');
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $name = strtotime(now()).$file->getClientOriginalName();
            $file->move($upload_path, $name);
            return 'media/'.$name;
        }
        return false;
    }

    public function GetStoreProducts(Request $request) {
        
        $shopify_domain = StoreSettings::where(['option_name' => 'shopify_domain'])->get(['option_value'])->first();
        $shopify_adminapi_access_token=StoreSettings::where(['option_name' => 'shopify_adminapi_access_token'])->get(['option_value'])->first();
        $shopify_api_version=StoreSettings::where(['option_name' => 'shopify_api_version'])->get(['option_value'])->first();
        $url = "https://".$shopify_domain['option_value'].".myshopify.com/admin/api/".$shopify_api_version['option_value']."/products.json?limit=20";
        if(!empty($request->page_info)){
        $url .=  '&page_info='.$request->page_info;
        }
        
        $ans_ch = curl_init();
        $timeout = 200;
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        curl_setopt($ans_ch, CURLOPT_URL, $url);
        curl_setopt($ans_ch, CURLOPT_HTTPHEADER,array('Content-Type: application/json','X-Shopify-Access-Token:'.$shopify_adminapi_access_token['option_value'].''));	
        curl_setopt($ans_ch, CURLOPT_HEADER, true);
        curl_setopt($ans_ch, CURLOPT_RETURNTRANSFER, true);
        $result_get = curl_exec($ans_ch);
        if (curl_error($ans_ch)) {
        $error_msg = curl_error($ans_ch);
        }
        $header_size = curl_getinfo($ans_ch, CURLINFO_HEADER_SIZE);
        $header = substr($result_get, 0, $header_size);
        $body = substr($result_get, $header_size);
        $httpcode = curl_getinfo($ans_ch, CURLINFO_HTTP_CODE);
        curl_close($ans_ch);
        $result['response_body'] = $body;
        $result['response_code'] = $httpcode;
        $result['response_paginate'] = $this->get_paginate_from_curl_response($result_get);
        if (isset($error_msg)) {
        $result['error_msg'] = $error_msg;
        }
        return $result;
    }
    public function get_paginate_from_curl_response($response){
        $headers = array();
        $pagination = array();
        $header_text = substr($response, 0, strpos($response, "\r\n\r\n"));
        foreach (explode("\r\n", $header_text) as $i => $line)
            if ($i === 0)
                $headers['http_code'] = $line;
            else
            {
                list ($key, $value) = explode(': ', $line);

                $headers[$key] = $value;
            }
            if (strpos($headers['link'], 'rel="next"') !== false && strpos($headers['link'], 'rel="previous"') == false) {
               $pagination['next']=  parse_url($this->get_string_between($headers['link'],'<','>; rel="next"'), PHP_URL_QUERY); 
            }
            elseif (strpos($headers['link'], 'rel="next"') !== false && strpos($headers['link'], 'rel="previous"') !== false) {
                $pagination['previous']= parse_url($this->get_string_between($headers['link'],'<','>; rel="previous"'), PHP_URL_QUERY); 
                $pagination['next']= parse_url($this->get_string_between($headers['link'],', <','>; rel="next"'), PHP_URL_QUERY); 
                
             }
        return json_encode($pagination,true);
    }

    public function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }

    public function ScanFileDirectory(Request $request) {
        $scandir = public_path('media');
        // Run the recursive function
        // This function scans the files folder recursively, and builds a large array

        $scan = function ($dir) use ($scandir, &$scan) {
            $files = [];

            // Is there actually such a folder/file?
            if (file_exists($dir)) {
                foreach (scandir($dir) as $f) {
                    if (! $f || $f[0] == '.') {
                        continue; // Ignore hidden files
                    }

                    if (is_dir($dir . '/' . $f)) {
                        // The path is a folder

                        $files[] = [
                            'name'  => $f,
                            'type'  => 'folder',
                            'path'  => str_replace($scandir, '', $dir) . '/' . $f,
                            'items' => $scan($dir . '/' . $f), // Recursively get the contents of the folder
                        ];
                    } else {
                        // It is a file

                        $files[] = [
                            'name' => $f,
                            'type' => 'file',
                            'path' => asset('media'.str_replace($scandir, '', $dir) . '/' . $f),
                            'size' => filesize($dir . '/' . $f), // Gets the size of this file
                        ];
                    }
                }
            }

            return $files;
        };

        $response = $scan($scandir);
        return response(array('name'  => '', 'type'  => 'folder', 'path'  => '', 'items' => $response), 200);
    }

    /**
     * @param $directory
     * @return array
     */
    private function ScanDirectoryForFiles($path, $directory) {
        $assets = [];
        foreach ($directory as $one) {
            if (! $one || $one[0] == '.') {
                continue; // Ignore hidden files
            }
            if (is_dir($path.'/'.$one)) {
                $newfiles = array_diff(scandir($path.'/'.$one), array('.', '..'));
                $assets[] = [
                    'name' => $one,
                    'type' => 'folder',
                    'path' => $one,
                    'size' => $this->ScanDirectoryForFiles($path.'/'.$one, $newfiles)
                ];
            } else {
                $assets[] = [
                    'name' => $one,
                    'type' => 'file',
                    'path' => '/'.$one,
                    'size' => filesize($path.'/'.$one)
                ];
            }
        }
        return $assets;
    }
}
