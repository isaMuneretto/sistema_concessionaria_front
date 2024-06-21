import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";

const Cadastrar_Funcionario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [concessionarias, setConcessionarias] = useState([]);

  useEffect(() => {
    const fetchConcessionarias = async () => {
      try {
        const response = await api.get("/concessionarias"); // Replace with your API endpoint
        setConcessionarias(response.data.concessionarias);
        console.log(response.data.concessionarias);
      } catch (error) {
        console.error("Erro ao buscar concessionarias:", error);
      }
    };
    fetchConcessionarias();
  }, []);

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
    <div className="container-fluid margin-top: 50px bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
          <h4 className="fst-italic mb-4">Cadastrar Funcionário</h4>
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
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input
                type="text"
                className="form-control"
                id="data_nascimento"
                required
                autoFocus
                {...register("data_nascimento")}
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

            {concessionarias.length > 0 && ( // Conditionally render dropdown
              <div className="form-group mt-2">
                <label htmlFor="concessionarias_id">Concessionária:</label>
                <select
                  className="form-control"
                  id="concessionarias_id"
                  required
                  {...register("concessionarias_id")}
                >
                  <option value="">Selecione uma concessionária</option>
                  {concessionarias.map((concessionaria) => (
                    <option key={concessionaria.id} value={concessionaria.id}>
                      {concessionaria.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}


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
