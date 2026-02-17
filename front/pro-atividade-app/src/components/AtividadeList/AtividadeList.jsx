import React, { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import AtividadeItem from "../AtividadeItem";
import "./AtividadeList.css";

const AtividadeList = ({ atividades, onEdit, onDelete }) => {
  return (
    <div className="list-card">
      <Card className="shadow-0 border-0">
        <Card.Body className="p-0">
          <div className="list-header">
            <h2 className="list-title">📋 Minhas Atividades</h2>
            <span className="list-count">{atividades.length}</span>
          </div>

          {atividades.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p className="empty-text">Nenhuma atividade cadastrada</p>
              <p className="empty-subtext">
                Crie uma nova atividade para começar!
              </p>
            </div>
          )}

          {atividades.length > 0 && (
            <ListGroup variant="flush" className="list-items">
              {atividades.map((ativ) => (
                <AtividadeItem
                  key={ativ.id}
                  atividade={ativ}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AtividadeList;
