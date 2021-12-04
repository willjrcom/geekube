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
    carrinho: [],
    status: "",
    totalPedido: 0,
    quantidade: 0,
    dataEntrega: "",
    localEntrega: "",
    devolvido: false
  }]

  async carregarHistorico() {
    let auth;
    let localAuth = window.localStorage.getItem('auth');

    if (localAuth) {
      auth = JSON.parse(localAuth);
    }

    this.pedidos = await fetch("https://gk-order.herokuapp.com/order/usuario?email=" + auth["email"])
      .then(response => response.json())

    for (let pedido of this.pedidos) {
      pedido["quantidade"] = Number(pedido["carrinho"].length)
      if (!pedido["totalPedido"]) {
        pedido["totalPedido"] = 0
      }
      let novaData = new Date(pedido["dataEntrega"]);
      pedido["dataEntrega"] = novaData.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }
  }

  async devolverPedido($event: any) {
    let id = $event.target.value;

    await fetch("https://gk-order.herokuapp.com/order/devolucao/" + id, {
      method: 'PUT'
    })
      .then(response => console.log(response))
      //.then(data => window.location.reload())
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