export default class Receita {
    id: number | null;
    nome: string;
    descricao: string;

    constructor(id: number | null, nome: string, descricao: string){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }

    static vazio(): Receita {
    return new Receita(null, "", "");
    }
}