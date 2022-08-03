<?php

namespace App\Console\Commands;

use App\Models\orders;
use App\Models\Payments;
use App\Models\StoreSettings;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Avalara;

class PushOrderShopify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pushorder:shopify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This cronjob will send the order to shopify if user go without complete upsell follow.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $date = new DateTime;
        $date->modify('-15 minutes');
        $now = $date->format('Y-m-d H:i:s');
        $orders = orders::where([['created_at', '<=', $now],['shopify_order_number', '=', null]])->latest()->get();
        foreach ($orders as $order) {
            Log::info($order->id);
            echo $name = $order->id;
            $customeremail = $order->email;
            $productinfofull = json_decode($order->product_info,true);
            $billing_address = json_decode($order->billing_address,true);
            $shipping_address = json_decode($order->shipping_address,true);
            $subtotal_price = $order->subtotal_price;
            $shipping_detail = json_decode($order->shipping_detail,true);
            $discountinfo = json_decode($order->discount,true);
            $cart_token =$order->cart_token;
            $orderdiscount = array();
            if(!empty($discountinfo['code'])){
                $orderdiscount = array("code"=> $discountinfo['code'],"amount"=> $discountinfo['amount'],"type"=> $discountinfo['type']);
            }
            $shopify_customerid='';
            $totaltax =  $order->tax;
            $total_price = $order->total_price;
            $allpayments =$order->paymentsinfo;            
            $avalara_company = StoreSettings::where(['option_name' => 'avalara_company'])->get(['option_value'])->first();
            $avalara_license_key=StoreSettings::where(['option_name' => 'avalara_license_key'])->get(['option_value'])->first();
            $avalara_environment=StoreSettings::where(['option_name' => 'avalara_environment'])->get(['option_value'])->first();
            $avalara_accountid=StoreSettings::where(['option_name' => 'avalara_accountid'])->get(['option_value'])->first();
            $shipping_address1=StoreSettings::where(['option_name' => 'shipping_address1'])->get(['option_value'])->first();
            $shipping_city=StoreSettings::where(['option_name' => 'shipping_city'])->get(['option_value'])->first();
            $shipping_state=StoreSettings::where(['option_name' => 'shipping_state'])->get(['option_value'])->first();
            $shipping_postalcode=StoreSettings::where(['option_name' => 'shipping_postalcode'])->get(['option_value'])->first();
            $shipping_country=StoreSettings::where(['option_name' => 'shipping_country'])->get(['option_value'])->first();
            $shopify_currency_code=StoreSettings::where(['option_name' => 'shopify_currency_code'])->get(['option_value'])->first();
            $shopify_main_domain=StoreSettings::where(['option_name' => 'shopify_main_domain'])->get(['option_value'])->first();
            $checkout_domain=StoreSettings::where(['option_name' => 'checkout_domain'])->get(['option_value'])->first();
            $shopify_domain = StoreSettings::where(['option_name' => 'shopify_domain'])->get(['option_value'])->first();
            $shopify_adminapi_access_token=StoreSettings::where(['option_name' => 'shopify_adminapi_access_token'])->get(['option_value'])->first();
            $shopify_api_version=StoreSettings::where(['option_name' => 'shopify_api_version'])->get(['option_value'])->first();

            $payments = Payments::where(['order_id' => $order->id])->get(['transaction_id','payment_status','pay_amount']);
            $shopifypayments = $shopifyline_items = array();
            foreach($payments as $payments){  
                array_push($shopifypayments,array("kind"=> "sale","status"=> "success","amount"=> number_format((float)$payments['pay_amount']/100, 2, '.', ''),"authorization"=> $payments['transaction_id'],"gateway"=> "stripe"));
            }
                $client = new Avalara\AvaTaxClient('phpTestApp', '1.0', 'localhost', $avalara_environment['option_value']);
                $client->withLicenseKey($avalara_accountid['option_value'], $avalara_license_key['option_value']);
                $saletransition = new Avalara\TransactionBuilder($client, $avalara_company['option_value'], Avalara\DocumentType::C_SALESORDER, 'ABC');
                $saletaxck = $saletransition->withAddress('ShipFrom', $shipping_address1['option_value'], null, null, $shipping_city['option_value'], $shipping_state['option_value'], $shipping_postalcode['option_value'], $shipping_country['option_value']);
                if(empty($shipping_address['address2'])){
                    $saletaxck = $saletransition->withAddress('ShipTo', $shipping_address['address1'], null, null, $shipping_address['city'], $shipping_address['province'], $shipping_address['zip'], $shipping_address['country']);
                }else{
                    $saletaxck = $saletransition->withAddress('ShipTo', $shipping_address['address1'], $shipping_address['address2'], null, $shipping_address['city'], $shipping_address['province'], $shipping_address['zip'], $shipping_address['country']);	
                }
                foreach($productinfofull as $product){
                    if($product['taxable']==1){
                        $url = "https://".$shopify_domain['option_value'].".myshopify.com/admin/api/".$shopify_api_version['option_value']."/products/".$product['product_id']."/variants/".$product['variant_id'].".json";
                        $ans_ch = curl_init();
                        $timeout = 200;
                        $user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0';
                        curl_setopt($ans_ch, CURLOPT_URL, $url);
                        curl_setopt($ans_ch, CURLOPT_HTTPHEADER,array('Content-Type: application/json','X-Shopify-Access-Token:'.$shopify_adminapi_access_token['option_value'].'','User-Agent:'.$user_agent.''));	
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
                        if (isset($error_msg)) {
                        $result['error_msg'] = $error_msg;
                        }
                        $variationresponse = json_decode($body,true);
                        $taxcode = $variationresponse['variant']['tax_code'];  
                        array_push($shopifyline_items,array("variant_id" => $product['variant_id'],"productname" => $product['title'],"price" => round($product['final_price']/100,2), "quantity" =>$product['quantity'],"tax_code"=>$taxcode));	
                            $productname = substr(preg_replace('/\s+/', ' ', (string)str_replace(array("/", '"', ".","-"), '', $product['product_title'])), 0, 46) . ' ...';
                        $saletaxck = $saletransition->withLine(round($product['original_line_price']/100,2), $product['quantity'], $productname, $taxcode);
                    }
                }
                $saletaxck = $saletransition->withExemptLine($shipping_detail['amount'], $shipping_detail['code'], "NT");
                $saletaxck = $saletransition->create();
                $fulltaxsummery = $saletaxck->summary;
                $shipping_lines = array(array("code"=>$shipping_detail['code'],"price"=>$shipping_detail['amount'],"price_set"=>array("shop_money"=>array("amount"=>$shipping_detail['amount'],"currency_code"=>$shopify_currency_code['option_value'])),"discounted_price"=>$shipping_detail['amount'],"discounted_price_set"=>array("shop_money"=>array("amount"=>$shipping_detail['amount'],"currency_code"=>$shopify_currency_code['option_value'])),"source"=>"Standard Shipping","title"=>$shipping_detail['code']));
                $taxarray=array();
                foreach($fulltaxsummery as $taxdetails){
                    array_push($taxarray,array("price"=>$taxdetails->taxCalculated,"rate"=>$taxdetails->rate,"title"=>$taxdetails->taxName));
                }
                $shopifyorderarray=array(
                    "order"=>array(
                    "tags"=>"Onepage_checkout",
                    "line_items"=>$shopifyline_items,
                    "email"=>$customeremail,
                    "phone"=>$shipping_address['phone'],
                    "billing_address"=> $billing_address,
                    "cart_token" => $cart_token,
                    "shipping_address"=>$shipping_address,
                    "transactions"=>$shopifypayments,
                    "financial_status"=> "paid",
                    "discount_codes"=> $orderdiscount,
                    "shipping_lines" => $shipping_lines,
                    "currency"=> $shopify_currency_code['option_value'],
                    "total_tax"=> $totaltax,
                    "tax_lines"=>$taxarray
                    ),
                    "customer"=>array("id"=> $shopify_customerid)
                    );
                    $ans_body = json_encode($shopifyorderarray,true);
                    $url = "https://".$shopify_domain['option_value'].".myshopify.com/admin/api/".$shopify_api_version['option_value']."/orders.json";
                    $ans_ch = curl_init();
                    $timeout = 200;
                    $user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0';
                    curl_setopt($ans_ch, CURLOPT_URL, $url);
                    curl_setopt($ans_ch, CURLOPT_POST, 1);
                    curl_setopt($ans_ch, CURLOPT_HEADER, 0);
                    curl_setopt($ans_ch, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($ans_ch, CURLOPT_FAILONERROR, true);
                    curl_setopt($ans_ch,CURLOPT_USERAGENT,$user_agent);
                    curl_setopt($ans_ch, CURLOPT_HTTPHEADER,array('Content-Type: application/json','X-Shopify-Access-Token:'.$shopify_adminapi_access_token['option_value'].''));	
                    curl_setopt($ans_ch, CURLOPT_CONNECTTIMEOUT, $timeout);
                    curl_setopt($ans_ch, CURLOPT_POSTFIELDS, $ans_body);
                    $result_get = curl_exec($ans_ch);
                    if (curl_error($ans_ch)) {
                    $error_msg = curl_error($ans_ch);
                    }
                    $httpcode = curl_getinfo($ans_ch, CURLINFO_HTTP_CODE);
                    curl_close($ans_ch);
                    if (isset($error_msg)) {
                    $result['error_msg'] = $error_msg;
                    }
                    $orderresponse = json_decode($result_get,true);
                    $shopify_order_id = $orderresponse['order']['id'];
                    $shopify_ordername =  $orderresponse['order']['name'];
                    $shopify_order_number =  $orderresponse['order']['order_number'];
                    $shopify_financial_status =$orderresponse['order']['financial_status'];
                    $shopify_customerid =$orderresponse['order']['customer']['id'];
                    //send the shopfiy detail to update in db
                    $order->update(['shopify_order_number' => $shopify_order_number, 'shopify_order_name' => $shopify_ordername, 'shopify_order_id' => $shopify_order_id,'orders_status'=>$shopify_financial_status,'fulfillment_status'=>"Unfulfilled"]);
        }
    }
}
