class Emprestimo {
    private id_emprestimo: number;
    private id_aluno: number;
    private id_livro: number;
    private data_emprestimo: number;
    private data_devolucao: number;
    private status_esprestimo: string;


    constructor(
        _id_emprestimo: number,
        _id_aluno: number,
        _id_livro: number,
        _data_emprestimo: number,
        _data_devolucao: number,
        _status_emprestimo: string,
    ){
        this.id_emprestimo = _id_emprestimo;
        this.id_aluno = _id_aluno;
        this.id_livro = _id_livro;
        this.data_emprestimo = _data_emprestimo;
        this.data_devolucao = _data_devolucao;
        this.status_esprestimo = _status_emprestimo;
    }

    public getId_emprestimo(): number{
        return this.id_emprestimo;
    }

    public getId_aluno(): number {
        return this.id_aluno;
    }

    public getId_livro(): number {
        return this.id_livro;
    }

    public getData_emprestimo(): number {
        return this.data_emprestimo;
    }

    public getData_devolucao(): number {
        return this.data_devolucao;
    }

    public getStatus_emprestimo(): string {
        return this.status_esprestimo;
    }

    public setId_emprestimo(_id_emprestimo: number): void {
        this.id_emprestimo = _id_emprestimo;
    }

    public setId_aluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

    public setId_livro(_id_livro: number): void {
        this.id_livro = _id_livro;
    }

    public setData_esprestimo(_data_emprestimo: number): void {
        this.data_emprestimo = _data_emprestimo;
    }

    public setData_devolucao(_data_devolucao: number): void {
        this.data_devolucao = _data_devolucao;
    }

    public setStatus_emprestimo(_status_emprestimo: string): void {
        this.status_esprestimo = _status_emprestimo;
    }
}
    export default Emprestimo;