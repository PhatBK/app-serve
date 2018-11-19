<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogAjaxController extends Controller
{
    public function postDataLogFirstPlay(Request $req) {
    	$response = [];
    	$responseData = $req->data;
    	$response[0] = $req->category;
    	$response[1] = $responseData;
    
    	return response()->json($response);
    }
    public function postDataLogSeek(Request $req) {
    	$response = [];
    
    	$responseData = $req->data;
    	$response[0] = $req->category;
    	$response[1] = $responseData;

    	return response()->json($response);
    }
    public function postDataLogPerformance(Request $req) {
    	$response = [];
    	
    	$responseData = $req->data;
    	$response[0] = $req->category;
    	$response[1] = $responseData;

    	return response()->json($response);
    }
    public function postDataLogPause(Request $req) {
    	$response = [];
    
    	$responseData = $req->data;
    	$response[0] = $req->category;
    	$response[1] = $responseData;

    	return response()->json($response);
    }
    public function postDataLogFirstQuarter(Request $req) {
    	$response = [];
    
    	$responseData = $req->data;
    	$response[0] = $req->category;
    	$response[1] = $responseData;

    	return response()->json($response);
    }
}
