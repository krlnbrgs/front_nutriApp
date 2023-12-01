import Receita from "@/core/Receita"
import { IconeEdicao, IconeLixo } from "../icones/tabela"

interface TabelaProps {
    receitas: Receita[]
    receitaSelecionada?: (receita: Receita) => void
    receitaExcluida?: (receita: Receita) => void
}

export default function Tabela(props: TabelaProps) {
    
    const exibirAcoes = props.receitaSelecionada || props.receitaExcluida

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">NOME</th>
                <th className="text-left p-3">DESCRIÇÃO</th>
                {exibirAcoes ? <th className="p-3">AÇÕES</th> : false}
            </tr>
        )
    }

    function renderDados() {
        return props.receitas?.map((receita, i) => {
            return (
                <tr key={receita.id}
                    className={`${i % 2 === 0 ? 'bg-yellow-200' : 'bg-yellow-100'} `}>
                    <td className="text-left p-3">{receita.id}</td>
                    <td className="text-left p-3">{receita.nome}</td>
                    <td className="text-left p-3">{receita.descricao}</td>
                    {exibirAcoes 
                    ? renderizarAcoes(receita)
                    : false }
                </tr>
            )
        })
    }

    function renderizarAcoes(receita: Receita) {
        return (
            <td className="flex justify-center">
                {props.receitaSelecionada ? (
                    <button onClick={() => props.receitaSelecionada?.(receita)} className={`flex justify-center items
                    text-green-800 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false }
                {props.receitaExcluida ? (
                    <button onClick={() => props.receitaExcluida?.(receita)} className={`flex justify-center items
                    text-red-800 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeLixo}</button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
            bg-gradient-to-r from-yellow-500 to-yellow-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )
}