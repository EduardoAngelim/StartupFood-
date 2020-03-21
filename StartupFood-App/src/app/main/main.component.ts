import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  lanches: any;
  ingredientes: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getLanches();
    this.getIngredientes();
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

}
