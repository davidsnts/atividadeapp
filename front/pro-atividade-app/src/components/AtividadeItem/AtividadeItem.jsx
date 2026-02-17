import ListGroup from "react-bootstrap/ListGroup";
import { FaEdit, FaTrash } from "react-icons/fa";
import PrioridadeBadge from "../PrioridadeBadge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AtividadeItem.css";
import { useState } from "react";

const AtividadeItem = ({ atividade, onEdit, onDelete }) => {
  const [show, setShow] = useState(false);
  const [atividadeId, setAtivdadeId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ListGroup.Item className="atividade-item">
      <div className="atividade-header">
        <div className="atividade-info">
          <div className="atividade-titulo-item">
            <span className="atividade-id">#{atividade.id}</span>
            <span>{atividade.titulo}</span>
          </div>
          <p className="atividade-descricao-item">{atividade.descricao}</p>
        </div>

        <div className="item-actions">
          <PrioridadeBadge prioridade={atividade.prioridade} />

          <button
            className="btn-action btn-edit"
            onClick={() => onEdit(atividade)}
            title="Editar atividade"
            aria-label="Editar"
          >
            <FaEdit />
            <span className="btn-label">Editar</span>
          </button>

          <button
            className="btn-action btn-delete"
            // onClick={() => onDelete(atividade.id)}
            onClick={() => {
              (handleShow(), setAtivdadeId(atividade.id));
            }}
            title="Deletar atividade"
            aria-label="Deletar"
          >
            <FaTrash />
            <span className="btn-label">Apagar</span>
          </button>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deseja realmente excluir essa atividade?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => {
              onDelete(atividadeId);
              handleClose();
            }}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </ListGroup.Item>
  );
};

export default AtividadeItem;
