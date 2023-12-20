<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

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

    public function showActivitiesClass(Request $request)
    {
        $idTurma = $request->input('idTurma');


        if (is_array($idTurma)) {
            foreach ($idTurma as $crianca) {

                $turma = DB::table('crianca')->select('idTurma')->where('idCrianca', $crianca)->first();

                $activities[$turma->idTurma] = DB::select('SELECT * FROM creche.atividade WHERE atividade.idTurma = ?', [$turma->idTurma]);
                
            }
        } else {
            $activities[$idTurma] = DB::select('SELECT * FROM creche.atividade WHERE atividade.idTurma = ?', [$idTurma]);
        }



        return ['activities' => $activities];
    }

    public function showAllActivitiesClass()
    {

        foreach (DB::select('SELECT idTurma FROM creche.turma') as $turma) {
            $activities[$turma->idTurma] = DB::select('SELECT * FROM creche.atividade WHERE atividade.idTurma = ?', [$turma->idTurma]);
        }

        return ['activities' => $activities];
    }

    public function createActivityClass(Request $request)
    {
        $nomeAtividade = $request->input('nomeAtividade');
        $duracao = $request->input('duracao');
        $descricao = $request->input('descricao');
        $objetivo = $request->input('objetivo');
        $idTurma = $request->input('idTurma');
        $idAtividade = $request->input('idAtividade');

        DB::table('atividade')
            ->updateOrInsert(
                [
                    "idAtividade" => $idAtividade,
                ],
                [
                    "nome" => $nomeAtividade,
                    "idTurma" => $idTurma,
                    "data" => DB::raw("CURDATE()"),
                    "duracao" => $duracao,
                    "descricao" => $descricao,
                    "objetivo" => $objetivo,
                ]
            );
    }

    public function deleteClassActivity(Request $request)
    {
        $idAtividade = $request->input('idAtividade');

        DB::table('atividade')->where(['idAtividade' => $idAtividade])->delete();
    }

    public function showAllClassChildren(Request $request)
    {
        $idTurma = $request->input('idTurma');


        $children = DB::select('SELECT pessoa.cartaoCidadao AS "CartaoCidadao", pessoa.nome AS "Nome", crianca.idCrianca AS "Id"
        FROM creche.pessoa, creche.crianca
        WHERE pessoa.cartaoCidadao = crianca.ccPessoa 
        AND crianca.idTurma = ?
        ORDER BY pessoa.nome', [$idTurma]);



        return ['turma' => $children];
    }
}
