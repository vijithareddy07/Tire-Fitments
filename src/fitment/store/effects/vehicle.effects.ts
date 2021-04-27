import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, delay, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import {
  LoadYearsFail,
  LoadYearsSuccess,
  LoadMakesFail,
  LoadMakesSuccess,
  LoadModelsFail,
  LoadModelsSuccess,
  LoadTrimsFail,
  LoadTrimsSuccess,
  LoadFitmentsFail,
  LoadFitmentsSuccess,
  VehicleActionTypes
} from "../actions/vehicle.action";
import { Fitment } from "../reducers/vehicle.reducer";

@Injectable()
export class VehicleEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadYears = this.actions$.pipe(
    ofType(VehicleActionTypes.LOAD_YEARS),
    switchMap(action => {
      return this.http
        .get("https://6080be3273292b0017cdbf2a.mockapi.io/years")
        .pipe(
          map((response: any) => {
            return new LoadYearsSuccess({
              years: response.year,
              loaded: true,
              loading: false
            });
          }),
          catchError(error => of(new LoadYearsFail(error)))
        );
    })
  );

  @Effect()
  loadMakes = this.actions$.pipe(
    ofType(VehicleActionTypes.LOAD_MAKES),
    switchMap((action: any) => {
      return this.http
        .get("https://www.tirepros.com/services/v2/tirepros/fitments/make/", {
          params: action.payload
        })
        .pipe(
          map((response: any) => {
            return new LoadMakesSuccess({
              makes: response.make,
              loaded: true,
              loading: false
            });
          }),
          catchError(error => of(new LoadMakesFail(error)))
        );
    })
  );

  @Effect()
  loadModels = this.actions$.pipe(
    ofType(VehicleActionTypes.LOAD_MODELS),
    switchMap((action: any) => {
      return this.http
        .get("https://www.tirepros.com/services/v2/tirepros/fitments/model/", {
          params: action.payload
        })
        .pipe(
          map((response: any) => {
            return new LoadModelsSuccess({
              models: response.model,
              loaded: true,
              loading: false
            });
          }),
          catchError(error => of(new LoadModelsFail(error)))
        );
    })
  );

  @Effect()
  loadTrims = this.actions$.pipe(
    ofType(VehicleActionTypes.LOAD_TRIMS),
    switchMap((action: any) => {
      return this.http
        .get("https://www.tirepros.com/services/v2/tirepros/fitments/trim/", {
          params: action.payload
        })
        .pipe(
          map((response: any) => {
            return new LoadTrimsSuccess({
              trims: response.trim,
              loaded: true,
              loading: false
            });
          }),
          catchError(error => of(new LoadTrimsFail(error)))
        );
    })
  );

  @Effect()
  loadFitment = this.actions$.pipe(
    ofType(VehicleActionTypes.LOAD_FITMENTS),
    switchMap((action: any) => {
      return this.http
        .get(
          " https://www.tirepros.com/services/v2/tirepros/fitments/options/",
          { params: action.payload }
        )
        .pipe(
          map((response: any) => {
            const fitments: Fitment[] = response.option.reduce(
              (result, fitmentOption) => {
                const temp: Fitment = {
                  tireSize: fitmentOption.key,
                  fitmentOptions: []
                };
                fitmentOption.value.fitmentOptionList.forEach(fitmentList => {
                  temp.fitmentOptions.push({
                    trimOption: fitmentList.trimOption
                  });
                });
                result.push(temp);
                return result;
              },
              []
            );
            return new LoadFitmentsSuccess({
              fitments: fitments,
              loaded: true,
              loading: false
            });
          }),
          catchError(error => of(new LoadFitmentsFail(error)))
        );
    })
  );
}
