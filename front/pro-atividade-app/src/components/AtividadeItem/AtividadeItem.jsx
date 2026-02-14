import ListGroup from 'react-bootstrap/ListGroup'
import { FaEdit, FaTrash } from 'react-icons/fa'
import PrioridadeBadge from '../PrioridadeBadge'
import './AtividadeItem.css'

const AtividadeItem = ({ atividade, onEdit, onDelete }) => {
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
            onClick={() => onDelete(atividade.id)}
            title="Deletar atividade"
            aria-label="Deletar"
          >
            <FaTrash />
            <span className="btn-label">Apagar</span>
          </button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default AtividadeItem;
