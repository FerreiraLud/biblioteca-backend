import type { AlunoDTO } from "../interface/AlunoDTO.js";
import Aluno from "../model/Aluno.js";
import type { Request, Response } from "express";

class AlunoController extends Aluno {


    static async todos(req: Request, res: Response): Promise<Response> {
        try {

            const listaAlunos: Array<Aluno> | null = await Aluno.listarAluno();

            return res.status(200).json(listaAlunos);
        } catch (error) {

            console.error(`Erro ao consultar modelo. ${error}`);


            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Alunos." });
        }
    }


    static async novo(req: Request, res: Response): Promise<Response> {
        try {

            const dadosRecebidosAluno = req.body;


            const respostaModelo = await Aluno.cadastrarAluno(dadosRecebidosAluno);

            if (respostaModelo) {

                return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso." });
            } else {

                return res.status(400).json({ mensagem: "Erro ao cadastrar Aluno." });
            }
        } catch (error) {

            console.error(`Erro no modelo. ${error}`);


            return res.status(500).json({ mensagem: "Não foi possível inserir o Aluno" });
        }
    }


    static async Aluno(req: Request, res: Response): Promise<Response> {
        try {

            const idAluno: number = parseInt(req.params.idAluno as string);


            if (isNaN(idAluno) || idAluno <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }


            const respostaModelo = await Aluno.listarAluno();


            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Aluno encontrado com o ID fornecido." });
            }


            return res.status(200).json(respostaModelo);
        } catch (error) {

            console.error(`Erro ao acesso o modelo. ${error}`);


            return res.status(500).json({ mensagem: "Não foi possível recuperar o Aluno." });
        }
    }
}

export default AlunoController;