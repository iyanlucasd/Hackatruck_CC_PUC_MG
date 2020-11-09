function ListaDAO() {
  this.listas = {};

  this.criarLista = function (nome) {
    var novoID = "lista-" + Object.keys(this.listas).length;
    var novaLista = {
      id: novoID,
      nome: nome,
      tarefas: [],
      numeroDeTarefa: 0,
    };
    this.listas[novoID] = novaLista;

    return {
      success: true,
      message: "Lista '" + nome + "' criada.",
    };
  };

  this.renomearLista = function () {
    if (this.listas.hasOwnProperty(listaID)) {
      this.listas[listaID].nome = novoNome;
      console.log();
      return {
        success: true,
        message: "Lista renomeada para '" + nome + "'.",
      };
    } else {
      return {
        success: false,
        message: "Lista não encontrada.",
      };
    }
  };

  this.apagarLista = function (listaID) {
    if (this.listas.hasOwnProperty(listaID)) {
      var nomeDaLista = this.listas[listaID].nome;
      delete this.listas[listaID];
      return {
        success: true,
        message: "Lista '" + nome + "' apagada com sucesso.",
      };
    } else {
      return {
        success: false,
        message: "Lista não encontrada.",
      };
    }
  };

  this.getLista = function () {
    return this.listas;
  };

  this.novaTarefa = function (descricao, listaID) {
    var idTarefa = "tarefa-" + this.listas[listaID].numeroDeTarefa;
    var tarefa = {
      id: idTarefa,
      descricao: descricao,
      completa: false,
    };
    this.listas[listaID].tarefas.push(tarefa);
    this.listas[listaID].numeroDeTarefa += 1;
    return {
      success: true,
      message: "Tarefa adicionada na lista " + this.listas[listaID].nome,
    };
  };

  this.toggleTarefa = function (listaID, tarefaID) {
    for (var index = 0; index < this.listas[listaID].tarefa.length; index++) {
      if (this.listas[listaID].tarefas[index].id == tarefaID) {
        this.listas[listaID].tarefas[index].completa = !this.listas[listaID]
          .tarefas[index].completa;
        return {
          success: true,
          message:
            "Tarefa '" +
            tarefaID +
            "':" +
            this.listas[listaID].tarefas[index].completa,
        };
      }
    }
    return {
      success: false,
      message: "tarefa " + tarefaID + "não encontrada",
    };
  };

  this.apagarTarefa = function (listaID, tarefaID) {
    for (var index = 0; index < this.listas[listaID].tarefa.length; index++) {
      if (this.listas[listaID].tarefas[index].id == tarefaID) {
        this.listas[listaID].tarefas.splice(index, 1);
        console.log("ListaDAO: Tarefa '%s' apagada com sucesso.", tarefaID);
        break;
      }
    }
  };

  this.getTarefas = function (listaID) {
    return this.listas[listaID].tarefas;
  };
}
module.exports = new ListaDAO();
