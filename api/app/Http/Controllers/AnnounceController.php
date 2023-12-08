<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class AnnounceController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function SelectAnnouncements()
    {
        $announcements = DB::select('SELECT pessoa.nome as "Autor", anuncio.descricao as "Anuncio" FROM creche.anuncio, creche.administrador, creche.pessoa WHERE anuncio.idAdministrador=administrador.idAdministrador AND administrador.ccPessoa=pessoa.cartaoCidadao');

        return ['announcements' => $announcements];
    }
    
}
