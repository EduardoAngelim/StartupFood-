import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ConditionalExpr } from '@angular/compiler';
import { IngredienteService } from '../services/ingrediente.service';
import { LancheService } from '../services/lanche.service';
import { Lanche } from '../models/Lanche';
import { Ingrediente } from '../models/Ingrediente';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  firstStepButtonNextDisabled: boolean;
  ingredientesTemp: any;
  lanches: Lanche[];
  ingredientes: Ingrediente[];
  ingredientesArrayAux: any = [];
  pedido: any = {
    nome: '',
    valorLanche: 0,
    valorIngredientes: 0,
    valorFinal: 0,
    ingredientes: ['']
  };

  constructor(private ingredienteService: IngredienteService, private lancheService: LancheService) { }

  ngOnInit() {
    this.getLanches();
    this.getIngredientes();
    this.firstStepButtonNextDisabled = true;
  }

  getLanches() {
    this.lancheService.getLanches().subscribe((_lanches: Lanche[]) => {
     this.lanches = _lanches;
    }, error => {
      console.log(error);
    });
  }

  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((_ingredientes: Ingrediente[]) => {
     this.ingredientes = _ingredientes;
    }, error => {
      console.log(error);
    });
  }

  finalizarPedido() {
  }

  calcularPrecoLanche(lancheCustomizado: boolean, ingredientes: any) {
    if (!lancheCustomizado) {

        this.ingredientesTemp = ingredientes;
        this.pedido.ingredientes = '';

        ingredientes.forEach(ingrediente => {

          ingrediente.quantidade++;

          this.pedido.valorLanche += ingrediente.valor;
          this.ingredientesArrayAux.push(' ' + ingrediente.nome + ' (x' + ingrediente.quantidade + ')');
        });
    } else {
      if (this.ingredientesTemp) {
        this.ingredientesTemp.forEach(ingrediente => {
          this.pedido.valorLanche -= ingrediente.valor;
        });
      }
    }
  }

  calcularPrecoIngredientes() {

    this.pedido.valorIngredientes = 0;

    this.ingredientes.forEach(ingrediente => {
      this.pedido.valorIngredientes += (ingrediente.valor * ingrediente.quantidade);
    });

    this.pedido.valorFinal = this.pedido.valorLanche + this.pedido.valorIngredientes;

    this.verificarPromocao();
  }

  verificarPromocao() {

    var desconto = 0;

    var contemBacon = false;
    var contemAlface = false;

    this.ingredientes.forEach(ingrediente => {

      // Regra promoção "Light"
      if (ingrediente.nome.includes('Bacon') && ingrediente.quantidade > 0) {
        contemBacon = true;
      }
      if (ingrediente.nome.includes('Alface') && ingrediente.quantidade > 0) {
        contemAlface = true;
      }

      // Regra promoção "Muita Carne"
      if (ingrediente.nome.includes('carne') && ingrediente.quantidade >= 3) {

        var qtdCarnes = ingrediente.quantidade;

        // Verifica se a opção escolhida é o lanche customizado.
        // Se não, acrescenta Hambúrger de Carne à conta.
        if (!this.pedido.nome.includes('Lanche customizado')) {
          qtdCarnes++;
        }

        if (qtdCarnes % 3 === 0) {
          desconto = (qtdCarnes * ingrediente.valor) - (((qtdCarnes * 2) / 3) * ingrediente.valor);
          this.pedido.valorFinal = this.pedido.valorFinal - desconto;

          desconto = 0;
        } else {
          var quantidadeFinal = qtdCarnes - (qtdCarnes % 3);
          desconto = (quantidadeFinal * ingrediente.valor) - (((quantidadeFinal * 2) / 3) * ingrediente.valor);
          this.pedido.valorFinal = this.pedido.valorFinal - desconto;

          desconto = 0;
        }
      }

      // Regra promoção "Muito Queijo"
      if (ingrediente.nome.includes('Queijo') && ingrediente.quantidade >= 3) {

        var qtdQueijos = ingrediente.quantidade;

        // Verifica se a opção escolhida é o lanche customizado.
        // Se não, acrescenta Hambúrger de Queijo à conta.
        if (!this.pedido.nome.includes('Lanche customizado')) {
          qtdQueijos++;
        }

        if (qtdQueijos % 3 === 0) {
          desconto = (qtdQueijos * ingrediente.valor) - (((qtdQueijos * 2) / 3) * ingrediente.valor);
          this.pedido.valorFinal = this.pedido.valorFinal - desconto;

          desconto = 0;
        } else {
          var quantidadeFinal = qtdQueijos - (qtdQueijos % 3);
          desconto = (quantidadeFinal * ingrediente.valor) - (((quantidadeFinal * 2) / 3) * ingrediente.valor);
          this.pedido.valorFinal = this.pedido.valorFinal - desconto;

          desconto = 0;
        }
      }

      if (ingrediente.quantidade > 0) {
        this.ingredientesArrayAux.push(' ' + ingrediente.nome + ' (x' + ingrediente.quantidade + ')');
      }
    });

    // Cálculo promoção "Light"
    if (!contemBacon && contemAlface) {
      desconto = this.pedido.valorFinal * 0.10;
      this.pedido.valorFinal = this.pedido.valorFinal - desconto;

      desconto = 0;
    }

    // this.pedido.ingredientes = this.ingredientesArrayAux;

    // var count = {};
    // this.ingredientesArrayAux.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    // console.log(count);
    // console.log(count[0]);

    // var unique = this.ingredientesArrayAux.filter(function(elem, index, self) {
    //   return index === self.indexOf(elem);
    // });

    // this.ingredientesArrayAux.forEach(function(i) {
    //   if (count[0]) {

    //   }
    // });

    // console.log(unique);
  }
}
