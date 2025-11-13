import { Router } from "express"; 
import type { Request, Response } from "express"; 
import AlunoController from "./controller/AlunoController.js";
import Emprestimo from "./model/Emprestimo.js";
import EmprestimoController from "./controller/EmprestimoController.js";
import Livro from "./model/Livro.js";
import LivroController from "./controller/LivroController.js";
const router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

router.get("/api/aluno", AlunoController.todos);
router.post("/api/aluno", AlunoController.novo);

router.get("/api/emprestimo", EmprestimoController.todos);
router.post("/api/emprestimo", EmprestimoController.novo);

router.get("/api/Livro", LivroController.todos);
router.post("/api/Livro", LivroController.novo);

router.get("/api/Aluno/:idAluno", AlunoController.Aluno);
export { router }; 