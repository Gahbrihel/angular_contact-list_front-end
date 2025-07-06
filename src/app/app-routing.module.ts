import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: 'cadastro'  , component: CadastroComponent},
  { path: 'favoritos' , component: FavoritosComponent},
  { path: 'lista'     , component: ListaComponent},
  { path: ''          , component: ListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
