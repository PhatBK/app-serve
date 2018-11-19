<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::post('user/register', 'APIRegisterController@register');
// Route::post('user/login', 'APILoginController@login');

Route::post('sendlogPerfomance', 
	['as' => 'sendlogPerfomance', 'uses' => 'LogAjaxController@postDataLogPerformance']
);
Route::post('sendlogFirstPlay', 
	['as' => 'sendlogFirstPlay', 'uses' => 'LogAjaxController@postDataLogFirstPlay']
);
Route::post('sendlogSeek', 
	['as' => 'sendlogSeek', 'uses' => 'LogAjaxController@postDataLogSeek']
);
Route::post('sendlogPause', 
	['as' => 'sendlogPause', 'uses' => 'LogAjaxController@postDataLogPause']
);
Route::post('sendlogFirstQuarter', 
	['as' => 'sendlogFirstQuarter', 'uses' => 'LogAjaxController@postDataLogFirstQuarter'
]);