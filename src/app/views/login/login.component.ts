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
  
  fazerLogin() {
    const auth = fetch(`http://localhost:3001/users?usuario=${this.user}&senha=${this.password}`, { method: 'GET'})
      .then(response => response.json())
      .then(data => {
        if(Array.isArray(data)){
          data = data[0];
        }
        
        try{
          data["nome"];
          window.localStorage.setItem('auth', JSON.stringify(data));
          window.location.href= "/";
        }
        catch(e){
          alert("Erro ao realizar login!")
        }
      })
      .catch(error => alert("Erro na requisição: " + error));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
