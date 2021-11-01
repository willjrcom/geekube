import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id = "";
  nome = "";
  usuario = "";
  senha = "";
  endereco = "";

  editarUsuario() {
    let editarUsuario = {
      id: this.id,
      nome: this.nome,
      usuario: this.usuario,
      senha: this.senha,
      endereco: this.endereco
    }
    console.log(editarUsuario)
    fetch(`http://localhost:3001/users/${this.id}`, { 
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(editarUsuario)
      })
      .then(response => response.json())
      .then(data => window.location.href = "/")
      .catch(error => alert("Erro na requisição: " + error));
  }

  constructor() { }

  ngOnInit(): void {
    const auth = window.localStorage.getItem('auth');
    if(auth){
      const user = JSON.parse(auth);
      this.nome = user["nome"];
      this.usuario = user["usuario"];
      this.senha = user["senha"];
      this.id = user["id"];
      this.endereco = user["endereco"];
    }
  }

}
