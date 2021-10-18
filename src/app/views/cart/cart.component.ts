import { Component, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  nome = "Box Básica";
  preco = "67.90";
  imagem = "/assets/img/camisas_geek.jpg";
  cartao = faIdCard

  constructor() { }

  ngOnInit(): void {
  }

}
