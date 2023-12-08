<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class ActivityController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function testConnection()
    {
        if (DB::connection()->getPdo()) {
            print("Everything fine here! ");
            print(DB::connection()->getDatabaseName());
        }
        return view('welcome');
    }
    
}
