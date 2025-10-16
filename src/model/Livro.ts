class Livro{
    private id_livro: number;
    private titulo: string;
    private autor: string;
    private editora: string;
    private ano_publicacao: number;
    private isbn: number;
    private quant_total: number;
    private quant_disponivel: number;
    private valor_aquisicao: number;
    private status_livro_emprestimo:string;



    constructor(
        _id_livro: number,
        _titulo: string,
        _autor: string,
        _editora: string,
        _ano_publicacao: number,
        _isbn: number,
        _quant_total: number,
        _quant_disponivel: number,
        _valor_aquisicao: number,
        _sttus_livro_emprestimo: string,
    ){
        this.id_livro = _id_livro;
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora= _editora;
        this.ano_publicacao = _ano_publicacao;
        this.isbn = _isbn;
        this.quant_total = _quant_total;
        this.quant_disponivel = _quant_disponivel;
        this.valor_aquisicao = _valor_aquisicao;
        this.status_livro_emprestimo = _sttus_livro_emprestimo;
    }

    public getid_livro(): number{
        return this.id_livro;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public getAutor(): string{
        return this.autor;
    }

    public getEditora(): string{
        return this.editora;
    }

    public getAno_puplicacao(): number{
        return this.ano_publicacao;
    }

    public getIsbn(): number{
        return this.isbn;
    }

    public getQuant_total(): number{
        return this.quant_total;
    }

    public getQuant_disponivel(): number{
        return this.quant_disponivel;
    }

    public getVolor_aquisicao(): number{
        return this.valor_aquisicao;
    }

    public getStatus_do_livro(): string{
        return this.status_livro_emprestimo;
    }

}
    export default Livro;