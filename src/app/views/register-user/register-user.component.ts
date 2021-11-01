import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  nome = "";
  usuario = "";
  senha = "";
  endereco = "";

  criarUsuario() {
    let novoUsuario = {
      id: null,
      nome: this.nome,
      usuario: this.usuario,
      senha: this.senha,
      endereco: this.endereco
    }

    fetch(`http://localhost:3001/users`, { 
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
