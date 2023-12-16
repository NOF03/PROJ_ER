<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NewsController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function getRooms(Request $request)
    {
        $ccPessoa = $request->input('ccPessoa');

        $idSalas = DB::table('sala_has_pessoa')
            ->select('idSala')
            ->where('ccPessoa', $ccPessoa)
            ->get();

        foreach ($idSalas as $idSala) {
            $rooms[$idSala->idSala] = DB::table('sala')
                ->select('tituloSala')
                ->where('idsala', $idSala->idSala)
                ->get()[0];
        }

        return ['rooms' => $rooms];
    }

    public function getMessagesRoom(Request $request)
    {
        $idSala = $request->input('idSala');

            $messages = DB::table('mensagem')
                ->select('*')
                ->where('idSala', $idSala)
                ->get();
        

        return ["messages" => $messages];
    }

    public function sendMessagesRoom(Request $request) {
        $idSala = $request->input('idSala');
        $ccPessoa = $request->input('ccPessoa');
        $descricao = $request->input('descricao');
        DB::insert('INSERT INTO creche.mensagem VALUES (NULL, ?, ?, ?)', [$descricao, $idSala, $ccPessoa]);

    }
}
