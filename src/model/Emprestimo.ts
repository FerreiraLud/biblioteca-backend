import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    private id_emprestimo: number = 0
    private id_aluno: number;
    private id_livro: number;
    private data_emprestimo: number;
    private data_devolucao: number;
    private status_esprestimo: string


    constructor(
        _id_aluno: number,
        _id_livro: number,
        _data_emprestimo: number,
        _data_devolucao: number,
        _status_emprestimo: string
    ){
        this.id_aluno = _id_aluno;
        this.id_livro = _id_livro;
        this.data_emprestimo = _data_emprestimo;
        this.data_devolucao = _data_devolucao;
        this.status_esprestimo = _status_emprestimo
    }

    public getId_emprestimo(): number{
        return this.id_emprestimo;
    }

    public getId_aluno(): number {
        return this.id_aluno;
    }

    public getId_livro(): number {
        return this.id_livro;
    }

    public getData_emprestimo(): number {
        return this.data_emprestimo;
    }

    public getData_devolucao(): number {
        return this.data_devolucao;
    }

    public getStatus_emprestimo(): string {
        return this.status_esprestimo;
    }

    public setId_emprestimo(_id_emprestimo: number): void {
        this.id_emprestimo = _id_emprestimo;
    }

    public setId_aluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

    public setId_livro(_id_livro: number): void {
        this.id_livro = _id_livro;
    }

    public setData_esprestimo(_data_emprestimo: number): void {
        this.data_emprestimo = _data_emprestimo;
    }

    public setData_devolucao(_data_devolucao: number): void {
        this.data_devolucao = _data_devolucao;
    }

    public setStatus_emprestimo(_status_emprestimo: string): void {
        this.status_esprestimo = _status_emprestimo;
    }

    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {
            try {
              
                let listaDeEmprestimo: Array<Emprestimo> = [];
    
               
                const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;
                const respostaBD = await database.query(querySelectEmprestimo);
    
                respostaBD.rows.forEach((EmprestimoBD: any) => {
                    const novoEmprestimo: Emprestimo  = new Emprestimo (
                        EmprestimoBD.id_aluno,
                        EmprestimoBD.id_livro,
                        EmprestimoBD.data_emprestimo,
                        EmprestimoBD.data_devolucao,
                        EmprestimoBD.status_emprestimo
                    );
    
                    novoEmprestimo.setId_emprestimo(EmprestimoBD.id_Emprestimo);
    
                    listaDeEmprestimo.push(novoEmprestimo);
                });
    
                return listaDeEmprestimo;
            } catch (error) {
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                return null;
            }
        }
    
        static async cadastrarEmprestimo(Emprestimo: EmprestimoDTO): Promise<boolean> {
            try {
                const queryInsertEmprestimo = `INSERT INTO Emprestimo (nome, fabricante, principio_ativo, data_validade, preco)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_Emprestimo;`;
    
                const respostaBD = await database.query(queryInsertEmprestimo, [
                    Emprestimo.idAluno,
                    Emprestimo.idLivro, 
                    Emprestimo.data_emprestimo,             
                    Emprestimo.data_devolucao,
                    Emprestimo.status_emprestimo           
                ]);
    
                if (respostaBD.rows.length > 0) {
                    console.info(`Emprestimo  cadastrado com sucesso. ID: ${respostaBD.rows[0].id_Emprestimo}`);
    
                    return true;
                }
    
                return false;
            } catch (error) {
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                return false;
            }
        }
    
        static async listaEmprestimosPorId(idEmprestimo: number): Promise<Emprestimo  | null> {
            try{
                const querySelectEmprestimo = `SELECT * FROM Emprestimo WHERE id_Emprestimo=$1;`;
    
                const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);
    
                if(respostaBD.rowCount != 0) {
                    const emprestimo: Emprestimo  = new Emprestimo (
                        respostaBD.rows[0].nome,
                        respostaBD.rows[0].fabricante,
                        respostaBD.rows[0].principio_ativo,
                        respostaBD.rows[0].data_validade,
                        respostaBD.rows[0].preco
                    );
                    emprestimo.setId_emprestimo(respostaBD.rows[0].id_Emprestimo);
    
                    return emprestimo;
                }
    
                return null;
            }catch (error) {
                console.error(`Erro ao buscar Emprestimo no banco de dados. ${error}`);
                return null;
            }
        }
    
    }
    
    export default Emprestimo ;
    
  