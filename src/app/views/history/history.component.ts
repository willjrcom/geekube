import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  pedidos = [{
    id: "",
    email: "",
    carrinho: "",
    totalPedido: "",
    quantidade: "",
    dataEntrega: "",
    localEntrega: ""
  }]

  async carregarHistorico() {
    let auth;
    let localAuth = window.localStorage.getItem('auth');

    if (localAuth){
      auth = JSON.parse(localAuth);
    }
    
    await fetch("https://gk-order.herokuapp.com/usuario?usuario=" + auth["email"])
      .then(response => response.json())
      .then(data => this.pedidos = data);
    
    for(let pedido of this.pedidos){
      console.log(pedido)
      let cart = Array(pedido["carrinho"])
      let content: String = "";

      for(let product of Array(pedido["carrinho"])){
        for(let test of product){
          content += test//`${test["quantidade"]} X ${test["nome"]} | `
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

/*
searchUserOnTelerisco(search: any) {
  return this.http.get( environment.apiUrl + environment.serviceUrl + '/tr/contato-pessoa-fisica', {
    params: search
  }).pipe(map(data => {
    return data;
  }));
}

getDuplicado(params) {
  return this.http.get(environment.apiUrl + environment.serviceUrl + '/lead/duplicacao', {
    params: params
  });
}

isPermitidoDuplicacao(lead: any) {
  return this.http.post<LeadDuplicidade>(environment.apiUrl + environment.serviceUrl + '/lead/duplicacao/permissao', lead, {
  });
}
*/