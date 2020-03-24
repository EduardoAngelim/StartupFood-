import { Ingrediente } from './Ingrediente';

export interface Lanche {
    id: number;
    nome: string;
    ingredientes: Ingrediente[];
}
