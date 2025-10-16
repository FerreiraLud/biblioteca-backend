class Aluno {
    private id_aluno: number;
    private ra: number;
    private nome: string;
    private sobrenome: string;
    private data_nascimento: number;
    private endereco: string;
    private email: string;
    private celular: number;


    constructor(
        _id_aluno: number,
        _ra: number,
        _nome: string,
        _sobrenome: string,
        _data_nascimento: number,
        _endereco: string,
        _email: string,
        _celular: number,
    ){
        this.id_aluno = _id_aluno;
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.data_nascimento = _data_nascimento;
        this.endereco = _endereco;
        this.email = _endereco;
        this.celular = _celular;
    }

     public getId_aluno(): number {
        return this.id_aluno;
    }

     public getRa(): number {
        return this.ra;
    }

     public getNome(): string {
        return this.nome;
    }

     public getSobrenome(): string {
        return this.sobrenome;
    }

     public getData_nascimento(): number {
        return this.data_nascimento;
    }

     public getEndereco(): string {
        return this.endereco;
    }

     public getEmail(): string {
        return this.email;
    }

     public getCelular(): number {
        return this.celular;
    }

      public setId_aluno(_id_aluno: number): void {
        this.id_aluno = _id_aluno;
    }

      public setRa(_ra: number): void {
        this.ra = _ra;
    }

      public setNome(_nome: string): void {
        this.nome = _nome;
    }

      public setSobrenome(_sobrenome: string): void {
        this.sobrenome = _sobrenome;
    }

      public setData_nascimento(_data_nascimento: number): void {
        this.data_nascimento = _data_nascimento;
    }

      public setEndereco(_endereco: string): void {
        this.endereco = _endereco;
    }

      public setEmail(_email: string): void {
        this.email = _email;
    }

      public setCelular(_celular: number): void {
        this.celular = _celular;
    }
}

export default Aluno;