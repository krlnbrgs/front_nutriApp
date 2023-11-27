'use client';
import Botao from "@/components/receitas/botao";
import Formulario from "@/components/receitas/formulario";
import Layout from "@/components/receitas/layout";
import Tabela from "@/components/receitas/tabela";
import Receita from "@/core/Receita";
import { atualizarReceita, cadastrarReceita, excluirReceita, fetchReceitas } from "@/service/receitaService";

import { useEffect, useState } from "react";

export default function Receitas() {

  const [receita, setReceita] = useState<Receita>(Receita.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [receitas, setReceitas] = useState<Receita[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      console.log("Antes loadReceitas");
      const loadReceitas = async () => {
        try {
          const dados = await fetchReceitas();
          console.log("Dados recebidos:", dados);
          setReceitas(dados);
          console.log("Depois de setReceitas");
        } catch (error) {
          console.error("Erro ao buscar receitas:", error);
        }
      }

      loadReceitas();
    }
  }, [visivel]);


  function receitaSelecionada(receita: Receita) {
    setReceita(receita)
    setVisivel('form')
  }

  async function receitaExcluida(receita: Receita) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir esta Receita?");
    if (confirmacao) {
      try {
        if (receita.id !== null) {
          await excluirReceita(receita.id);
        } else {
          console.error("receitaId é null!");
        }
        setReceitas(prevReceitas => prevReceitas.filter(rec => rec.id !== receita.id));
      } catch (error) {
        console.error("Erro ao excluir receita:", error);
      }
    }
  }

  function salvarOuAlterarReceita(receita: Receita) {
    if (receita.id) {
      alterarReceita(receita)
    } else {
      salvarReceita(receita)
    }
  }

  async function alterarReceita(receita: Receita) {
    try {
      const receitaAtualizada = await atualizarReceita(receita);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar Receita:", error);
    }
  }

  async function salvarReceita(receita: Receita) {
    try {
      const novaReceita = await cadastrarReceita(receita);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar Receita:", error);
    }
  }

  function novaReceita() {
    setReceita(Receita.vazio())
    setVisivel("form")
  }

  return (
    <div className={`
     flex justify-center items-center h-screen
     bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
     text-white`}>
      <Layout titulo="Cadastro de Receitas">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novaReceita()}>
                Nova Receita
              </Botao>
            </div>
            <Tabela receitas={receitas}
              receitaSelecionada={receitaSelecionada}
              receitaExcluida={receitaExcluida}></Tabela>
          </>
        ) : (
          <Formulario receita={receita}
          receitaMudou={salvarOuAlterarReceita}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
