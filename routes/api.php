<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('checkout', [ApiController::class, 'GetPaymentCredentials']);
Route::get('thankyou', [ApiController::class, 'GetThankyouCredentials']);
Route::get('configsetting', [ApiController::class, 'GetConfigSettings']);
Route::post('order/fetch', [ApiController::class, 'FetchOrderInDB']);
Route::post('order/create', [ApiController::class, 'CreateOrderInDB']);
Route::post('order/update', [ApiController::class, 'UpdateOrderInDB']);
Route::get('getcountrylist',[ApiController::class, 'CountriesResponse']);
Route::post('countrystatelist',[ApiController::class, 'StatesResponse']);
Route::post('getupsellfunnel',[ApiController::class, 'UpsellfunnelResponse']);
Route::post('getfunnelupdnsell',[ApiController::class, 'FunnelupdnResponse']);
Route::post('previewupdnsell',[ApiController::class, 'PreviewupdnsellResponse']);
Route::post('checkoutupdnsell',[ApiController::class, 'CheckoutupdnsellResponse']);
Route::post('paymentupdnsell',[ApiController::class, 'PaymentupdnsellResponse']);
Route::post('fetchordernpayment', [ApiController::class, 'FetchOrdernPaymentInDB']);
Route::get('tag/{tag}', [ApiController::class, 'getUpsellDownsells']);
Route::post('update/order/upsell', [ApiController::class, 'insertUpsellOrderInfo']);
Route::post('order/create/app', [ApiController::class, 'CreateOrderViaApp']);
