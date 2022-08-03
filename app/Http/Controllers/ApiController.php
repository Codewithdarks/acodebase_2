<?php

namespace App\Http\Controllers;

use App\Models\orders;
use App\Models\Payments;
use App\Models\PaymentGateways;
use App\Models\StoreSettings;
use App\Models\Country;
use App\Models\States;
use App\Models\Customers;
use App\Models\TrackingCode;
use Illuminate\Http\Request;
use App\Models\Upsellfunnels;
use App\Models\Upsellfunnel_downsellproducts;
use App\Models\Upsellfunnel_upsellproducts;
use Illuminate\Support\Facades\Log;
use Validator;
use Stripe;
use Illuminate\Support\Facades\Crypt;

class ApiController extends Controller
{
    public function GetPaymentCredentials(Request $request)
    {
        $key = $request->header('authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $why_choose = array();
        for ($i = 1; $i < 5; $i++) {
            $record = StoreSettings::where(['option_name' => 'choose-' . $i])->first();
            if (!is_null($record) || !empty($record)) {
                $why_choose[] = json_decode($record->option_value);
            }
        }
        $review = array();
        for ($i = 1; $i < 5; $i++) {
            $record = StoreSettings::where(['option_name' => 'review-' . $i])->first();
            if (!is_null($record) || !empty($record)) {
                $review[] = json_decode($record->option_value);
            }
        }
        $response = array(
            'status' => true,
            'logo' => (new SettingsController)->RetrieveValue('logo'),
            'favicon' => (new SettingsController)->RetrieveValue('favicon'),
            'checkout_code' => (new GlobalCodeController)->RetrieveCodeValue('checkout_page'),
            'checkout_secure_logo' => (new SettingsController)->RetrieveValue('checkout_secure_logo'),
            'shipping_note' => (new SettingsController)->RetrieveValue('shipping_note'),
            'why_choose' => $why_choose,
            'review' => $review
        );
        $keys = PaymentGateways::where(['gateway_name' => 'stripe'])->get()->first();
        if ($keys !== null) {
            $key = json_decode($keys['gateway_settings']);
            if ($keys->status == 'sandbox') {
                $show = $key->sandbox_publishable;
            } else {
                $show = $key->production_publishable;
            }
            $response['publishable_key'] = $show;
            $response['key_status'] = $keys->status;
        } else {
            $response['publishable_key'] = '';
            $response['key_status'] = 'sandbox';
        }
        return response($response);
    }

    public function GetThankyouCredentials(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $response = array(
            'status' => true,
            'logo' => (new SettingsController)->RetrieveValue('logo'),
            'favicon' => (new SettingsController)->RetrieveValue('favicon'),
            'thankyou_code' => (new GlobalCodeController)->RetrieveCodeValue('thanks_page'),
        );
        return response($response);
    }

    public function FetchOrderInDB(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'id' => 'required|numeric|exists:orders,id',
        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }

        $orders = orders::where(['id' => $request['id']])->get()->first();
        return $orders;
    }

    public function FetchOrdernPaymentInDB(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'id' => 'required|numeric|exists:orders,id',
        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }

