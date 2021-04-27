import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { FitmentState } from "../store";
import {
  LoadYears,
  LoadMakes,
  LoadModels,
  LoadTrims,
  LoadFitments,
  ResetData
} from "../store/actions/vehicle.action";
import { FormGroup, FormControl } from "@angular/forms";
import { Fitment } from "../store/reducers/vehicle.reducer";

@Component({
  selector: "app-fitment-container",
  templateUrl: "./fitment-container.component.html",
  styleUrls: ["./fitment-container.component.css"]
})
export class FitmentContainerComponent implements OnInit {
  fitment: Observable<FitmentState>;
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  year: string;
  make: string;
  model: string;
  trim: string;
  fitments: Fitment[];
  loading:boolean;

  constructor(private store: Store<FitmentState>) { }

  ngOnInit() {
    this.store
      .select(state => state)
      .subscribe(data => {
        this.years = data.vehicle.years;
        this.makes = data.vehicle.makes;
        this.models = data.vehicle.models;
        this.trims = data.vehicle.trims;
        this.year = data.vehicle.year;
        this.make = data.vehicle.make;
        this.model = data.vehicle.model;
        this.trim = data.vehicle.trim;
        this.fitments = data.vehicle.fitments;
        this.loading = data.vehicle.loading;
      });
    this.getYears();
  }

  log(val: any) {
    console.log(val);
  }

  getResetPayload(type) {
    let currentState = {};
    switch (type) {
      case "year": {
        currentState = {
          years: this.years,
          year: this.year
        };
        break;
      }
      case "make": {
        currentState = {
          years: this.years,
          year: this.year,
          makes: this.makes,
          make: this.make
        };
        break;
      }
      case "model": {
        currentState = {
          years: this.years,
          year: this.year,
          makes: this.makes,
          make: this.make,
          models: this.models,
          model: this.model
        };
        break;
      }
      case "trim": {
        currentState = {
          years: this.years,
          year: this.year,
          makes: this.makes,
          make: this.make,
          models: this.models,
          model: this.model,
          trims: this.trims,
          trim: this.trim
        };
        break;
      }
    }
    return currentState;
  }

  onChangeYear() {
    const reset = new ResetData(this.getResetPayload("year"));
    this.store.dispatch(reset);
    if (this.year) {
      console.log(`Year : ${this.year}`);
      const action = new LoadMakes({
        year: this.year
      });
      this.store.dispatch(action);
    }
  }

  onChangeMake() {
    const reset = new ResetData(this.getResetPayload("make"));
    this.store.dispatch(reset);
    if (this.make) {
      console.log(`Make : ${this.make}`);
      const action = new LoadModels({
        year: this.year,
        make: this.make
      });
      this.store.dispatch(action);
    }
  }

  onChangeModel() {
    const reset = new ResetData(this.getResetPayload("model"));
    this.store.dispatch(reset);
    if (this.model) {
      console.log(`Model : ${this.model}`);
      const action = new LoadTrims({
        year: this.year,
        make: this.make,
        model: this.model
      });
      this.store.dispatch(action);
    }
  }

  onChangeTrim() {
    const reset = new ResetData(this.getResetPayload("trim"));
    this.store.dispatch(reset);
    if (this.trim) {
      console.log(`Trim : ${this.trim}`);
      const action = new LoadFitments({
        year: this.year,
        make: this.make,
        model: this.model,
        trim: this.trim
      });
      this.store.dispatch(action);
    }
  }

  getYears() {
    console.log("getYears");
    const reset = new ResetData(this.getResetPayload("all"));
    this.store.dispatch(reset);
    // dispatch an action to get array of years
    const action = new LoadYears();
    this.store.dispatch(action);
  }
}
