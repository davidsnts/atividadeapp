import { useState, useEffect } from "react";

const useAtividades = () => {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    setAtividades([
      {
        id: 1,
        titulo: "Estudar React",
        descricao: "Aprender Hooks",
        prioridade: "Alta",
      },
      {
        id: 2,
        titulo: "Treinar",
        descricao: "Academia 1h",
        prioridade: "Normal",
      },
    ]);
  }, []);

  const addAtividade = (atividade) => {
    setAtividades([...atividades, atividade]);
  };

  const atualizarAtividade = (atividades) => {
    setAtividades(atividades);
  };

  const apagarAtividade = (idAtvd) => {
    setAtividades(atividades.filter((x) => x.id !== idAtvd));
  };

  return {
    atividades,
    setAtividades,
    addAtividade,
    atualizarAtividade,
    apagarAtividade,
  };
};

export default useAtividades;
