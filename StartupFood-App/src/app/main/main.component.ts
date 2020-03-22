import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  buttonNextDisabled: boolean;
  ingredientesTemp: any;
  lanches: any;
  ingredientes: any;
  pedido: any = {
    nome: '',
    valor: 0,
    ingredientes: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getLanches();
    this.getIngredientes();
    this.buttonNextDisabled = true;
  }

  getLanches() {
    this.http.get('https://localhost:5001/api/lanches').subscribe( response => {
     this.lanches = response;
    }, error => {
      console.log(error);
    });
  }

  getIngredientes() {
    this.http.get('https://localhost:5001/api/ingredientes').subscribe( response => {
     this.ingredientes = response;
    }, error => {
      console.log(error);
    });
  }

  finalizarPedido() {
  }

  calcularPrecoLanche(lancheCustomizado: boolean, ingredientes: any) {
    if (!lancheCustomizado) {
        this.ingredientesTemp = ingredientes;

        ingredientes.forEach(element => {
          this.pedido.valor += element.valor;
        });
    } else {
      if (this.ingredientesTemp) {
        this.ingredientesTemp.forEach(element => {
          this.pedido.valor -= element.valor;
        });
      }
    }
  }

  calcularPrecoIngredientes(isChecked: any, valor: number) {
    if (isChecked) {
      this.pedido.valor += valor;
    } else {
      this.pedido.valor -= valor;
    }
  }
}
