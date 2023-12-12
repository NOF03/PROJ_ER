<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UserController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function verifyIdentification(Request $request)
    {
        try {
            $ccPessoa = $request->input('ccPessoa');

            $userVerify = DB::select('SELECT * FROM creche.pessoa WHERE cartaoCidadao = ? LIMIT 1', [$ccPessoa]);
            if (count($userVerify) === 0) {
                return ['userExists' => false, 'error' => 'Número não consta na base de dados'];
            }

            $roles = ['administrador', 'encarregadoeducacao', 'educador', 'auxiliareducativo'];
            foreach ($roles as $role) {
                $roleCheck = DB::select("SELECT * FROM creche.{$role} WHERE ccPessoa = ? LIMIT 1", [$ccPessoa]);
                if (count($roleCheck) > 0) {
                    $roleCheck = $roleCheck[0];
                    if ($role === $roles[1]) {
                        $roleCheck->idTurma = DB::table('creche.crianca')
                        ->join('creche.crianca_has_encarregadoeducacao', 'creche.crianca_has_encarregadoeducacao.idCrianca', '=', 'creche.crianca.idCrianca')
                        ->join('creche.encarregadoeducacao', 'creche.encarregadoeducacao.idEncarregado', '=', 'creche.crianca_has_encarregadoeducacao.idEncarregado')
                        ->where('creche.encarregadoeducacao.idEncarregado', '=', $roleCheck->idEncarregado)
                        ->pluck('creche.crianca.idTurma as turma')
                        ->toArray();
                    }
                    return ['userExists' => true, 'user' => ['role' => $role, 'roleTraits' => $roleCheck, 'userInfo' => $userVerify[0]]];
                }
            }

            return ['userExists' => false, 'role' => 'undefined'];
        } catch (\Exception $e) {
            return ['error' => 'Ocorreu um erro na verificação'];
        }
    }
}
