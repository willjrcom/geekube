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

  alterarEndereco() {
    prompt("Endereço");
  }

  alterarPagamento() {
    prompt("Pagamento");
  }

  finalizarPedido() {
    confirm("Deseja finalizar seu pedido?");
  }
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
