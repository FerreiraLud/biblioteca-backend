import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Livro {
    private idLivro: number = 0
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: number;
    private isbn: number;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestimo: string;



    constructor(
        _titulo: string,
        _autor: string,
        _editora: string,
        _anoPublicacao: number,
        _isbn: number,
        _quantTotal: number,
        _quantDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestimo: string,
    ) {
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora = _editora;
        this.anoPublicacao = _anoPublicacao;
        this.isbn = _isbn;
        this.quantTotal = _quantTotal;
        this.quantDisponivel = _quantDisponivel;
        this.valorAquisicao = _valorAquisicao;
        this.statusLivroEmprestimo = _statusLivroEmprestimo;
    }

    public getidLivro(): number {
        return this.idLivro;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public getEditora(): string {
        return this.editora;
    }

    public getAnoPuplicacao(): number {
        return this.anoPublicacao;
    }

    public getIsbn(): number {
        return this.isbn;
    }

    public getQuantTotal(): number {
        return this.quantTotal;
    }

    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    public getVolorAquisicao(): number {
        return this.valorAquisicao;
    }

    public getStatusLivroEmprestimo(): string {
        return this.statusLivroEmprestimo;
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public setTitulo(_titulo: string): void {
        this.titulo = _titulo;
    }

    public setAutor(_autor: string): void {
        this.autor = _autor;
    }

    public setEditora(_editora: string): void {
        this.editora = _editora;
    }

    public setAnoPuplicacao(_anoPublicacao: number): void {
        this.anoPublicacao = _anoPublicacao;
    }

    public setIsbn(_isbn: number): void {
        this.isbn = _isbn;
    }

    public setQuantTotal(_quantTotal: number): void {
        this.quantTotal = _quantTotal;
    }

    public setQuantDisponivel(_quantDisponivel: number): void {
        this.quantDisponivel = _quantDisponivel;
    }
    public setValor_aquisicao(_valorAquisicao: number): void {
        this.valorAquisicao = _valorAquisicao;
    }
    public setStatusLivroEmprestimo(_statusLivroEmprestimo: string): void {
        this.statusLivroEmprestimo = _statusLivroEmprestimo;
    }

    static async listarLivro(): Promise<Array<Livro> | null> {
        try {

            let listaDeLivro: Array<Livro> = [];


            const querySelectLivro = `SELECT * FROM Livro;`;
            const respostaBD = await database.query(querySelectLivro);

            respostaBD.rows.forEach((LivroBD: any) => {
                const novoLivro: Livro = new Livro(
                    LivroBD.titulo,
                    LivroBD.autor,
                    LivroBD.editora,
                    LivroBD.ano_puplicacao,
                    LivroBD.isbn,
                    LivroBD.quantTotal,
                    LivroBD.quantDisponivel,
                    LivroBD.valorAquisicao,
                    LivroBD.statusLivroEmprestimo
                );

                novoLivro.setIdLivro(LivroBD.idLivro);

                listaDeLivro.push(novoLivro);
            });

            return listaDeLivro;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarLivro(Livro: LivroDTO): Promise<boolean> {
        try {
            const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, anoPuplicacao, isbn, quantTotal, quantDisponivel, valorAquisicao, statusLivroLivro)
                                        VALUES
                                        ($1, $2, $3, $4, $5)
                                        RETURNING idLivro;`;

            const respostaBD = await database.query(queryInsertLivro, [
                Livro.titulo,
                Livro.autor,
                Livro.editora,
                Livro.anoPuplicacao,
                Livro.isbn,
                Livro.quantTotal,
                Livro.quantDisponivel,
                Livro.valorAquisicao,
                Livro.statusLivroEmprestimo
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Livro  cadastrado com sucesso. ID: ${respostaBD.rows[0].idLivro}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listaLivrosPorId(idLivro: number): Promise<Livro | null> {
        try {
            const querySelectLivro = `SELECT * FROM Livro WHERE idLivro=$1;`;

            const respostaBD = await database.query(querySelectLivro, [idLivro]);

            if (respostaBD.rowCount != 0) {
                const livro: Livro = new Livro(
                    respostaBD.rows[0].titulo,
                    respostaBD.rows[0].autor,
                    respostaBD.rows[0].editora,
                    respostaBD.rows[0].anoPublicacao,
                    respostaBD.rows[0].isbn,
                    respostaBD.rows[0].quantTotal,
                    respostaBD.rows[0].quantDisponivel,
                    respostaBD.rows[0].valorAquisicao,
                    respostaBD.rows[0].statusLivroEmprestimo

                );
                livro.setIdLivro(respostaBD.rows[0].idLivro);

                return livro;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar Livro no banco de dados. ${error}`);
            return null;
        }
    }

}

export default Livro;


