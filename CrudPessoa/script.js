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
function ClienteViewModel() {
    var self = this;
    
    self.validaDATA = function  (data){
        if (typeof data ==='undefined' || data == null ) return true
        let dia = parseInt(data[0]+data[1]);
        let mes = parseInt(data[3]+data[4]);
        let ano = parseInt(data[6]+data[7]+data[8]+data[9]);
        if (dia>31 || dia < 1) return false;
        else if(mes>12 || mes<1) return false;
        else if (ano > parseInt(Date().split(" ")[3]) || ano < 1900) return false;
        else return true;
    }
    self.validaCPF = function  (cpf){
        if (cpf.length > 11) return false
        else return true
    }
    self.listagem = ko.observable(true);
    self.Pessoas = ko.observableArray();
    self.nome = ko.observable().extend({ required: true });
    self.cpf = ko.observable().extend({minLength: 11, maxLength: 11});
    self.dataNascimento = ko.observable().extend({
    // custom validator
        validation: {
        validator: function(val) {
            return self.validaDATA(val);
        },
        message: 'Data invalida'
        }
    });
    self.capital = ko.observable().extend({ required: true });
    self.Pessoas.push(new Pessoa(1 ,"Joao", "85147988475", "18/12/2018", 1000))
    self.Pessoas.push(new Pessoa(2,"Julio", "85147988475", "18/12/2018", 1000))
    self.Pessoas.push(new Pessoa(3,"Tulio", "85147988475", "18/12/2018", 1000))
    self.contadorID = ko.observable(3);
    self.pessoaAntiga = ko.observable();
    self.adicionarPessoa = function(){
        if (self.nome.isValid() && self.cpf.isValid() && self.dataNascimento.isValid() && self.capital.isValid() ){
            self.Pessoas.push(new Pessoa(self.contadorID()+1,self.nome(), self.cpf(), self.dataNascimento(), self.capital()))
        }
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
        if (self.nome.isValid() && self.cpf.isValid() && self.dataNascimento.isValid() && self.capital.isValid() ){
            self.Pessoas.replace(self.pessoaAntiga(), new Pessoa(self.pessoaAntiga().id,self.nome(), self.cpf(), self.dataNascimento(), self.capital()) )
            self.listagem(false);
            self.nome(null);
            self.cpf(null);
            self.dataNascimento(null);
            self.capital(null);
            self.listagem(true);
        }
    }
    self.removerPessoa = function(pessoa) { self.Pessoas.remove(pessoa) }
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null,
        decorateInputElement: true,
        errorElementClass: 'form-error',
        errorsAsTitle: false
      }, true);
    };

ko.applyBindings(new ClienteViewModel());