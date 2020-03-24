import { Lanche } from './Lanche';
import { Ingrediente } from './Ingrediente';

export interface Pedido {
    lanche: Lanche;
    ingredientes: Ingrediente[];
    valorLanche: number;
    valorIngredientes: number;
    valorTotal: number;
}
