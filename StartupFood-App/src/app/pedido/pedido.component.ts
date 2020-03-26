import { Component, OnInit } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ConditionalExpr } from '@angular/compiler';
import { IngredienteService } from '../services/ingrediente.service';
import { LancheService } from '../services/lanche.service';
import { Lanche } from '../models/Lanche';
import { Ingrediente } from '../models/Ingrediente';
import { Pedido } from '../models/Pedido';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  firstStepButtonNextDisabled: boolean;
  secondStepButtonNextDisabled: boolean;
  ingredientesTemp: any;
  lanches: Lanche[];
  ingredientes: Ingrediente[];
  ingredientesAtualizados: Ingrediente[];
  pedido: Pedido;

  constructor(private ingredienteService: IngredienteService, private lancheService: LancheService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getData();
    this.firstStepButtonNextDisabled = true;
    this.pedido = new Pedido();
    this.pedido.lanche = new Lanche();
    this.pedido.lanche.ingredientes = new Array<Ingrediente>();
    this.pedido.ingredientesAdicionais = new Array<Ingrediente>();
    this.pedido.valorTotal = 0;
    this.pedido.valorLanche = 0;
    this.pedido.valorIngredientes = 0;
  }

  getData() {
    this.lancheService.getLanches().subscribe((lanches: Lanche[]) => {

      this.lanches = lanches;

      this.ingredientesAtualizados = this.ingredienteService.getIngresdientesAtualizados();

      if ( this.ingredientesAtualizados != null) {

        this.ingredientes = this.ingredientesAtualizados;

        this.lanches.forEach(lanche => {
          if (!lanche.nome.includes('Lanche customizado')) {
            lanche.ingredientes.forEach(ingrediente => {
              this.ingredientes.forEach(ing => {
                if (ingrediente.id === ing.id) {
                  ingrediente.valor = ing.valor;
                }
              });
            });
          }
        });
      } else {
        this.ingredienteService.getIngredientes().subscribe((ingredientes: Ingrediente[]) => {
          this.ingredientes = ingredientes;
          }, error => {
            console.log(error);
          });
      }
    }, error => {
      console.log(error);
    });
  }

  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((ingredientes: Ingrediente[]) => {
     this.ingredientes = ingredientes;
    }, error => {
      console.log(error);
    });
  }

  calcularPrecoLanche(lanche: Lanche) {

    this.pedido.lanche = lanche;
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

    if (this.pedido.lanche.nome.includes('customizado') && this.pedido.ingredientesAdicionais.length === 0) {
      this.secondStepButtonNextDisabled = true;
    } else {
      this.secondStepButtonNextDisabled = false;
    }
  }

  calcularPrecoIngredientesAdicionais() {

    this.pedido.valorIngredientes = 0;
    this.pedido.ingredientesAdicionais.splice(0, this.pedido.ingredientesAdicionais.length);

    this.ingredientes.forEach(ingrediente => {
      if (ingrediente.quantidade > 0) {
        this.pedido.ingredientesAdicionais.push(ingrediente);
        this.pedido.valorIngredientes += (ingrediente.valor * ingrediente.quantidade);
      }
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


  finalizarPedido() {
    this.toastr.success('Pedido finalizado com sucesso. Bom apetite!', 'Operação concluída!');
  }

  cancelarPedido() {
    this.toastr.warning('Pedido cancelado com sucesso!', 'Operação abortada!');
  }

  verificarPromocao() {

    let desconto = 0;

    let contemBacon = false;
    let contemAlface = false;

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

        let qtdCarnes = ingrediente.quantidade;

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
          const quantidadeFinal = qtdCarnes - (qtdCarnes % 3);
          desconto = (quantidadeFinal * ingrediente.valor) - (((quantidadeFinal * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        }
      }

      // Regra promoção "Muito Queijo"
      if (ingrediente.nome.includes('Queijo') && ingrediente.quantidade >= 3) {

        let qtdQueijos = ingrediente.quantidade;

        // Verifica se a opção escolhida é o lanche customizado.
        // Se não, acrescenta Queijo à conta.
        if (!this.pedido.lanche.nome.includes('Lanche customizado')) {
          qtdQueijos++;
        }

        if (qtdQueijos % 3 === 0) {
          desconto = (qtdQueijos * ingrediente.valor) - (((qtdQueijos * 2) / 3) * ingrediente.valor);
          this.pedido.valorTotal = this.pedido.valorTotal - desconto;

          desconto = 0;
        } else {
          const quantidadeFinal = qtdQueijos - (qtdQueijos % 3);
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
