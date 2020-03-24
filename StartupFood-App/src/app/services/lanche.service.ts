import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lanche } from '../models/Lanche';

@Injectable({
  providedIn: 'root'
})
export class LancheService {

  baseUrl = 'https://localhost:5001/api/lanches';

  constructor(private http: HttpClient) { }

  getLanches(): Observable<Lanche[]> {
    return this.http.get<Lanche[]>(this.baseUrl);
  }

  getLanche(id: number): Observable<Lanche> {
    return this.http.get<Lanche>(this.baseUrl);
  }

}
