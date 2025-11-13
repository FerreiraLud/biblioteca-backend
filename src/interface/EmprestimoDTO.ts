export interface EmprestimoDTO {
    idEmprestimo? : number,
    idAluno: number,
    idLivro: number,
    data_emprestimo: number,
    data_devolucao: number,
    status_emprestimo: string,
    situacao?: boolean
}