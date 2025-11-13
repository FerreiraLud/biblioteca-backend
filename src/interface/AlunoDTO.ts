export interface AlunoDTO {
    idAluno? : number,
    ra: number,
    nome: string,
    sobrenome: string,
    data_nascimento: number,
    endereco: string,
    email: string,
    celular: number,
    situacao?: boolean
}