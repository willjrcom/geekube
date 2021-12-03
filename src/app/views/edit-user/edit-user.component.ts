import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id = "";
  nome = "";
  email = "";
  senha = "";

  editarUsuario() {
    let editarUsuario = {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    }
    
    fetch(`https://gk-user.herokuapp.com/user?email=${this.email}`, { 
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editarUsuario)
      })
      .then(data => window.location.href = "/")
  }

  constructor() { }

  ngOnInit(): void {
    const auth = window.localStorage.getItem('auth');
    if(auth){
      const user = JSON.parse(auth);
      this.nome = user["nome"];
      this.email = user["email"];
      this.id = user["id"];
    }
  }

}
