import { Component, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product = {
    id: '',
    nome: "...",
    preco: "00.00",
    descricao: "",
    imagem: "/assets/img/perfil.png",
    modelo: "",
    quantidade: 1,
    tamanho: ""
  }
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

  addCart(){
    let cart = [];

    if (this.product.nome == "..."
        || this.product.preco == "00.00"
        || this.product.modelo == ""
        || this.product.quantidade == null
        || this.product.quantidade < 1
        || this.product.tamanho == ""){
      alert("Opção invalida!")
      return;
    }

    this.product.id = this.generateSerial();

    let alertIcon = document.getElementById("alert-icon")
    if(alertIcon){
      alertIcon.classList.add("mat-badge")
    }

    let localCart = window.localStorage.getItem('cart');

    // Parse to obj
    if(localCart){
      cart = JSON.parse(localCart);
    }
    cart.push(this.product)
    window.localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "/cart";
  }

  generateSerial() {
    'use strict';
    
    let chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let serialLength = 10;
    let randomSerial = "";
    let i;
    let randomNumber;
    
    for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }

    return randomSerial;
  }
  constructor() { }

  ngOnInit(): void {
    const n = this.getParameterByName('box');
    var data = this.getBox(n).then(response => {
      console.log(response);
      this.product.nome = response["nome"]
      this.product.preco = response["preco"]
      this.product.descricao = response["descricao"]
      if(response["img"] == '0'){
        this.product.imagem = "/assets/img/perfil.png";
      }
      else{
        this.product.imagem = response["img"]
      }
    });
    
  }
}
