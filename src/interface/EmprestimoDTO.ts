export interface EmprestimoDTO {
    idEmprestimo? : number,
    idAluno: number,
    idLivro: number,
    dataEmprestimo: number,
    dataDevolucao: number,
    statusEmprestimo: string,
    situacao?: boolean
}