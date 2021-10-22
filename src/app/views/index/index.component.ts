import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  gotToBox(n: any): void {
    window.location.href = "/product?box=" + n;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
