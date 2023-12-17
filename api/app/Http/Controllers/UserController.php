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

    public function createPersonOnRole(Request $request)
    {
        $nome = $request->input('nome');
        $idade = $request->input('idade');
        $ccPessoa = $request->input('ccPessoa');
        $contacto = $request->input('contacto');
        $role = $request->input('role');

        DB::insert('INSERT INTO creche.pessoa VALUES (?, ?, ?)', [$ccPessoa, $nome, $idade]);

        if ($role === 'encarregadoeducacao') {

            $parentesco = $request->input('parentesco');
            $lastInsertIdEncarregado = DB::table('encarregadoeducacao')->insertGetId([
                'contacto' => $contacto,
                'parentesco' => $parentesco,
                'ccPessoa' => $ccPessoa,
            ]);
            $nomeCriancas = $request->input('nomeCriancas');
            $idadeCriancas = $request->input('idadeCriancas');
            $ccCriancas = $request->input('ccCriancas');
            $turmaCriancas = $request->input('turmaCriancas');
            $numeroCriancas = $request->input('numeroCriancas');
            for ($i = 0; $i < $numeroCriancas; $i += 1) {
                DB::insert('INSERT INTO creche.pessoa VALUES (?, ?, ?)', [$ccCriancas[$i], $nomeCriancas[$i], $idadeCriancas[$i]]);
                $lastInsertIdCrianca = DB::table('crianca')->insertGetId([
                    'ccPessoa' => $ccCriancas[$i],
                    'idTurma' => $turmaCriancas[$i],
                ]);
                DB::insert('INSERT INTO creche.crianca_has_encarregadoeducacao VALUES (?, ?)', [$lastInsertIdCrianca, $lastInsertIdEncarregado]);
            }
        } elseif ($role === "educador") {
            $salario = $request->input('salario');
            $turma = $request->input('turma');
            DB::insert('INSERT INTO creche.educador VALUES (NULL, ?, ?, ?, ?)', [$contacto, $salario, $turma, $ccPessoa]);
        } else {
            $salario = $request->input('salario');
            DB::insert('INSERT INTO creche.auxiliareducativo VALUES (NULL, ?, ?)', [$salario, $ccPessoa]);
        }
    }
}
