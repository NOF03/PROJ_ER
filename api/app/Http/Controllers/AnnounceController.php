<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AnnounceController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function SelectAnnouncements(Request $request)
    {
        $idTurma = $request->input('idTurma');
        $adminAnnouncements = DB::select('SELECT pessoa.nome as "Autor", anuncio.descricao as "Anuncio", anuncio.titulo as "Titulo" FROM creche.anuncio, creche.administrador, creche.pessoa WHERE anuncio.idAdministrador=administrador.idAdministrador AND administrador.ccPessoa=pessoa.cartaoCidadao ORDER BY anuncio.idAnuncio DESC');
        $classAnnouncements = DB::select('SELECT pessoa.nome as "Autor", anuncioturma.descricao as "Anuncio", anuncioturma.titulo as "Titulo" FROM creche.anuncioturma, creche.pessoa WHERE anuncioturma.idTurma= ? AND pessoa.cartaoCidadao', [$idTurma]);
        return ['adminAnnouncements' => $adminAnnouncements];
    }
    
}
