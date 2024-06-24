import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  


const Manutencao_Automoveis = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [automoveis, setAutomoveis] = useState([]);
    const [id, setId] = useState(''); 

    const obterLista = async () => {
        try {
            const lista = await api.get(`automoveis/${localStorage.getItem('concessionarias_id')}`);
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
    const storedId = localStorage.getItem('concessionarias_id'); // Get the name from localStorage
    console.log(storedId);
    setId(storedId);
},[]);

const filtrarLista = async (campos) => {
    try {
        const lista = await api.get(`automoveis/filtro/${campos.palavra}`);
        
        lista.data.length
            ? setAutomoveis(lista.data) 
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
        setAutomoveis(automoveis.filter(automoveis => automoveis.id !== id));

    }catch(error){
        alert(`Erro: ..Não foi possível excluir o automóvel ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,nome) => {
    const novoNome = prompt(`Digite o novo nome do automóvel ${nome}`);
    if (novoNome == "" ) {
        alert('Digite um nome válido!(nome em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`automoveis/${id}`,{nome: novoNome});
        
        const AutomoveisAtualizados = [...automoveis];
        const indiceAutomoveis = AutomoveisAtualizados.find(automoveis => automoveis.id === id);
        console.log("indice automovel:"+indiceAutomoveis);
        AutomoveisAtualizados[indiceAutomoveis.id].nome = novoNome;
        setAutomoveis(AutomoveisAtualizados);
        obterLista();
    
    }catch(error){
        alert(`Erro: ..Não foi possível alterar o automóvel ${nome}: ${error}`);
    }
}

    return (  
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Automóveis</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Nome" required {...register("palavra")} />
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

export default Manutencao_Automoveis;