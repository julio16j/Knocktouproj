// Class to represent a row in the seat reservations grid
class Pessoa {
    constructor(id, nome, cpf, dataNascimento, capital) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.dataNascimento = dataNascimento;
      this.capital = capital;
    }
  }

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;
    self.listagem = ko.observable(true);
    // Non-editable catalog data - would come from the server
    self.Pessoas = ko.observableArray();
    self.nome = ko.observable();
    self.cpf = ko.observable();
    self.dataNascimento = ko.observable();
    self.capital = ko.observable();
    self.Pessoas.push(new Pessoa(1 ,"Joao", "700000", "18/18/2018", 1000))
    self.Pessoas.push(new Pessoa(2,"Julio", "700000", "18/18/2018", 1000))
    self.Pessoas.push(new Pessoa(3,"Tulio", "700000", "18/18/2018", 1000))
    self.contadorID = ko.observable(3);
    self.pessoaAntiga = ko.observable();
    self.adicionarPessoa = function(){
        self.Pessoas.push(new Pessoa(self.contadorID()+1,self.nome(), self.cpf(), self.dataNascimento(), self.capital()))
    }
    self.editarPessoa = function(pessoa) {
        self.pessoaAntiga(pessoa)
        self.listagem(false);
        self.nome(pessoa.nome);
        self.cpf(pessoa.cpf);
        self.dataNascimento(pessoa.dataNascimento);
        self.capital(pessoa.capital);
        
    }
    self.salvarPessoa = function(){
        self.Pessoas.replace(self.pessoaAntiga(), new Pessoa(self.pessoaAntiga().id,self.nome(), self.cpf(), self.dataNascimento(), self.capital()) )
        console.log(self.Pessoas())
        self.listagem(false);
        self.nome(null);
        self.cpf(null);
        self.dataNascimento(null);
        self.capital(null);
        self.listagem(true);
    }
    self.removerPessoa = function(pessoa) { self.Pessoas.remove(pessoa) }
}

ko.applyBindings(new ReservationsViewModel());