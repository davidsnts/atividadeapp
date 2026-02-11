import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FaPlus, FaEdit, FaTrash, FaTasks } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [atividades, setAtividades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [prioridade, setPrioridade] = useState("Normal");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoAtividade, setEditandoAtividade] = useState(false);

  const resetFormulario = () => {
    setId("");
    setTitulo("");
    setDescricao("");
    setPrioridade("Normal");
    setMsg("");
    setEditandoAtividade(false);
  };

  const apagarAtividade = (idAtvd) => {
    if (!window.confirm("Deseja realmente apagar esta atividade?")) return;

    setAtividades(atividades.filter((x) => x.id !== idAtvd));
  };

  const editarAtividade = (atividade) => {
    setDescricao(atividade.descricao);
    setId(atividade.id);
    setTitulo(atividade.titulo);
    setPrioridade(atividade.prioridade);
    setMostrarFormulario(true);
  };

  const addAtividade = (e) => {
    e.preventDefault();

    if (!Number(id)) {
      setMsg("ID deve ser número!");
      return;
    }

    if (!descricao || !titulo) {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (editandoAtividade) {
      const listaAtualizada = atividades.map((ativ) =>
        ativ.id === Number(id)
          ? { id: Number(id), titulo, descricao, prioridade }
          : ativ
      );

      setAtividades(listaAtualizada);
      setEditandoAtividade(false);
    } else {
      if (atividades.some((x) => x.id === Number(id))) {
        setMsg("Esse ID já existe!");
        return;
      }

      setAtividades([
        ...atividades,
        { id: Number(id), titulo, descricao, prioridade },
      ]);
    }

    resetFormulario();
    setMostrarFormulario(false);
  };

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

  const corPrioridade = (p) => {
    if (p === "Alta") return "danger";
    if (p === "Normal") return "warning";
    return "success";
  };

  return (
    <Container className="py-5">
      {/* HEADER */}
      <Row className="mb-4">
        <Col className="text-center">
          <h2 className="fw-bold">
            <FaTasks className="me-2" />
            Gerenciador de Atividades
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          {/* BOTÃO NOVA ATIVIDADE */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant={mostrarFormulario ? "secondary" : "primary"}
              onClick={() => {
                if (mostrarFormulario) {
                  resetFormulario();
                  setMostrarFormulario(false);
                } else {
                  setMostrarFormulario(true);
                }
              }}
            >
              {mostrarFormulario ? "Fechar" : <><FaPlus /> Nova Atividade</>}
            </Button>
          </div>

          {/* FORMULÁRIO */}
          {mostrarFormulario && (
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  {editandoAtividade
                    ? "✏️ Editando Atividade"
                    : "Cadastrar Atividade"}
                </Card.Title>

                <Form onSubmit={addAtividade}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          value={id}
                          disabled={editandoAtividade}
                          onChange={(e) => setId(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                          value={titulo}
                          onChange={(e) => setTitulo(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mt-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Prioridade</Form.Label>
                    <Form.Select
                      value={prioridade}
                      onChange={(e) => setPrioridade(e.target.value)}
                    >
                      <option>Baixa</option>
                      <option>Normal</option>
                      <option>Alta</option>
                    </Form.Select>
                  </Form.Group>

                  <Button className="w-100 mt-4" type="submit">
                    {editandoAtividade ? "Salvar Alterações" : "+ Atividade"}
                  </Button>

                  {msg && (
                    <div className="text-danger text-center mt-3">{msg}</div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          )}

          {/* LISTA */}
          {!mostrarFormulario && (
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="mb-3">Minhas Atividades</Card.Title>

                {atividades.length === 0 && (
                  <p className="text-center text-muted">
                    Nenhuma atividade cadastrada
                  </p>
                )}

                <ListGroup variant="flush">
                  {atividades.map((ativ) => (
                    <ListGroup.Item key={ativ.id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1 fw-bold">
                            #{ativ.id} — {ativ.titulo}
                          </h6>
                          <small className="text-muted">
                            {ativ.descricao}
                          </small>
                        </div>

                        <div className="text-end">
                          <Badge bg={corPrioridade(ativ.prioridade)}>
                            {ativ.prioridade}
                          </Badge>

                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-1"
                              onClick={() => {
                                setEditandoAtividade(true);
                                editarAtividade(ativ);
                              }}
                            >
                              <FaEdit />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => apagarAtividade(ativ.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
