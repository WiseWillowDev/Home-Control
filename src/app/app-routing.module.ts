import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEditComponent } from './screens/cars/car-edit/car-edit.component';
import { CarViewComponent } from './screens/cars/car-view/car-view.component';
import { CarsComponent } from './screens/cars/cars.component';
import { HexTraderComponent } from './screens/hex-trader/hex-trader.component';
import { HomeComponent } from './screens/home/home.component';
import { LightsComponent } from './screens/lights/lights.component';
import { SettingsComponent } from './screens/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lights', component: LightsComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/edit', component: CarEditComponent },
  { path: 'hex', component: HexTraderComponent },
  { path: 'settings', component: SettingsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
