export interface LivroDTO {
    idLivro? : number,
    titulo: string,
    autor: string,
    editora: string,
    ano_puplicacao: number,
    isbn: number,
    quant_total: number,
    quant_disponivel: number,
    valor_aquisicao: number,
    status_livro_emprestimo: string,
    situacao?: boolean
}