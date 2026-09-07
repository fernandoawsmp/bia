import React, { useState } from "react";
import Modal from "./Modal";

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [dia, setDia] = useState("");
  const [importante, setImportante] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Converte YYYY-MM-DD (formato do input nativo) para DD/MM/YYYY (formato da API)
  // Se nenhuma data for selecionada, usa a data de hoje
  const formatarData = (dataISO) => {
    if (!dataISO) return new Date().toLocaleDateString('pt-BR');
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    onAdd({
      titulo: titulo.trim(),
      dia_atividade: formatarData(dia),
      importante,
    });

    setTitulo("");
    setDia("");
    setImportante(true);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
      </div>

      <div className="form-control-check">
        <input
          type="checkbox"
          id="importante"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
        />
        <label htmlFor="importante">Importante</label>
      </div>

      <button type="submit" className="btn btn-block success">
        Incluir nova tarefa
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Campo obrigatório"
        message="Por favor, adicione uma descrição para a tarefa"
        type="warning"
      />
    </form>
  );
};

export default AddTask;
