import AlunoController from "../controller/AlunoController.js";
import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {
    private id_aluno: number = 0;
    private ra: number;
    private nome: string;
    private sobrenome: string;
    private data_nascimento: number;
    private endereco: string;
    private email: string;
    private celular: number


    constructor(
        _ra: number,
        _nome: string,
        _sobrenome: string,
        _data_nascimento: number,
        _endereco: string,
        _email: string,
        _celular: number
    ){
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.data_nascimento = _data_nascimento;
        this.endereco = _endereco;
        this.email = _endereco;
        this.celular = _celular
    }

     public getId_aluno(): number {
        return this.id_aluno;
    }

     public getRa(): number {
        return this.ra;
    }

     public getNome(): string {
        return this.nome;
    }

     public getSobrenome(): string {
        return this.sobrenome;
    }

     public getData_nascimento(): number {
        return this.data_nascimento;
    }

     public getEndereco(): string {
        return this.endereco;
    }

     public getEmail(): string {
        return this.email;
    }

     public getCelular(): number {
        return this.celular;
    }

      public setId_aluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

      public setRa(_ra: number): void {
        this.ra = _ra;
    }

      public setNome(_nome: string): void {
        this.nome = _nome;
    }

      public setSobrenome(_sobrenome: string): void {
        this.sobrenome = _sobrenome;
    }

      public setData_nascimento(_data_nascimento: number): void {
        this.data_nascimento = _data_nascimento;
    }

      public setEndereco(_endereco: string): void {
        this.endereco = _endereco;
    }

      public setEmail(_email: string): void {
        this.email = _email;
    }

      public setCelular(_celular: number): void {
        this.celular = _celular;
    }

     static async listarAluno(): Promise<Array<Aluno> | null> {
        try {
          
            let listaDeAluno: Array<Aluno> = [];

           
            const querySelectAluno = `SELECT * FROM Aluno;`;
            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((AlunoBD: any) => {
                const novoAluno: Aluno  = new Aluno (
                    AlunoBD.ra,
                    AlunoBD.nome,
                    AlunoBD.sobrenome,
                    AlunoBD.data_nascimento,
                    AlunoBD.endereco,
                    AlunoBD.email,
                    AlunoBD.celular
                );

                novoAluno.setId_aluno(AlunoBD.id_Aluno);

                listaDeAluno.push(novoAluno);
            });

            return listaDeAluno;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarAluno(Aluno: AlunoDTO): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO Aluno (nome, fabricante, principio_ativo, data_validade, preco)
                                VALUES
                                ($1, $2, $3, $4, $5)
                                RETURNING id_Aluno;`;

            const respostaBD = await database.query(queryInsertAluno, [
                Aluno.nome.toUpperCase(),
                Aluno.ra,
                Aluno.sobrenome, 
                Aluno.data_nascimento,             
                Aluno.endereco,
                Aluno.email,
                Aluno.celular           
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Aluno  cadastrado com sucesso. ID: ${respostaBD.rows[0].id_Aluno}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listaAlunosPorId(idAluno: number): Promise<Aluno  | null> {
        try{
            const querySelectAluno = `SELECT * FROM Aluno WHERE id_Aluno=$1;`;

            const respostaBD = await database.query(querySelectAluno, [idAluno]);

            if(respostaBD.rowCount != 0) {
                const aluno: Aluno  = new Aluno (
                    respostaBD.rows[0].ra,
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].sobrenome,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].endereco,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].celular
                );
                aluno.setId_aluno(respostaBD.rows[0].id_Aluno);

                return aluno;
            }

            return null;
        }catch (error) {
            console.error(`Erro ao buscar Aluno no banco de dados. ${error}`);
            return null;
        }
    }

}

export default Aluno ;
