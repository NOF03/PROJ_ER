<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UserController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function verifyIdentification(Request $request) 
{
    try {
        $ccPessoa = $request->input('ccPessoa');
        
        $userVerify = DB::select('SELECT cartaoCidadao FROM creche.pessoa WHERE cartaoCidadao ='.$ccPessoa .' LIMIT 1');
        if (count($userVerify) === 0) {
            return ['userExists' => false, 'error' => 'Número não consta na base de dados'];
        }

        $roles = ['administrador', 'encarregadoeducacao', 'educador', 'auxiliareducativo'];
        foreach ($roles as $role) {
            $roleCheck = DB::select("SELECT * FROM creche.{$role} WHERE ccPessoa = ? LIMIT 1", [$ccPessoa]);
            if (count($roleCheck) > 0) {
                return ['userExists' => true, 'role' => $role];
            }
        }

        return ['userExists' => false, 'role' => 'undefined'];
    } catch (\Exception $e) {
        return ['error' => 'Ocorreu um erro na verificação'];
    }
}

}