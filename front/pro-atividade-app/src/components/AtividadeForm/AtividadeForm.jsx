import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import './AtividadeForm.css';

const AtividadeForm = (props) => {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Normal");

  useEffect(() => {
    if (props.editandoAtividade && props.atividadeEmEdicao) {
      setId(props.atividadeEmEdicao.id);
      setTitulo(props.atividadeEmEdicao.titulo);
      setDescricao(props.atividadeEmEdicao.descricao);
      setPrioridade(props.atividadeEmEdicao.prioridade);
    }
  }, [props.editandoAtividade, props.atividadeEmEdicao]);

  const resetFormulario = () => {
    setId("");
    setTitulo("");
    setDescricao("");
    setPrioridade("Normal");
    setMsg("");
    props.setEditandoAtividade(false);
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

    if (props.editandoAtividade) {
      const listaAtualizada = props.atividades.map((ativ) =>
        ativ.id === Number(id)
          ? { id: Number(id), titulo, descricao, prioridade }
          : ativ,
      );

      props.setAtividades(listaAtualizada);
      props.setEditandoAtividade(false);
    } else {
      if (props.atividades.some((x) => x.id === Number(id))) {
        setMsg("Esse ID já existe!");
        return;
      }

      props.setAtividades([
        ...props.atividades,
        { id: Number(id), titulo, descricao, prioridade },
      ]);
    }

    resetFormulario();
    props.setMostrarFormulario(false);
  };

  return (
    <div className="form-card">
      <Card className="shadow-0 border-0">
        <Card.Body>
          <div className="form-title">
            <span className="form-title-icon">
              {props.editandoAtividade ? "✏️" : "➕"}
            </span>
            {props.editandoAtividade ? "Editando Atividade" : "Cadastrar Atividade"}
          </div>

          <Form onSubmit={addAtividade}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ex: 1"
                  value={id}
                  disabled={props.editandoAtividade}
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  placeholder="Digite o título da atividade..."
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
              placeholder="Descreva em detalhes o que precisa fazer..."
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

          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              {props.editandoAtividade ? "💾 Salvar Alterações" : "✅ Criar Atividade"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                resetFormulario();
                props.setMostrarFormulario(false);
              }}
            >
              ✕ Cancelar
            </button>
          </div>

          {msg && <div className="form-error">{msg}</div>}
        </Form>
      </Card.Body>
    </Card>
    </div>
  );
};

export default AtividadeForm;
