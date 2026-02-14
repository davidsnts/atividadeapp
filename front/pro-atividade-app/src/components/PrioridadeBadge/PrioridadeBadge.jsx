import React from "react";
import "./PrioridadeBadge.css";

const PrioridadeBadge = ({ prioridade }) => {
  const getClass = (p) => {
    if (p === "Alta") return "badge-alta";
    if (p === "Normal") return "badge-normal";
    return "badge-baixa";
  };

  return (
    <span
      className={`prioridade-badge ${getClass(prioridade)}`}
      aria-label={`Prioridade ${prioridade}`}    >
      <span className="prioridade-text">{prioridade}</span>
    </span>
  );
};

export default PrioridadeBadge;
