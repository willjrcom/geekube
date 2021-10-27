import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  qtd_total = 5;
  total_pedido = 60.99
  endereco = "...";
  produtos = [{nome: '', quantidade: 0, tamanho: '', modelo: '', preco: '', id: ''}];

  alterarEndereco() {
    prompt("Endereço");
  }

  alterarPagamento() {
    prompt("Pagamento");
  }

  finalizarPedido() {
    confirm("Deseja finalizar seu pedido?");
  }
  
  removerProduto($event:any){
    let id = $event.target.value;

    let localCart = window.localStorage.getItem('cart');

    if(localCart){
      let cart = JSON.parse(localCart);
      const filter_cart = this.produtos = cart.filter((prod: { id: any; }) => prod.id != id)
      window.localStorage.setItem('cart', JSON.stringify(filter_cart));
    }
  }
  constructor() { }

  ngOnInit(): void {
    let localCart = window.localStorage.getItem('cart');
    if(localCart){
      this.produtos = JSON.parse(localCart);
    }
  }

}
