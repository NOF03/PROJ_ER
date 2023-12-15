<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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
                        $roleCheck->idCriancas = DB::table('creche.crianca')
                            ->join('creche.crianca_has_encarregadoeducacao', 'creche.crianca_has_encarregadoeducacao.idCrianca', '=', 'creche.crianca.idCrianca')
                            ->join('creche.encarregadoeducacao', 'creche.encarregadoeducacao.idEncarregado', '=', 'creche.crianca_has_encarregadoeducacao.idEncarregado')
                            ->where('creche.encarregadoeducacao.idEncarregado', '=', $roleCheck->idEncarregado)
                            ->pluck('creche.crianca.idCrianca as idCrianca')
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

    public function getChildrenData(Request $request)
    {
        $idCriancas = $request->input('idCriancas');

        foreach ($idCriancas as $idCrianca) {
            $childrenData = DB::select("SELECT pessoa.nome, pessoa.idade, crianca.idTurma FROM pessoa, crianca WHERE crianca.ccPessoa=pessoa.cartaoCidadao AND crianca.idCrianca = ?", [$idCrianca]);
            $getChildren[$idCrianca] = $childrenData[0];
        };

        return ["children" => $getChildren];
    }
}
