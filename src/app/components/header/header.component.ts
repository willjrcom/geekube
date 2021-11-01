import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrarNotificacao = false;
  auth = function() {
    const autenticado = window.localStorage.getItem('auth');
    if(!autenticado){
      return false;
    }
    return true;
  }()

  logout() {
    window.localStorage.removeItem('auth');
    window.location.href = "/center";
  }

  notificacao(cart: any) {
    if(cart.length == 0){
      this.mostrarNotificacao = false
    }else{
      this.mostrarNotificacao = true
    }
  }

  constructor() { }

  ngOnInit(): void {
    let localCart = window.localStorage.getItem('cart');
    if(localCart){
      let cart = JSON.parse(localCart);
      this.notificacao(cart);
    }
  }

}
