import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  value = 'Clear me';
  user = ""
  password = ""
  
  async fazerLogin() {   
    let user = {
      email: this.user,
      senha: this.password
    }

    const request = await fetch(`https://gk-user.herokuapp.com/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => response)
    var data = await request.json().then(data => data)
    
    if(Array.isArray(data)){
      data = data[0];
    }
    
    try{
      data["nome"];
      window.localStorage.removeItem("cart")
      window.localStorage.setItem('auth', JSON.stringify(data));
      window.location.href= "/";
    } catch(e) {
      alert("Erro ao realizar login!")
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
