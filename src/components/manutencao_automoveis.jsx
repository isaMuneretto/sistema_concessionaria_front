import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const ManutencaoAutomoveis = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [automoveis, setAutomoveis] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("automoveis");
            setAutomoveis(lista.data.automoveis);
            console.log(lista)
            
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }

//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try {
        const lista = await api.get(`automoveis/filtro/${campos.palavra}`);
        
        lista.data.length
            ? setAutomoveis(lista.data)  // Correção aqui
            : alert("Não há automóveis cadastrados com a palavra chave pesquisada");
    } catch (error) {
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}


const excluir = async(id,titulo) => {
    if(!window.confirm(`Confirma a exclusão do Automóvel ${titulo}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`automoveis/${id}`);
        //formar uma nova lista de automóveis sem o automóvel que foi excluido
        setAutomoveist(automoveis.filter(automoveis => automoveis.id !== id));

    }catch(error){
        alert(`Erro: ..Não foi possível excluir o automóvel ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,titulo,index) => {
    const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
    if (novoStatus == "" ) {
        alert('Digite um status válido!(status em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`tarefas/${id}`,{status: novoStatus});
        
        const TarefasAtualizadas = [...tarefas];
        const indiceTarefas = TarefasAtualizadas.find(tarefas => tarefas.id === id);
        console.log("indice tarefa:"+indiceTarefas);
        TarefasAtualizadas[indiceTarefas.id].status = novoStatus;
        setTarefas(TarefasAtualizadas);
        obterLista();
    
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a tarefa ${titulo}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Tarefas</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {automoveis.map((Automovel) => (
                    <ItemLista
                        key={Automovel.id}
                        id={Automovel.id}
                        nome={Automovel.nome}
                        excluirClick={()=>excluir(Automovel.id,Automovel.nome)}
                        alterarClick={()=>alterar(Automovel.id,Automovel.nome)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoAutomoveis;