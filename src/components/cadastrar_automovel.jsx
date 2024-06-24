import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";

const Cadastrar_Automovel = () => {
  const { register, handleSubmit, reset} = useForm();
  const [aviso, setAviso] = useState("");
  const [concessionarias_id, setConcessionarias_id] = useState(''); 

useEffect(() => {
    const storedId = localStorage.getItem('concessionarias_id'); // Get the name from localStorage
    console.log(storedId);
    if (storedId) {
      setConcessionarias_id(storedId); // Update the state with the retrieved name
    }
  }, []); 

  const salvar = async (campos) => {
    try {
      const response = await api.post("automoveis", campos);
      setAviso(`Automovel cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar automóvel!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Automóvel</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="titulo">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              autoFocus
              {...register("nome")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="concessionarias_id">Concessionária Id</label>
            <input
              type="number"
              className="form-control"
              id="concessionarias_id"
              value = {concessionarias_id}
              required
              autoFocus
              {...register("concessionarias_id")}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_Automovel;
