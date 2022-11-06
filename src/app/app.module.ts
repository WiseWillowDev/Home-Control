import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { ToggleComponent } from './common/toggle/toggle.component';
import { InputComponent } from './common/input/input.component';
import { ButtonComponent } from './common/button/button.component';
import { TileComponent } from './common/tile/tile.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './screens/home/home.component';
import { LightsComponent } from './screens/lights/lights.component';
import { CarsComponent } from './screens/cars/cars.component';
import { HexTraderComponent } from './screens/hex-trader/hex-trader.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { CarViewComponent } from './screens/cars/car-view/car-view.component';
import { CarEditComponent } from './screens/cars/car-edit/car-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { LightViewComponent } from './screens/lights/light-view/light-view.component';
import { LightEditComponent } from './screens/lights/light-edit/light-edit.component';
import { HexViewComponent } from './screens/hex-trader/hex-view/hex-view.component';
import { HexViewDetailsComponent } from './screens/hex-trader/hex-view-details/hex-view-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDropdownComponent } from './common/input-dropdown/input-dropdown.component';
import { GraphComponent } from './common/graph/graph.component';
import { ToastComponent } from './common/toast/toast.component';
import { LoadingDirective } from './common/loading/loading.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ToggleComponent,
    InputComponent,
    ButtonComponent,
    TileComponent,
    HeaderComponent,
    HomeComponent,
    LightsComponent,
    CarsComponent,
    HexTraderComponent,
    SettingsComponent,
    CarViewComponent,
    CarEditComponent,
    LightViewComponent,
    LightEditComponent,
    HexViewComponent,
    HexViewDetailsComponent,
    InputDropdownComponent,
    GraphComponent,
    ToastComponent,
    LoadingDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
