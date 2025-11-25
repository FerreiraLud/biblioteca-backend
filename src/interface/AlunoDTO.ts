export interface AlunoDTO {
    idAluno? : number,
    ra: number,
    nome: string,
    sobrenome: string,
    dataNascimento: number,
    endereco: string,
    email: string,
    celular: number,
    situacao?: boolean
}