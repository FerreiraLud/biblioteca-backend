import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Livro{
    private id_livro: number = 0
    private titulo: string;
    private autor: string;
    private editora: string;
    private ano_publicacao: number;
    private isbn: number;
    private quant_total: number;
    private quant_disponivel: number;
    private valor_aquisicao: number;
    private status_livro_emprestimo:string;



    constructor(
        _titulo: string,
        _autor: string,
        _editora: string,
        _ano_publicacao: number,
        _isbn: number,
        _quant_total: number,
        _quant_disponivel: number,
        _valor_aquisicao: number,
        _status_livro_emprestimo: string,
    ){
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora= _editora;
        this.ano_publicacao = _ano_publicacao;
        this.isbn = _isbn;
        this.quant_total = _quant_total;
        this.quant_disponivel = _quant_disponivel;
        this.valor_aquisicao = _valor_aquisicao;
        this.status_livro_emprestimo = _status_livro_emprestimo;
    }

    public getId_livro(): number{
        return this.id_livro;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public getAutor(): string{
        return this.autor;
    }

    public getEditora(): string{
        return this.editora;
    }

    public getAno_puplicacao(): number{
        return this.ano_publicacao;
    }

    public getIsbn(): number{
        return this.isbn;
    }

    public getQuant_total(): number{
        return this.quant_total;
    }

    public getQuant_disponivel(): number{
        return this.quant_disponivel;
    }

    public getVolor_aquisicao(): number{
        return this.valor_aquisicao;
    }

    public getStatus_do_emprestimo(): string{
        return this.status_livro_emprestimo;
    }

      public setId_livro(_id_livro: number): void {
        this.id_livro = _id_livro;
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

      public setAno_puplicacao(_ano_publicacao: number): void {
        this.ano_publicacao = _ano_publicacao;
    }

      public setIsbn(_isbn: number): void {
        this.isbn = _isbn;
    }

      public setQuant_total(_quant_total: number): void {
        this.quant_total = _quant_total;
    }

      public setQuant_disponivel(_quant_disponivel: number): void {
        this.quant_disponivel = _quant_disponivel;
    }
     public setValot_aquisicao(_valor_aquisicao: number): void {
        this.valor_aquisicao = _valor_aquisicao;
    }
     public setStatus_livro_emprestimo(_status_livro_emprestimo: string): void {
        this.status_livro_emprestimo = _status_livro_emprestimo;
    }

    static async listarLivro(): Promise<Array<Livro> | null> {
            try {
              
                let listaDeLivro: Array<Livro> = [];
    
               
                const querySelectLivro = `SELECT * FROM Livro;`;
                const respostaBD = await database.query(querySelectLivro);
    
                respostaBD.rows.forEach((LivroBD: any) => {
                    const novoLivro: Livro  = new Livro (
                        LivroBD.titulo,
                        LivroBD.autor, 
                        LivroBD.editora,             
                        LivroBD.ano_puplicacao,
                        LivroBD.isbn,
                        LivroBD.quant_total,
                        LivroBD.quant_disponivel,
                        LivroBD.valor_aquisicao,
                        LivroBD.status_livro_emprestimo
                    );
                    
                    novoLivro.setId_livro(LivroBD.id_Livro);
    
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
                    const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, ano_puplicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_Livro)
                                        VALUES
                                        ($1, $2, $3, $4, $5)
                                        RETURNING id_Livro;`;
        
                    const respostaBD = await database.query(queryInsertLivro, [
                        Livro.titulo,
                        Livro.autor, 
                        Livro.editora,             
                        Livro.ano_puplicacao,
                        Livro.isbn,
                        Livro.quant_total,
                        Livro.quant_disponivel,
                        Livro.valor_aquisicao,
                        Livro.status_livro_emprestimo           
                    ]);
        
                    if (respostaBD.rows.length > 0) {
                        console.info(`Livro  cadastrado com sucesso. ID: ${respostaBD.rows[0].id_Livro}`);
        
                        return true;
                    }
        
                    return false;
                } catch (error) {
                    console.error(`Erro na consulta ao banco de dados. ${error}`);
        
                    return false;
                }
            }
        
            static async listaLivrosPorId(idLivro: number): Promise<Livro  | null> {
                try{
                    const querySelectLivro = `SELECT * FROM Livro WHERE id_Livro=$1;`;
        
                    const respostaBD = await database.query(querySelectLivro, [idLivro]);
        
                    if(respostaBD.rowCount != 0) {
                        const livro: Livro  = new Livro (
                            respostaBD.rows[0].titulo,
                            respostaBD.rows[0].autor,
                            respostaBD.rows[0].editora,
                            respostaBD.rows[0].ano_publicacao,
                            respostaBD.rows[0].isbn,
                            respostaBD.rows[0].quant_total,
                            respostaBD.rows[0].quant_disponivel,
                            respostaBD.rows[0].valor_aquisicao,
                            respostaBD.rows[0].status_livro_emprestimo

                        );
                        livro.setId_livro(respostaBD.rows[0].id_livro);
        
                        return livro;
                    }
        
                    return null;
                }catch (error) {
                    console.error(`Erro ao buscar Livro no banco de dados. ${error}`);
                    return null;
                }
            }
        
        }
        
        export default Livro ;


