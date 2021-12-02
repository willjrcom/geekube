import { HeaderComponent } from './../../components/header/header.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  qtd_total = 0;
  total_pedido = 0;
  rua = "";
  numero = "";
  cidade = "";
  endereco = `${this.rua} ${this.numero} - ${this.cidade}`;
  formaPagamento = "cartao";
  pagamento = "";
  concordar = false;
  carrinho_vazio = false;

  produtos = [{nome: 0, quantidade: 0, tamanho: 0, modelo: 0, preco: 0, id: 0}];

  finalizarPedido() {
    if(!this.concordar){
      alert("É necessário aceitar com os termos!");
      return;
    }

    const confirma = confirm("Deseja finalizar seu pedido?");
    
    if(!confirma){
      return;
    }

    let carrinho, auth;
    let localCart = window.localStorage.getItem('cart');

    if (localCart){
      carrinho = JSON.parse(localCart);
    }
    
    let locaAuth = window.localStorage.getItem('auth');

    if (locaAuth){
      auth = JSON.parse(locaAuth);
    }

    for(let product of carrinho){
      delete product["imagem"]
      delete product["descricao"]
    }

    let data = {
      email: auth["email"],
      carrinho: JSON.stringify(carrinho),
      totalPedido: this.total_pedido,
      quantidade: this.qtd_total,
      dataEntrega: new Date(),
      localEntrega: this.endereco,
    }
    console.log(data)
    fetch(`https://gk-order.herokuapp.com/`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem('cart', '[]');
        this.produtos = [];
        window.location.href = "/";
      })
  }
  
  removerProduto($event:any){
    let id = $event.target.value;

    let localCart = window.localStorage.getItem('cart');

    if(localCart){
      let cart = JSON.parse(localCart);
      const filter_cart = this.produtos = cart.filter((prod: { id: any }) => prod.id != id)
      HeaderComponent.prototype.notificacao(this.produtos)
      window.localStorage.setItem('cart', JSON.stringify(filter_cart));
    }
  }
  constructor() { }

  ngOnInit(): void {
    let localAuth = window.localStorage.getItem('auth');
    if(localAuth){
      const auth = JSON.parse(localAuth);
      this.endereco = auth["endereco"]
    }

    let localCart = window.localStorage.getItem('cart');
    if(localCart){
      this.produtos = JSON.parse(localCart);
      this.qtd_total = this.produtos.length;

      if(this.produtos.length == 0){
        this.carrinho_vazio = true
      }
      else{
        for(const produto of this.produtos){
          this.total_pedido += Number(produto["preco"]) * Number(produto["quantidade"])
        }
      }
    }
    this.total_pedido = Number(this.total_pedido.toFixed(2));
  }

}
