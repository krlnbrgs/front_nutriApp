import Receita from "@/core/Receita";
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";

interface FormularioProps {
    receita: Receita
    receitaMudou?: (receita: Receita) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.receita?.id
    const [nome, setNome] = useState(props.receita?.nome)
    const [descricao, setDescricao] = useState(props.receita?.descricao)

    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Descrição" valor={descricao} onChange={setDescricao}></Entrada>
            <div className="flex justify-end mt-5">
                <Botao className="mr-3" cor="bg-gradient-to-r from-yellow-500 to-yellow-700"
                    onClick={() => props.receitaMudou?.(new Receita(
                        id, nome, descricao))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-red-500 to-red-700"
                    onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}