        $orders = orders::where(['id' => $request['id']])->get()->first();
        $payments = Payments::where(['order_id' => $request['id']])->get(['transaction_id', 'payment_status', 'pay_amount']);
        $response = array(
            'status' => true,
            'orderinfo' => $orders,
            'paymentsinfo' => $payments,

        );
        return response($response);

    }

    public function CreateOrderInDB(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'email' => 'nullable|string',
            'product_info' => 'nullable|array',
            'billing_address' => 'nullable|array',
            'shipping_address' => 'nullable|array',
            'subtotal_price' => 'nullable|string',
            'shipping' => 'nullable|string',
            'shipping_detail' => 'nullable|array',
            'discount' => 'nullable|array',
            'tax' => 'nullable|string',
            'total_price' => 'nullable|string',
            'refunded_amount' => 'nullable|string',
            'refunded_date' => 'nullable|date',
            'token' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }

        $stripetoken = $request['token'];
        $keys = PaymentGateways::where(['gateway_name' => 'stripe'])->get()->first();
        if ($keys !== null) {
            $key = json_decode($keys['gateway_settings']);
            if ($keys->status == 'sandbox') {
                $stripesecretkey = $key->sandbox_secret;
            } else {
                $stripesecretkey = $key->production_secret;
            }
        } else {
            $stripesecretkey = '';
        }

        try {
            // Use Stripe's library to make requests...
            Stripe\Stripe::setApiKey($stripesecretkey);
            $getcustomer = \Stripe\Customer::all([
                'limit' => 1,
                'email' => $request->email,
            ]);
            // echo "<pre>";print_r($getcustomer->data);echo "</pre>";
            if (!empty($getcustomer->data)) {
                $stripe = new \Stripe\StripeClient($stripesecretkey);
                $stripe->customers->update($getcustomer->data[0]->id, ['source' => $stripetoken]);
                $exist = Customers::where(['customer_email' => $request->email])->get()->first();
                if ($exist !== null) {
                    $exist->update([
                        'stripecustomer_id' => $getcustomer->data[0]->id
                    ]);
                    try {
                        // Use Stripe's library to make requests...
                        $charge = Stripe\Charge::create([
                            "amount" => $request['total_price'] * 100,
                            "currency" => "USD",
                            //"source" =>$stripetoken,
                            'customer' => $getcustomer->data[0]->id,
                            "description" => "Payment from onepage checkout",
                        ]);

                    } catch (\Stripe\Exception\CardException $e) {
                        // Since it's a decline, \Stripe\Exception\CardException will be caught
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\RateLimitException $e) {
                        // Too many requests made to the API too quickly
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\InvalidRequestException $e) {
                        // Invalid parameters were supplied to Stripe's API
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\AuthenticationException $e) {
                        // Authentication with Stripe's API failed
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\ApiConnectionException $e) {
                        // Network communication with Stripe failed
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\ApiErrorException $e) {
                        // Display a very generic error to the user, and maybe send
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (Exception $e) {
                        // Something else happened, completely unrelated to Stripe
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    }

                } else {
                    $data = array(
                        'customer_email' => $request['email'],
                        'stripecustomer_id' => $getcustomer->data[0]->id
                    );
                    $insertcustomer = Customers::create($data);
                    try {
                        // Use Stripe's library to make requests...
                        $charge = Stripe\Charge::create([
                            "amount" => $request['total_price'] * 100,
                            "currency" => "USD",
                            // "source" =>$stripetoken,
                            'customer' => $getcustomer->data[0]->id,
                            "description" => "Payment from onepage checkout",
                        ]);

                    } catch (\Stripe\Exception\CardException $e) {
                        // Since it's a decline, \Stripe\Exception\CardException will be caught
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\RateLimitException $e) {
                        // Too many requests made to the API too quickly
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\InvalidRequestException $e) {
                        // Invalid parameters were supplied to Stripe's API
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\AuthenticationException $e) {
                        // Authentication with Stripe's API failed
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\ApiConnectionException $e) {
                        // Network communication with Stripe failed
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (\Stripe\Exception\ApiErrorException $e) {
                        // Display a very generic error to the user, and maybe send
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    } catch (Exception $e) {
                        // Something else happened, completely unrelated to Stripe
                        $response = array(
                            'status' => false,
                            'response' => $e->getError()->message
                        );
                    }
                }
            } else {

                try {
                    // Use Stripe's library to make requests...
                    $customer = \Stripe\Customer::create([
                        'source' => $stripetoken,
                        'email' => $request->email,
                    ]);
                    $data = array(
                        'customer_email' => $request['email'],
                        'stripecustomer_id' => $customer->id
                    );
                    $insertcustomer = Customers::create($data);
                    //$customerid = $insertcustomer['id'];
                    $charge = Stripe\Charge::create([
                        "amount" => $request['total_price'] * 100,
                        "currency" => "USD",
                        // "source" =>$stripetoken,
                        'customer' => $customer->id,
                        "description" => "Payment from onepage checkout",
                    ]);

                } catch (\Stripe\Exception\CardException $e) {
                    // Since it's a decline, \Stripe\Exception\CardException will be caught
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (\Stripe\Exception\RateLimitException $e) {
                    // Too many requests made to the API too quickly
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (\Stripe\Exception\InvalidRequestException $e) {
                    // Invalid parameters were supplied to Stripe's API
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (\Stripe\Exception\AuthenticationException $e) {
                    // Authentication with Stripe's API failed
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (\Stripe\Exception\ApiConnectionException $e) {
                    // Network communication with Stripe failed
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (\Stripe\Exception\ApiErrorException $e) {
                    // Display a very generic error to the user, and maybe send
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                } catch (Exception $e) {
                    // Something else happened, completely unrelated to Stripe
                    $response = array(
                        'status' => false,
                        'response' => $e->getError()->message
                    );
                }

            }
            //echo $getcustomer->data[0]->id;
            //exit();
            //return $charge;
            if ($charge['status'] == 'paid') {
                $data = array(
                    'name' => $request['name'],
                    'email' => $request['email'],
                    'product_info' => json_encode($request['product_info']),
                    'billing_address' => json_encode($request['billing_address']),
                    'shipping_address' => json_encode($request['shipping_address']),
                    'subtotal_price' => $request['subtotal_price'],
                    'shipping' => $request['shipping'],
                    'shipping_detail' => json_encode($request['shipping_detail']),
                    'discount' => json_encode($request['discount']),
                    'tax' => $request['tax'],
                    'total_price' => $request['total_price'],
                    'payment_gateway' => $request['payment_gateway'],
                    'cart_token' => $request['cart_token'],
                    'shopify_customerid' => $request['shopify_customerid'],
                    'order_from' => $request['order_from'] ?? 'web'
                );

                $insertorder = orders::create($data);

                $paydata = array("transaction_id" => $charge['id'],
                    "payment_status" => $charge['status'],
                    "pay_amount" => $charge['amount'],
                    "gateway_response" => $charge,
                    "order_id" => $insertorder['id'],
                );
                $insertpayment = payments::create($paydata);
                $response = array(
                    'status' => true,
                    'response' => 'Order Created Successfully!',
                    'orderid' => $insertorder['id'],
                    'transaction_id' => $charge['id'],
                );
                if (!$insertorder) {
                    $response = array(
                        'status' => false,
                        'response' => 'Order Creation Failed!'
                    );
                }
            } else {
                $response = array(
                    'status' => false,
                    'response' => 'Payment failed!'
                );
            }

        } catch (\Stripe\Exception\CardException $e) {
            // Since it's a decline, \Stripe\Exception\CardException will be caught
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (\Stripe\Exception\RateLimitException $e) {
            // Too many requests made to the API too quickly
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            // Invalid parameters were supplied to Stripe's API
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (\Stripe\Exception\AuthenticationException $e) {
            // Authentication with Stripe's API failed
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            // Network communication with Stripe failed
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Display a very generic error to the user, and maybe send
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        } catch (Exception $e) {
            // Something else happened, completely unrelated to Stripe
            $response = array(
                'status' => false,
                'response' => $e->getError()->message
            );
        }
        return response($response);
    }

    public function getUpsellDownsells(Request $request, $tag)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $explore = explode('_', $tag);
        $tag = $explore[1];
        $tag = Upsellfunnels::where(['tag' => $tag, 'status' => 'enable'])->first();
//        $downsell = Upsellfunnel_downsellproducts::where(['upsellid' => $tag->id, 'dnstatus' => 'Enable'])->get();
        $upsell = Upsellfunnel_upsellproducts::where(['funnelid' => $tag->id])->get();
        $upsell->map(function ($one) {
            $value = Upsellfunnel_downsellproducts::where(['upsellid' => $one->id])->get();
            foreach ($value as $val) {
                unset($val['created_at']);
                unset($val['updated_at']);
            }
            unset($one['created_at']);
            unset($one['updated_at']);
            $one['downsell'] = $value;
        });
        return response(array('status' => true, 'data' => array('upsell' => $upsell)), 200);
    }

    public function UpdateOrderInDB(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'id' => 'required|numeric|exists:orders,id',
            'shopify_order_id' => 'nullable|numeric',
            'shopify_order_name' => 'nullable|string',
            'shopify_order_number' => 'nullable|numeric',
            'orders_status' => 'nullable|string',
            'fulfillment_status' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }
        $data = array(
            'shopify_order_id' => $request['shopify_order_id'],
            'shopify_order_name' => $request['shopify_order_name'],
            'shopify_order_number' => $request['shopify_order_number'],
            'orders_status' => $request['orders_status'],
            'fulfillment_status' => $request['fulfillment_status'],
        );
        $updateorder = orders::find($request['id'])->update($data);
        //$update = $findorder->update($data);

        $response = array(
            'status' => true,
            'response' => 'Order Update Successfully!',
        );
        if ($updateorder !== true) {
            $response = array(
                'status' => false,
                'response' => 'Order Update Failed!'
            );
        }

        return response($response);
    }


    /**
     * Returning Country Information Through Get Request.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function CountriesResponse(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $countries = Country::all();
        $response = array(
            'status' => true,
            'response' => $countries
        );
        return response($response, 200);

    }

    /**
     * Returning the State List based on Country Code..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function StatesResponse(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'country_code' => 'required|string'
        ]);
        if ($validate->fails()) {
            return response($validate->messages(), 400);
        }
        $states = States::where(['country_code' => $request['country_code']])->orderBy('name', 'ASC')->get();
        $response = array(
            'status' => true,
            'response' => $states
        );
        return response($response, 200);
    }

    /**
     * Authenticating access token.
     *
     * @param $token
     * @return bool
     */
    private function AuthenticateToken($token)
    {
        if (env('API_KEY') !== $token) {
            return false;
        }
        return true;
    }

    /**
     * Verify Shopify Webhook.
     *
     * @param $token
     * @return bool
     */

    private function VerifyShopifyWebhook($data, $hmac_header)
    {
        $calculated_hmac = base64_encode(hash_hmac('sha256', $data, env('SHOPIFY_APP_SECRET'), true));
        return hash_equals($hmac_header, $calculated_hmac);
    }

    /**
     * Returning the single upsell or downsell based on ID..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function PreviewupdnsellResponse(Request $request)
    {

        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }

        $validate = Validator::make($request->all(), [
            'id' => 'required|string',
            'type' => 'required|string'
        ]);
        if ($validate->fails()) {
            return response($validate->messages(), 400);
        }

        if ($request['type'] == 'upsell') {
            $upselllid = Crypt::decrypt($request->id);
            //$states = Upsellfunnel_upsellproducts::where(['id' => $upselllid])->get(['upshopify_producthandle','updiscounttype','updiscountamount']);
            $states = Upsellfunnel_upsellproducts::find($upselllid);
            $producthandle = $states->upshopify_producthandle;
            $discountamount = $states->updiscountamount;
            $discounttype = $states->updiscounttype;
        } elseif ($request['type'] == 'downsell') {
            $downselllid = Crypt::decrypt($request->id);
            $states = Upsellfunnel_downsellproducts::find($downselllid);
            $producthandle = $states->dnshopify_producthandle;
            $discountamount = $states->dndiscountamount;
            $discounttype = $states->dndiscounttype;
        }
        $shopify_storeurl = StoreSettings::where(['option_name' => 'shopify_main_domain'])->get(['option_value'])->first();
        $url = $shopify_storeurl['option_value'] . 'products/' . $producthandle . '.js';

        $ans_ch = curl_init();
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        curl_setopt($ans_ch, CURLOPT_URL, $url);
        curl_setopt($ans_ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'User-Agent:' . $user_agent . ''));
        curl_setopt($ans_ch, CURLOPT_HEADER, true);
        curl_setopt($ans_ch, CURLOPT_RETURNTRANSFER, true);
        $result_get = curl_exec($ans_ch);
        if (curl_error($ans_ch)) {
            $error_msg = curl_error($ans_ch);
        }
        $header_size = curl_getinfo($ans_ch, CURLINFO_HEADER_SIZE);
        $body = substr($result_get, $header_size);
        $httpcode = curl_getinfo($ans_ch, CURLINFO_HTTP_CODE);
        curl_close($ans_ch);
        $result['productinfo'] = json_decode($body, true);
        $result['discountamount'] = $discountamount;
        $result['discounttype'] = $discounttype;

        if (isset($error_msg)) {
            $result['error_msg'] = $error_msg;
        }

        $response = array(
            'status' => true,
            'response' => $result
        );
        return response($response, 200);
    }

    /**
     * Returning the funnel based on product tag..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function UpsellfunnelResponse(Request $request)
    {
        $key = $request->header('Authorization');

        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }

        $currenttag = $request->funneltag;

        if (($pos = strpos($currenttag, "_")) !== FALSE) {
            $tag = substr($currenttag, $pos + 1);
        }

        $funnelinfo = upsellfunnels::where(['tag' => $tag])->where(['status' => 'Enable'])->get(['id']);
        $funnelinfo = $funnelinfo->map(function ($funnel) {
            return [
                'funnelid' => Crypt::encrypt($funnel->id)
            ];
        });

        return $funnelinfo;
    }

    /**
     * Returning the funnel upsell/downsell based on funnel tag..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function FunnelupdnResponse(Request $request)
    {
        $key = $request->header('Authorization');

        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }

        $funnel_id = Crypt::decrypt($request->funnelid);

        $allupdownsells = Upsellfunnel_upsellproducts::leftJoin('upsellfunnel_downsellproducts', 'upsellfunnel_downsellproducts.upsellid', '=', 'upsellfunnel_upsellproducts.id')
            ->where('upsellfunnel_upsellproducts.funnelid', $funnel_id)
            ->get(['upsellfunnel_upsellproducts.id AS upid', 'upsellfunnel_upsellproducts.upshopify_productid', 'upsellfunnel_upsellproducts.upshopify_productname', 'upsellfunnel_upsellproducts.upshopify_producthandle', 'upsellfunnel_upsellproducts.updiscounttype', 'upsellfunnel_upsellproducts.updiscountamount', 'upsellfunnel_downsellproducts.id as dnid', 'upsellfunnel_downsellproducts.dnshopify_productid', 'upsellfunnel_downsellproducts.dnshopify_productname', 'upsellfunnel_downsellproducts.dnshopify_producthandle', 'upsellfunnel_downsellproducts.dndiscounttype', 'upsellfunnel_downsellproducts.dndiscountamount'])->first();
        return [
            'upid' => Crypt::encrypt($allupdownsells->upid),
            'upshopify_productid' => $allupdownsells->upshopify_productid,
            'upshopify_productname' => $allupdownsells->upshopify_productname,
            'upshopify_producthandle' => $allupdownsells->upshopify_producthandle,
            'updiscounttype' => $allupdownsells->updiscounttype,
            'updiscountamount' => $allupdownsells->updiscountamount,
            'dnid' => !empty($allupdownsells->dnid) ? Crypt::encrypt($allupdownsells->dnid) : '',
            //'dnid'  => $allupdownsells->dnid,
            'dnshopify_productid' => $allupdownsells->dnshopify_productid,
            'dnshopify_productname' => $allupdownsells->dnshopify_productname,
            'dnshopify_producthandle' => $allupdownsells->dnshopify_producthandle,
            'dndiscounttype' => $allupdownsells->dndiscounttype,
            'dndiscountamount' => $allupdownsells->dndiscountamount,
        ];

    }

    /**
     * Returning the order info and upsell/downsell based on id's..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function CheckoutupdnsellResponse(Request $request)
    {
        //print_r($request->all());
        //exit();
        $key = $request->header('Authorization');

        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $nextupsell = '';
        $downsellid = '';
        $funnelid = Crypt::decrypt($request->funnelid);
        if ($request['type'] == 'upsell') {
            $upselllid = Crypt::decrypt($request->id);

            $upsellprod = Upsellfunnel_upsellproducts::find($upselllid);
            $producthandle = $upsellprod->upshopify_producthandle;
            $discountamount = $upsellprod->updiscountamount;
            $discounttype = $upsellprod->updiscounttype;
            $downsellid = Upsellfunnel_downsellproducts::where(['upsellid' => $upselllid])->get(['id'])->first();
            $nextupsell = Upsellfunnel_upsellproducts::where('id', '>', $upsellprod->id)->where(['upstatus' => 'Enable'])->where(['funnelid' => $funnelid])->min('id');
        } elseif ($request['type'] == 'downsell') {
            $downselllid = Crypt::decrypt($request->id);
            $downsellprod = Upsellfunnel_downsellproducts::find($downselllid);
            $producthandle = $downsellprod->dnshopify_producthandle;
            $discountamount = $downsellprod->dndiscountamount;
            $discounttype = $downsellprod->dndiscounttype;
            $nextupsell = Upsellfunnel_upsellproducts::where('id', '>', $downsellprod->upsellid)->where(['upstatus' => 'Enable'])->where(['funnelid' => $funnelid])->min('id');
        }
        //exit();
        $shopify_storeurl = StoreSettings::where(['option_name' => 'shopify_main_domain'])->get(['option_value'])->first();
        $url = $shopify_storeurl['option_value'] . 'products/' . $producthandle . '.js';

        $ans_ch = curl_init();
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        curl_setopt($ans_ch, CURLOPT_URL, $url);
        curl_setopt($ans_ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'User-Agent:' . $user_agent . ''));
        curl_setopt($ans_ch, CURLOPT_HEADER, true);
        curl_setopt($ans_ch, CURLOPT_RETURNTRANSFER, true);
        $result_get = curl_exec($ans_ch);
        if (curl_error($ans_ch)) {
            $error_msg = curl_error($ans_ch);
        }
        $header_size = curl_getinfo($ans_ch, CURLINFO_HEADER_SIZE);
        $body = substr($result_get, $header_size);
        $httpcode = curl_getinfo($ans_ch, CURLINFO_HTTP_CODE);
        curl_close($ans_ch);
        $result['productinfo'] = json_decode($body, true);
        $result['discountamount'] = $discountamount;
        $result['discounttype'] = $discounttype;

        if (isset($error_msg)) {
            $result['error_msg'] = $error_msg;
        }
        $orders = orders::where(['id' => base64_decode($request['orderid'])])->get(['shipping_address'])->first();
        $response = array(
            'status' => true,
            'updnfunnelresponse' => $result,
            'nextupsell' => !empty($nextupsell) ? Crypt::encrypt($nextupsell) : "",
            'downsell' => !empty($downsellid->id) ? Crypt::encrypt($downsellid->id) : "",
            'orderinfo' => $orders
        );
        return response($response, 200);
    }

    /**
     * Make a upsell payment and update to order
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function PaymentupdnsellResponse(Request $request)
    {

        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'orderid' => 'nullable|string',
            'funnelid' => 'nullable|string',
            'product_info' => 'nullable|array',
            'quantity' => 'nullable|string',
            'productprice' => 'nullable|integer',
            'nextfunnel' => 'nullable|string',
            'protax' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }


        $orderid = base64_decode($request['orderid']);

        $product_info = $request['product_info'];
        $productprice = $request['productprice'] / 100;
        $nextfunnel = $request['nextfunnel'];
        $protax = $request['protax'];
        $customerdetail = orders::where(['id' => $orderid])->get(['email', 'product_info', 'subtotal_price', 'tax', 'total_price'])->first();
        $customeremail = $customerdetail['email'];
        $oldproductinfo = json_decode($customerdetail['product_info'], true);
        $newsubtotal = number_format((float)$customerdetail['subtotal_price'] + (float)($productprice), 2, '.', '');
        $newtax = number_format((float)$customerdetail['tax'] + (float)$protax, 2, '.', '');
        $newtotal = number_format((float)$customerdetail['total_price'] + (float)$protax + (float)($productprice), 2, '.', '');


        $newproductinfo = array_merge($oldproductinfo, array($product_info));
        $customerstripe = Customers::where(['customer_email' => $customeremail])->get(['stripecustomer_id'])->first();
        $productpay = $protax + $productprice;
        // exit();
        $keys = PaymentGateways::where(['gateway_name' => 'stripe'])->get()->first();
        if ($keys !== null) {
            $key = json_decode($keys['gateway_settings']);
            if ($keys->status == 'sandbox') {
                $stripesecretkey = $key->sandbox_secret;
            } else {
                $stripesecretkey = $key->production_secret;
            }
        } else {
            $stripesecretkey = '';
        }


        Stripe\Stripe::setApiKey($stripesecretkey);
        $charge = Stripe\Charge::create([
            "amount" => ($productpay * 100),
            "currency" => "USD",
            'customer' => $customerstripe['stripecustomer_id'],
            "description" => "Payment from onepage checkout",
        ]);

        if ($charge['status'] == 'paid') {

            $paydata = array("transaction_id" => $charge['id'],
                "payment_status" => $charge['status'],
                "pay_amount" => $charge['amount'],
                "gateway_response" => $charge,
                "order_id" => $orderid,
            );
            $insertpayment = payments::create($paydata);


            $data = array(
                'product_info' => json_encode($newproductinfo, true),
                'subtotal_price' => $newsubtotal,
                'tax' => $newtax,
                'total_price' => $newtotal,
            );
            $updateorder = orders::find($orderid)->update($data);
            $response = array(
                'status' => true,
                'response' => 'Order Update Successfully!',
                'orderid' => $orderid,
            );
        } else {
            $response = array(
                'status' => false,
                'response' => 'Payment failed!'
            );
        }

        return response($response);

    }

    /**
     * Returning all config settings..
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function GetConfigSettings(Request $request)
    {
        $key = $request->header('Authorization');

        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $allconfigs = StoreSettings::where(['option_for' => 'config_setting'])->get(['option_name', 'option_value']);
        $response = array(
            'status' => true,
            'response' => $allconfigs
        );
        return response($response, 200);
    }

    public function insertUpsellOrderInfo(Request $request)
    {
        $key = $request->header('Authorization');

        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }

        $validate = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'order_id' => 'required|integer|exists:orders,id',
            'product_info' => 'required|array',
            'subtotal_price' => 'required|integer',
            'tax' => 'required|integer',
            'total_price' => 'required|integer',
        ]);
        if ($validate->fails()) {
            $response = array(
                'status' => false,
                'response' => $validate->errors()
            );
            return response($response, 200);
        }
        $order = orders::find($request->order_id);
        $ex_products = json_decode($order['product_info']);
        $new_products = $request->product_info;
        $new_subtotal = $order['subtotal_price'] + $request->subtotal_price;
        $new_tax = $order['tax'] + $request->tax;
        $new_total = $order['total_price'] + $request->total_price;
        foreach ($new_products as $product) {
            $ex_products[] = $product;
        }
        $keys = PaymentGateways::where(['gateway_name' => 'stripe'])->get()->first();
        if ($keys !== null) {
            $key = json_decode($keys['gateway_settings']);
            if ($keys->status == 'sandbox') {
                $stripesecretkey = $key->sandbox_secret;
            } else {
                $stripesecretkey = $key->production_secret;
            }
        } else {
            $stripesecretkey = '';
        }
        Stripe\Stripe::setApiKey($stripesecretkey);
        $email = $order['email'];
        $customer = Customers::where(['customer_email' => $email])->first();
        if (empty($customer)) {
            $getcustomer = \Stripe\Customer::all([
                'limit' => 1,
                'email' => $request->email,
            ]);
            if (empty($getcustomer->data)) {
                $response = array(
                    'status' => false,
                    'response' => 'Details are invalid unable to get user information'
                );
                return response($response, 404);
            } else {
                $id = $getcustomer->data[0]->id;
            }
        } else {
            $id = $customer->stripecustomer_id;
        }
        $charge = Stripe\Charge::create([
            "amount" => $request['total_price'] * 100,
            "currency" => "USD",
            'customer' => $id,
            "description" => "Payment from onepage upsell checkout",
        ]);
        $payment = array(
            "transaction_id" => $charge['id'],
            "payment_status" => $charge['status'],
            "pay_amount" => $charge['amount'],
            "gateway_response" => $charge,
            "order_id" => $request['order_id'],
        );
        payments::create($payment);
        if ($charge->status !== 'paid') {
            $response = array(
                'status' => false,
                'response' => 'Unable to charge with the default card, something went wrong!'
            );
            return response($response, 403);
        }
        $data = array(
            'product_info' => json_encode($ex_products),
            'subtotal_price' => $new_subtotal,
            'discount' => json_encode($request['discount']),
            'tax' => $new_tax,
            'total_price' => $new_total,
        );
        $update = $order->update($data);
        if ($update) {
            $response = array(
                'status' => true,
                'response' => 'Order Created Successfully',
            );
            return response($response, 200);
        } else {
            $response = array(
                'status' => false,
                'response' => 'Internal Server Error! payment deducted',
            );
            logger('exception found in '.$request['order_id'].' while updating order details is below.');
            logger(json_encode($data));
            logger('payment details for same is below for order id '.$request['order_id']);
            logger(json_encode($charge).json_encode($payment));
            return response($response, 500);
        }
    }

    public function CreateOrderViaApp(Request $request)
    {
        $key = $request->header('Authorization');
        if ($this->AuthenticateToken($key) !== true) {
            $response = array(
                'status' => false,
                'response' => 'API key is invalid, please check and try again.'
            );
            return response($response);
        }
        $validate = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'email' => 'nullable|string',
            'product_info' => 'nullable|array',
            'billing_address' => 'nullable|array',
            'shipping_address' => 'nullable|array',
            'subtotal_price' => 'nullable|string',
            'shipping' => 'nullable|string',
            'shipping_detail' => 'nullable|array',
            'discount' => 'nullable|array',
            'tax' => 'nullable|string',
            'total_price' => 'nullable|string',
            'refunded_amount' => 'nullable|string',
            'refunded_date' => 'nullable|date',
            'transaction_id' => 'nullable|string',
            'payment_status' => 'nullable|string',
            'pay_amount' => 'nullable|string',
            'gateway_response' => 'nullable'


        ]);
        if ($validate->fails()) {
            return response($validate->messages());
        }
            $data = array(
                'name' => $request['name'],
                'email' => $request['email'],
                'product_info' => json_encode($request['product_info']),
                'billing_address' => json_encode($request['billing_address']),
                'shipping_address' => json_encode($request['shipping_address']),
                'subtotal_price' => $request['subtotal_price'],
                'shipping' => $request['shipping'],
                'shipping_detail' => json_encode($request['shipping_detail']),
                'discount' => json_encode($request['discount']),
                'tax' => $request['tax'],
                'total_price' => $request['total_price'],
                'payment_gateway' => $request['payment_gateway'],
                'cart_token' => $request['cart_token'],
                'shopify_customerid' => $request['shopify_customerid'],
                'order_from' => $request['order_from'] ?? 'app'
            );
        $create = orders::create([$data]);
         $payment = array(
            "transaction_id" => $request['id'],
            "payment_status" => $request['status'],
            "pay_amount" => $request['amount'],
            "gateway_response" => $request,
            "order_id" => $create->id,
        );
            if (!$create){
                return response('Order Created Successfully', 'true');
            }
            return response('Failed to Create Order', 'false');
        }

}
