import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../services/ingrediente.service';
import { Ingrediente } from '../models/Ingrediente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ingredientes: Ingrediente[];

  constructor(private ingredienteService: IngredienteService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getIngredientes();
  }

  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((ingredientes: Ingrediente[]) => {
     this.ingredientes = ingredientes;
    }, error => {
      console.log(error);
    });
  }

  salvarAlteracoes() {
    this.ingredienteService.updateValoresIngredientes(this.ingredientes);
    this.toastr.success('Alteração de valores de ingredientes realizada com sucesso!', 'Operação concluída!');
  }
}
