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
  telefone = "";

  async editarUsuario() {
    let data = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone
    }

    if (this.senha === "") {
      alert("Campo senha vazio!")
      return
    }

    if (this.senha.length < 4) {
      alert("Senha minima: 4 caracteres!")
      return
    }

    const request = await fetch(`https://gk-user.herokuapp.com/user?email=${this.email}`, { 
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(data => data)

      console.log(request)
    if (request.status >= 200 && request.status < 300) {
      window.localStorage.setItem('auth', JSON.stringify(data));
      window.location.reload()
    }
  }

  constructor() { }

  ngOnInit(): void {
    const auth = window.localStorage.getItem('auth');
    if(auth){
      const user = JSON.parse(auth);
      this.nome = user["nome"];
      this.email = user["email"];
      this.telefone = user["telefone"];
    }
  }

}
