import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {


    static async todos(req: Request, res: Response): Promise<Response> {
        try {
           
            const listaEmprestimos: Array<Emprestimo> | null = await Emprestimo.listarEmprestimo();

            return res.status(200).json(listaEmprestimos);
        } catch (error) {
            
            console.error(`Erro ao consultar modelo. ${error}`);

           
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Emprestimos." });
        }
    }


    static async novo(req: Request, res: Response): Promise<Response> {
        try {
           
            const dadosRecebidosEmprestimo = req.body;

          
            const respostaModelo = await Emprestimo.cadastrarEmprestimo(dadosRecebidosEmprestimo);

            if (respostaModelo) {
                
                return res.status(201).json({ mensagem: "Emprestimo cadastrado com sucesso." });
            } else {
                
                return res.status(400).json({ mensagem: "Erro ao cadastrar Emprestimo." });
            }
        } catch (error) {
          
            console.error(`Erro no modelo. ${error}`);

  
            return res.status(500).json({ mensagem: "Não foi possível inserir o Emprestimo" });
        }
    }


    static async Emprestimo(req: Request, res: Response): Promise<Response> {
        try {
          
            const idEmprestimo: number = parseInt(req.params.idEmprestimo as string);

          
            if (isNaN(idEmprestimo) || idEmprestimo <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

         
            const respostaModelo = await Emprestimo.listarEmprestimo();

           
            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Emprestimo encontrado com o ID fornecido." });
            }

          
            return res.status(200).json(respostaModelo);
        } catch (error) {
            
            console.error(`Erro ao acesso o modelo. ${error}`);

        
            return res.status(500).json({ mensagem: "Não foi possível recuperar o Emprestimo." });
        }
    }
}

export default EmprestimoController;