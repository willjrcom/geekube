import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  pedidos = []

  async carregarHistorico() {
    let auth;
    let localAuth = window.localStorage.getItem('auth');

    if (localAuth){
      auth = JSON.parse(localAuth);
    }
    
    await fetch("https://gk-order.herokuapp.com/usuario?usuario=" + auth["usuario"])
      .then(response => response.json())
      .then(data => this.pedidos = data)
      .catch(error => alert("Erro na requisição: " + error));
    
    for(let pedido of this.pedidos){
      console.log(pedido)
      let cart = Array(pedido["cart"])
      let content: String = "";

      for(let product of Array(pedido["cart"])){
        for(let test of product){
          content += `${test["quantidade"]} X ${test["nome"]} | `
        }
      }
      (pedido as any)["cart"] = content;
    }
  }

  async devolverPedido($event:any) {
    let id = $event.target.value;

    await fetch("https://gk-order.herokuapp.com/devolucao/" + id, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => window.location.reload())
      .catch(error => alert("Erro na requisição: " + error));
  }

  constructor() { }

  ngOnInit(): void {
    this.carregarHistorico()
  }

}
