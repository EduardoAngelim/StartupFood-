import { Lanche } from './Lanche';
import { Ingrediente } from './Ingrediente';

export class Pedido {
    lanche: Lanche;
    ingredientesAdicionais: Ingrediente[];
    valorLanche: number;
    valorIngredientes: number;
    valorTotal: number;
}
