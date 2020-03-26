import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { AdminComponent } from './admin/admin.component';
import { PainelComponent } from './painel/painel.component';


const routes: Routes = [
  { path: 'painel', component: PainelComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '', redirectTo: '/painel', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
