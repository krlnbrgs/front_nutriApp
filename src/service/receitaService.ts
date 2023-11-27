import axios from 'axios';
import Receita from '../core/Receita';

interface ApiResponse {
    content: Receita[];
}

const BASE_URL = 'http://localhost:8080';

export const fetchReceitas = async (): Promise<Receita[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/receitas`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar Receitas');
  }
};

export const cadastrarReceita = async (receita: Receita): Promise<Receita> => {
    try {
      const response = await axios.post<Receita>(`${BASE_URL}/receitas`, receita);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar Receita:", error);
      throw error;
    }
  };

  export const atualizarReceita = async (receita: Receita): Promise<Receita> => {
    try {
      const response = await axios.put<Receita>(`${BASE_URL}/receitas/${receita.id}`, receita);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar Receita:", error);
      throw error;
    }
  };

  export const excluirReceita = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/receitas/${id}`);
    } catch (error) {
      console.error("Erro ao excluir Receita:", error);
      throw error;
    }
  };