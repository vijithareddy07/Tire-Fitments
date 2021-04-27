import { VehicleActionTypes, VehicleAction } from "../actions/vehicle.action";

export interface FitmentOptions {
  trimOption: string;
}

export interface Fitment {
  tireSize: string;
  fitmentOptions: FitmentOptions[];
}

export interface VehicleState {
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  fitments: Fitment[];
  year: string;
  make: string;
  model: string;
  trim: string;
  loaded: boolean;
  loading: boolean;
}

export let initialState: VehicleState = {
  years: [],
  makes: [],
  models: [],
  trims: [],
  fitments: [],
  year: "",
  make: "",
  model: "",
  trim: "",
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: VehicleAction
): VehicleState {
  switch (action.type) {
    case VehicleActionTypes.RESET_DATA: {
      var currentState = Object.assign({}, initialState, action.payload);
      return {
        ...currentState,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_YEARS: {
      return {
        ...state,
        loading: true
      };
    }
    case VehicleActionTypes.LOAD_YEARS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_YEARS_SUCCESS: {
      return {
        ...state,
        years: action.payload.years,
        loaded: true,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_MAKES: {
      return {
        ...state,
        year: action.payload.year,
        loading: true
      };
    }
    case VehicleActionTypes.LOAD_MAKES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_MAKES_SUCCESS: {
      return {
        ...state,
        makes: action.payload.makes,
        loaded: true,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_MODELS: {
      return {
        ...state,
        year: action.payload.year,
        make: action.payload.make,
        loading: true
      };
    }
    case VehicleActionTypes.LOAD_MODELS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_MODELS_SUCCESS: {
      return {
        ...state,
        models: action.payload.models,
        loaded: true,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_TRIMS: {
      return {
        ...state,
        year: action.payload.year,
        make: action.payload.make,
        model: action.payload.model,
        loading: true
      };
    }
    case VehicleActionTypes.LOAD_TRIMS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_TRIMS_SUCCESS: {
      return {
        ...state,
        trims: action.payload.trims,
        loaded: true,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_FITMENTS: {
      return {
        ...state,
        year: action.payload.year,
        make: action.payload.make,
        model: action.payload.model,
        trim: action.payload.trim,
        loading: true
      };
    }
    case VehicleActionTypes.LOAD_FITMENTS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActionTypes.LOAD_FITMENTS_SUCCESS: {
      return {
        ...state,
        fitments: action.payload.fitments,
        loaded: true,
        loading: false
      };
    }
  }

  return state;
}
