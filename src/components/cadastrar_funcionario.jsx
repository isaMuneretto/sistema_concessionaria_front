import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_Funcionario = () => {
  const { register, handleSubmit,reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("funcionarios", campos);
      setAviso(`Funcionário cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar funcionário!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Funcionário</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
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
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              required
              autoFocus
              {...register("cpf")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input
              type="text"
              className="form-control"
              id="celular"
              required
              autoFocus
              {...register("celular")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="text"
              className="form-control"
              id="dataNascimento"
              required
              autoFocus
              {...register("dataNascimento")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              {...register("email")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="senha">Senha:</label>
            <input
              type="senha"
              className="form-control"
              id="senha"
              required
              {...register("senha")}
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

export default Cadastrar_Funcionario;
