import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { FitmentContainerComponent } from './fitment-container/fitment-container.component';
import { reducers } from './store';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('fitment', reducers),
  ],
  declarations: [FitmentContainerComponent],
  exports: [FitmentContainerComponent]
})
export class FitmentModule { }