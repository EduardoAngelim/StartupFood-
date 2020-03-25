import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/Ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  baseUrl = 'https://localhost:5001/api/ingredientes';
  ingredientesAtualizados: Ingrediente[];

  constructor(private http: HttpClient) { }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.baseUrl);
  }

  getIngresdientesAtualizados() {
    return this.ingredientesAtualizados;
  }

  updateValoresIngredientes(ingredientes: Ingrediente[]) {
    this.ingredientesAtualizados = ingredientes;
  }
}
