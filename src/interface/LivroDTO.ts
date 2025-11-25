export interface LivroDTO {
    idLivro? : number,
    titulo: string,
    autor: string,
    editora: string,
    anoPuplicacao: number,
    isbn: number,
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestimo: string,
    situacao?: boolean
}