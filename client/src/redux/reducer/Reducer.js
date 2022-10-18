import { GET_BREEDS, GET_DETAIL, GET_BREEDS_NAME, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../actions/Actions";

const initialState = {
    breeds: [],
    breedsfilter: [],
    detail: [],
};

function Reducer(state = initialState, action){
    switch (action.type) {
        case GET_BREEDS:
            return{
                ...state,
                breeds:action.payload,
                breedsfilter:action.payload,
            };
        
        case GET_DETAIL:
            return{
                ...state,
               detail:action.payload,
            };
        
        case GET_BREEDS_NAME:
            return{
                ...state,
                breeds:action.payload,
            }

        case ORDER_BY_NAME:
                const order = action.payload === 'ASCENDENT'
                ? state.breedsfilter.sort((breedA, breedB) => {
                    if(breedA.name > breedB.name) return 1;
                    if(breedA.name < breedB.name) return -1;
                    else return 0;
                })
                : state.breedsfilter.sort((breedA, breedB) => {
                    if(breedA.name > breedB.name) return -1;
                    if(breedA.name < breedB.name) return 1;
                    else return 0;
                })
                return{
                    ...state,
                    breeds: order
                }
            
        case ORDER_BY_WEIGHT:
            const orderweight = action.payload === 'asc'
            ? state.breedsfilter.sort((breedA, breedB) => {return breedA.min_weight - breedB.min_weight})
            : state.breedsfilter.sort((breedA, breedB) => {return breedB.min_weight - breedA.min_weight})
            return {
                ...state,
                breeds:orderweight
            }
    
        default:return state;
    }
}

export default Reducer;