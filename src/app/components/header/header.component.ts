import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let alertIcon = document.getElementById("alert-icon")
    let localCart = window.localStorage.getItem('cart');
    if(localCart){
      let cart = JSON.parse(localCart);
      console.log(cart)

      if(cart.length == 0 && alertIcon){
        alertIcon.classList.remove("mat-badge")
      }
    }else if(alertIcon){
      alertIcon.classList.remove("mat-badge")
    }
  }

}
