import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryDateComponent } from './components/delivery-date/delivery-date.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { addressGuard } from './address.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'direccionEntrega',
    component: FormsPageComponent
  },
  {
    path: 'fechaEntrega',
    component: DeliveryDateComponent, 
    canActivate: [addressGuard] 
  },
  {
    path: 'listaDirecciones',
    component: DisplayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
