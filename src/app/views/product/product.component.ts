import { Component, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  nome = "...";
  preco = "00.00";
  imagem = "/assets/img/perfil.png";;
  cartao = faIdCard

  getParameterByName(name: any, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  getBox(n: any) {
    return fetch("http://localhost:3001/box/" + n)
      .then(response => {
        // valida se a requisição falhou
        if(!response.ok){
          return new Error('Falhou a requisição')
        }
        
        // verificando pelo status
        if (response.status === 404) {
          return new Error('não encontrou qualquer resultado')
        }

        // retorna uma promise com os dados em JSON
        return response.json()
      })
      .catch(error => alert("Erro na requisição: " + error));
  }

  constructor() { }

  ngOnInit(): void {
    const n = this.getParameterByName('box');
    var data = this.getBox(n).then(response => {
      console.log(response);
      this.nome = response["nome"]
      this.preco = response["preco"]
      if(response["img"] == '0'){
        this.imagem = "/assets/img/perfil.png";
      }
      else{
        this.imagem = response["img"]
      }
    });
    
  }
}
