import { useState, useEffect } from "react";
import { atividadeService } from "../services/api";


const useAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      setLoading(true);
      const response = await atividadeService.getAll();
      setAtividades(response.data);
      setErro(null);
    } catch (err) {
      console.error("Erro ao carregar atividades:", err);
      setErro(err.message);     
    } finally {
      setLoading(false);
    }
  }

  const addAtividade = async (atividade) => {
    try {
      const response = await atividadeService.create(atividade);
      // Se a API retorna os dados, usar eles; senão, usar o objeto enviado
      const novaAtividade = response.data && Object.keys(response.data).length > 0 
        ? response.data 
        : atividade;
      setAtividades(prev => [...prev, novaAtividade]);
      // garantir consistência com backend atualizando a lista
      try { await carregarAtividades(); } catch (e) { /* não bloquear o fluxo principal */ }
      setErro(null);
      return novaAtividade;
    } catch (err) {
      console.error("Erro ao adicionar atividade:", err);
      setErro(err.message);
      throw err;
    }
  };

  const atualizarAtividade = async (id, atividade) => {
    try {      
      const response = await atividadeService.update(id, atividade);
      const atividadeAtualizada = response.data && Object.keys(response.data).length > 0 
        ? response.data 
        : atividade;
      setAtividades(prev => prev.map(a => a.id === id ? atividadeAtualizada : a));
      try { await carregarAtividades(); } catch (e) { }
      setErro(null);
      return atividadeAtualizada;
    } catch (err) {
      console.error("Erro ao atualizar atividade:", err);
      setErro(err.message);
      throw err;
    }
  };

  const apagarAtividade = async (idAtvd) => {
    try {
      await atividadeService.delete(idAtvd);
      setAtividades(prev => prev.filter(x => x.id !== idAtvd));
      try { await carregarAtividades(); } catch (e) { }
      setErro(null);
    } catch (err) {
      console.error("Erro ao apagar atividade:", err);
      setErro(err.message);
      throw err;
    }
  };

  return {
    atividades,
    addAtividade,
    atualizarAtividade,
    apagarAtividade,
    loading,
    erro,
    carregarAtividades
  };
};

export default useAtividades;
