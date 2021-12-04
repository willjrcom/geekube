import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  nome = "";
  idade = 0;
  email = "";
  cpf = "";
  senha = "";
  telefone = "";

  criarUsuario() {
    let data = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone
    }
    
    if (this.nome == ""
        || this.cpf == ""
        || this.email == ""
        || this.senha === ""
        || this.telefone == ""
        ) {
      alert("Existem campos vazios!")
      return
    }

    if (this.senha.length < 4) {
      alert("Senha minima: 4 caracteres!")
      return
    }
    
    fetch(`https://gk-user.herokuapp.com/user`, { 
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(data => window.location.href="/center")
  }
  constructor() { }

  ngOnInit(): void {
    
  }

}
