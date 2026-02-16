import { Button, Container, Row, Col } from "react-bootstrap";
import { FaPlus, FaTasks } from "react-icons/fa";
import "./App.css";
import { useState } from "react";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeList from "./components/AtividadeList";
import useAtividades from "./hooks/useAtividades";

function App() {
  const { atividades, setAtividades, addAtividade, atualizarAtividade, apagarAtividade } = useAtividades();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoAtividade, setEditandoAtividade] = useState(false);
  const [atividadeEmEdicao, setAtividadeEmEdicao] = useState(null);

  const handleEditarAtividade = (atividade) => {
    setAtividadeEmEdicao(atividade);
    setEditandoAtividade(true);
    setMostrarFormulario(true);
  };

  const handleApagarAtividade = (idAtvd) => {
    if (!window.confirm("Deseja realmente apagar esta atividade?")) return;
    apagarAtividade(idAtvd);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <div className="header-section">
            <div className="header-title">
              {/* <FaTasks /> */}
              Gerenciador de Atividades
            </div>
            <div className="header-subtitle">
              ✨ Organize suas tarefas e aumente sua produtividade
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="btn-botoes-section">
            <Button
              className={mostrarFormulario ? "btn-fechar" : "btn-nova-atividade"}
              onClick={() => {
                setMostrarFormulario(!mostrarFormulario);
                if (mostrarFormulario) {
                  setAtividadeEmEdicao(null);
                  setEditandoAtividade(false);
                }
              }}
            >
              {mostrarFormulario ? (
                "✕ Fechar"
              ) : (
                <>
                  + Nova Atividade
                </>
              )}
            </Button>
          </div>

          {mostrarFormulario && (
            <AtividadeForm
              setAtividades={setAtividades}
              setEditandoAtividade={setEditandoAtividade}
              setMostrarFormulario={setMostrarFormulario}
              editandoAtividade={editandoAtividade}
              atividades={atividades}
              atividadeEmEdicao={atividadeEmEdicao}
              addAtividade={addAtividade}
              atualizarAtividade={atualizarAtividade}
            />
          )}

          {!mostrarFormulario && (
            <AtividadeList
              atividades={atividades}
              onEdit={handleEditarAtividade}
              onDelete={handleApagarAtividade}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
