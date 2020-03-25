import { Component, OnInit } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ConditionalExpr } from '@angular/compiler';
import { IngredienteService } from '../services/ingrediente.service';
import { LancheService } from '../services/lanche.service';
import { Lanche } from '../models/Lanche';
import { Ingrediente } from '../models/Ingrediente';
import { Pedido } from '../models/Pedido';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  firstStepButtonNextDisabled: boolean;
  secondStepButtonNextDisabled: boolean;
  ingredientesTemp: any;
  lanches: Lanche[];
  ingredientes: Ingrediente[];
  pedido: Pedido;

  constructor(private ingredienteService: IngredienteService, private lancheService: LancheService) { }

  ngOnInit() {
    this.getLanches();
    this.getIngredientes();
    this.firstStepButtonNextDisabled = true;
    this.pedido = new Pedido();
    this.pedido.lanche = new Lanche();
    this.pedido.valorTotal = 0;
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

  calcularPrecoLanche(lanche: Lanche) {

    this.pedido.lanche = lanche;
    this.pedido.ingredientes = lanche.ingredientes;
    this.ingredientesTemp = lanche.ingredientes;
    this.pedido.valorLanche = 0;

    if (!lanche.nome.includes('Lanche customizado')) {
        lanche.ingredientes.forEach(ingrediente => {
          ingrediente.quantidade++;
          this.pedido.valorLanche += ingrediente.valor;
        });
    } else {
      if (this.ingredientesTemp) {
        this.ingredientesTemp.forEach(ingrediente => {
          this.pedido.valorLanche -= ingrediente.valor;
        });
      }
    }

    this.firstStepButtonNextDisabled = false;
    
    if (this.pedido.lanche.nome.includes('Lanche customizado') && !this.pedido.ingredientes) {
      this.secondStepButtonNextDisabled = true;
    } else {
      this.secondStepButtonNextDisabled = false;
    }
  }

  calcularPrecoIngredientes() {

    this.pedido.valorIngredientes = 0;

    this.ingredientes.forEach(ingrediente => {
      this.pedido.valorIngredientes += (ingrediente.valor * ingrediente.quantidade);
    });

    this.pedido.valorTotal = this.pedido.valorLanche + this.pedido.valorIngredientes;

    this.verificarPromocao();
  }

  checkIngredientes() {

    let flag = false;

    this.ingredientes.forEach(ingrediente => {
      if (ingrediente.quantidade > 0) {
        this.secondStepButtonNextDisabled = false;
        flag = true;
      }
    });

    if (!flag) {
      this.secondStepButtonNextDisabled = true;
    }
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
        if (!this.pedido.lanche.nome.includes('Lanche customizado')) {
          qtdCarnes++;
        }

        if (qtdCarnes % 3 === 0) {
          desconto = (qtdCarnes * ingrediente.valor) - (((qtdCarnes * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        } else {
          var quantidadeFinal = qtdCarnes - (qtdCarnes % 3);
          desconto = (quantidadeFinal * ingrediente.valor) - (((quantidadeFinal * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        }
      }

      // Regra promoção "Muito Queijo"
      if (ingrediente.nome.includes('Queijo') && ingrediente.quantidade >= 3) {

        var qtdQueijos = ingrediente.quantidade;

        // Verifica se a opção escolhida é o lanche customizado.
        // Se não, acrescenta Hambúrger de Queijo à conta.
        if (!this.pedido.lanche.nome.includes('Lanche customizado')) {
          qtdQueijos++;
        }

        if (qtdQueijos % 3 === 0) {
          desconto = (qtdQueijos * ingrediente.valor) - (((qtdQueijos * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        } else {
          var quantidadeFinal = qtdQueijos - (qtdQueijos % 3);
          desconto = (quantidadeFinal * ingrediente.valor) - (((quantidadeFinal * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        }
      }
    });

    // Cálculo promoção "Light"
    if (!contemBacon && contemAlface) {
      desconto = this.pedido.valorTotal * 0.10;
      this.pedido.valorTotal = this.pedido.valorTotal - desconto;

      desconto = 0;
    }
  }
}
