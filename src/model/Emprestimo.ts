import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    private idEmprestimo: number = 0
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: number;
    private dataDevolucao: number;
    private statusEmprestimo: string


    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: number,
        _dataDevolucao: number,
        _statusEmprestimo: string
    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo
    }

    public getidEmprestimo(): number {
        return this.idEmprestimo;
    }

    public getidAluno(): number {
        return this.idAluno;
    }

    public getidLivro(): number {
        return this.idLivro;
    }

    public getDataEmprestimo(): number {
        return this.dataEmprestimo;
    }

    public getdataDevolucao(): number {
        return this.dataDevolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setidEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }

    public setidAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public setidLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public setDataEsprestimo(_dataEmprestimo: number): void {
        this.dataEmprestimo = _dataEmprestimo;
    }

    public setdataDevolucao(_dataDevolucao: number): void {
        this.dataDevolucao = _dataDevolucao;
    }

    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }

    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {
        try {

            let listaDeEmprestimo: Array<Emprestimo> = [];


            const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;
            const respostaBD = await database.query(querySelectEmprestimo);

            respostaBD.rows.forEach((EmprestimoBD: any) => {
                const novoEmprestimo: Emprestimo = new Emprestimo(
                    EmprestimoBD.idAluno,
                    EmprestimoBD.idLivro,
                    EmprestimoBD.dataEmprestimo,
                    EmprestimoBD.dataDevolucao,
                    EmprestimoBD.statusEmprestimo
                );

                novoEmprestimo.setidEmprestimo(EmprestimoBD.idEmprestimo);

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
            const queryInsertEmprestimo = `INSERT INTO Emprestimo (idAluno, idLivro, dataEmprestimo, dataDevolucao, statusEmprestimo)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING idEmprestimo;`;

            const respostaBD = await database.query(queryInsertEmprestimo, [
                Emprestimo.idAluno,
                Emprestimo.idLivro,
                Emprestimo.dataEmprestimo,
                Emprestimo.dataDevolucao,
                Emprestimo.statusEmprestimo
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Emprestimo  cadastrado com sucesso. ID: ${respostaBD.rows[0].idEmprestimo}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listaEmprestimosPorId(idEmprestimo: number): Promise<Emprestimo | null> {
        try {
            const querySelectEmprestimo = `SELECT * FROM Emprestimo WHERE idEmprestimo=$1;`;

            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            if (respostaBD.rowCount != 0) {
                const emprestimo: Emprestimo = new Emprestimo(
                    respostaBD.rows[0].idAluno,
                    respostaBD.rows[0].idLivro,
                    respostaBD.rows[0].dataEmprestimo,
                    respostaBD.rows[0].dataDevolucao,
                    respostaBD.rows[0].statusEmprestimo
                );
                emprestimo.setidEmprestimo(respostaBD.rows[0].idEmprestimo);

                return emprestimo;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar Emprestimo no banco de dados. ${error}`);
            return null;
        }
    }

}

export default Emprestimo;

