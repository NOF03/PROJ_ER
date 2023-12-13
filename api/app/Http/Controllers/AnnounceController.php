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

        $adminAnnouncements = DB::select('SELECT pessoa.nome as "Autor", anuncio.descricao as "Anuncio", anuncio.titulo as "Titulo" 
                                            FROM creche.anuncio, creche.administrador, creche.pessoa 
                                            WHERE anuncio.idAdministrador=administrador.idAdministrador AND administrador.ccPessoa=pessoa.cartaoCidadao 
                                            ORDER BY anuncio.idAnuncio DESC');


        $idTurma = $request->input('idTurma');
        
        $classAnnouncements = DB::select('SELECT anuncioturma.descricao as "Anuncio", anuncioturma.titulo as "Titulo", pessoa.nome as "Autor"
                                            FROM creche.anuncioturma
                                            LEFT JOIN creche.educador ON anuncioturma.idTurma = educador.idTurma
                                            LEFT JOIN creche.pessoa ON educador.ccPessoa = pessoa.cartaoCidadao
                                            WHERE anuncioturma.idTurma = ?
                                            ORDER BY anuncioturma.idanuncioTurma DESC', [$idTurma[0]]);
        return ['adminAnnouncements' => $adminAnnouncements, 'classAnnouncements' => $classAnnouncements];
    }

    public function SelectAllAnnouncements()
    {

        $adminAnnouncements = DB::select('SELECT pessoa.nome as "Autor", anuncio.descricao as "Anuncio", anuncio.titulo as "Titulo" 
                                            FROM creche.anuncio, creche.administrador, creche.pessoa 
                                            WHERE anuncio.idAdministrador=administrador.idAdministrador AND administrador.ccPessoa=pessoa.cartaoCidadao 
                                            ORDER BY anuncio.idAnuncio DESC');

        foreach (DB::select('SELECT idTurma FROM creche.turma') as $turma) {

            $classAnnouncements[$turma->idTurma] = DB::select('SELECT anuncioturma.descricao as "Anuncio", anuncioturma.titulo as "Titulo", pessoa.nome as "Autor"
                                                        FROM creche.anuncioturma
                                                        LEFT JOIN creche.educador ON anuncioturma.idTurma = educador.idTurma
                                                        LEFT JOIN creche.pessoa ON educador.ccPessoa = pessoa.cartaoCidadao
                                                        WHERE anuncioturma.idTurma = ?
                                                        ORDER BY anuncioturma.idanuncioTurma DESC', [$turma->idTurma]);
        }

        return ['adminAnnouncements' => $adminAnnouncements, 'classAnnouncements' => $classAnnouncements];
    }

    public function createAdminAnnouncement(Request $request)
    {
        $titulo = $request->input('titulo');
        $descricao = $request->input('descricao');
        $idAdmin = $request->input('idAdmin');

        DB::table('anuncio')->insert([
            'idAdministrador' => $idAdmin,
            'descricao' => $descricao,
            'titulo' => $titulo,
        ]);
    }

    public function createClassAnnouncement(Request $request)
    {
        $titulo = $request->input('titulo');
        $descricao = $request->input('descricao');
        $idTurma = $request->input('idTurma');

        DB::table('anuncioturma')->insert([
            'idTurma' => $idTurma,
            'descricao' => $descricao,
            'titulo' => $titulo,
        ]);
    }
}
