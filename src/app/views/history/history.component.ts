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
    
    await fetch("http://localhost:3001/history?usuario=" + auth["usuario"])
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
    const formData = new FormData();
    formData.append('id', id);

    await fetch("http://localhost:3001/history/" + id, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .catch(error => alert("Erro na requisição: " + error));
    
    window.location.reload()
  }

  constructor() { }

  ngOnInit(): void {
    this.carregarHistorico()
  }

}
