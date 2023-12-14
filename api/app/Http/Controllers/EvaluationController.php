<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EvaluationController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function registerEvaluation(Request $request) {
        $idCrianca = $request->input('idCrianca');
        $idAtividade = $request->input('idAtividade');
        $avaliacao = $request->input('avaliacao');
        $observacoes = $request->input('observacoes');

        DB::table('avaliacao')->updateOrInsert([
            "idCrianca" => $idCrianca,
            "idAtividade" => $idAtividade,
        ],[
            "nota" => $avaliacao,
            "observacao" => $observacoes,
            "data" => DB::raw("CURDATE()"),
        ]);


    }

    public function verifyChildEvaluationOnActivity(Request $request)
    {
        $idCrianca = $request->input('idCrianca');
        $idAtividade = $request->input('idAtividade');
        $existingEvaluation = DB::table('avaliacao')
            ->where('idCrianca', $idCrianca)
            ->where('idAtividade', $idAtividade)
            ->first();

        return ['existingEvaluation' => $existingEvaluation !== null];
    }

}
