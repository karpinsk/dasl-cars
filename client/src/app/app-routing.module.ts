import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars/:car_id', component: CarDetailComponent },
  { path: 'add', component: AddCarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
