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
  cpf = "";
  auth: object = {
    email: 0,
  }
  async editarUsuario() {
    let auth = window.localStorage.getItem('auth');
    if (auth){
      var emailSalvo = JSON.parse(auth)["email"]
    }

    let dataEdit = {
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
    // Get default data
    const userData = await fetch(`https://gk-user.herokuapp.com/user/email?email=${emailSalvo}`)
    .then(data => data.json())
    .then(data => data)
    
    // Set new data
    const request = await fetch(`https://gk-user.herokuapp.com/user?email=${emailSalvo}`, { 
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataEdit)
      })
      .then(data => data)

    console.log(request)
    if (request.status >= 200 && request.status < 300) {
      let newUser = {...userData, ...dataEdit}
      window.localStorage.setItem('auth', JSON.stringify(newUser));
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
      this.cpf = user["cpf"]
    }
  }

}
