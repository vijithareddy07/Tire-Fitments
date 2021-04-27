import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { FitmentModule } from "../fitment/fitment.module";
import { VehicleEffects } from "../fitment/store/effects/vehicle.effects";
import { reducers } from "../fitment/store/reducers";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FitmentModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    EffectsModule.forRoot([VehicleEffects])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
