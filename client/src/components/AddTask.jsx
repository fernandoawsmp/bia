import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

// Registrar locale pt-BR para o calendário
registerLocale("pt-BR", ptBR);

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [dia, setDia] = useState(null);
  const [importante, setImportante] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Converte objeto Date para string DD/MM/YYYY (formato da API)
  // Se nenhuma data for selecionada, usa a data de hoje
  const formatarData = (date) => {
    if (!date) return new Date().toLocaleDateString("pt-BR");
    return date.toLocaleDateString("pt-BR");
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
    setDia(null);
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
        <DatePicker
          id="data"
          selected={dia}
          onChange={(date) => setDia(date)}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          placeholderText="Quando?"
          isClearable
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="datepicker-input"
          wrapperClassName="datepicker-wrapper"
          popperPlacement="bottom-start"
          autoComplete="off"
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
