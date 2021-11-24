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
  endereco = "";

  criarUsuario() {
    let novoUsuario = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha,
    }

    fetch(`https://gk-user.herokuapp.com/user`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(novoUsuario)
      })
      .then(response => response.json())
      .then(data => window.location.href="/center")
      .catch(error => alert("Erro na requisição: " + error));
  }
  constructor() { }

  ngOnInit(): void {
  }

}
