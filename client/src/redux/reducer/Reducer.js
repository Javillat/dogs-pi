import {
  GET_BREEDS,
  GET_DETAIL,
  GET_BREEDS_NAME,
  GET_CLEAN_DETAIL,
  ORDER_BY_NAME,
  ORDER_BY_MIN_WEIGHT,
  ORDER_BY_MAX_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_API_BD,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  ORDER_BY_PEQUE,
} from "../actions/Actions";

const initialState = {
  breeds: [],
  breedsfilter: [],
  detail: {},
  temperaments: [],
  favorites: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        breedsfilter: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_CLEAN_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case GET_BREEDS_NAME:
      return {
        ...state,
        breeds: action.payload,
      };

    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (breed) => breed.id !== action.payload
        ),
      };

    case ORDER_BY_NAME:
      const order =
        action.payload === "ASCENDENT"
          ? state.breedsfilter.sort((breedA, breedB) => {
              if (breedA.name > breedB.name) return 1;
              if (breedA.name < breedB.name) return -1;
              else return 0;
            })
          : state.breedsfilter.sort((breedA, breedB) => {
              if (breedA.name > breedB.name) return -1;
              if (breedA.name < breedB.name) return 1;
              else return 0;
            });
      return {
        ...state,
        breeds: order,
      };

    case ORDER_BY_MIN_WEIGHT:
      const orderweight =
        action.payload === "asc"
          ? state.breedsfilter.sort((breedA, breedB) => {
              return breedA.min_weight - breedB.min_weight;
            })
          : state.breedsfilter.sort((breedA, breedB) => {
              return breedB.min_weight - breedA.min_weight;
            });
      return {
        ...state,
        breeds: orderweight,
      };

    case ORDER_BY_MAX_WEIGHT:
      const ordermaxweight =
        action.payload === "asc"
          ? state.breedsfilter.sort((breedA, breedB) => {
              return breedA.max_weight - breedB.max_weight;
            })
          : state.breedsfilter.sort((breedA, breedB) => {
              return breedB.max_weight - breedA.max_weight;
            });
      return {
        ...state,
        breeds: ordermaxweight,
      };

      case ORDER_BY_PEQUE:
        const ordenarp = action.payload = "peque"
        ? state.breedsfilter.sort((a,b) => {
          return a.min_weight - b.min_weight; 
        })
        : state.breedsfilter.sort((a,b) => {
          return b.min_weight - a.min_weight;
        })
        return{
          ...state,
          breeds: ordenarp.slice(0,16),
        };

    case FILTER_BY_TEMPERAMENT:
      const value = action.payload;
      const filtered = state.breedsfilter.filter((filter) => {
        return (
          filter.temperament && filter.temperament.split(", ").includes(value)
        );
      });
      return {
        ...state,
        breeds: filtered,
      };

    case FILTER_BY_API_BD:
      const valueapibd = action.payload;
      if (valueapibd.includes("BD")) {
        const filteredbd = state.breedsfilter.filter((breeds) =>
          breeds.id.toString().includes(valueapibd)
        );
        return {
          ...state,
          breeds: filteredbd,
        };
      } else {
        let bd = "BD";
        const filteredapi = state.breedsfilter.filter(
          (breeds) => !breeds.id.toString().includes(bd)
        );
        return {
          ...state,
          breeds: filteredapi,
        };
      }

    default:
      return { ...state };
  }
}

export default Reducer;
