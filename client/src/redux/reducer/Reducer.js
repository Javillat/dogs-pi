import { GET_BREEDS, GET_DETAIL } from "../actions/Actions";

const initialState = {
    breeds: [],
    detail: [],
};

function Reducer(state = initialState, action){
    switch (action.type) {
        case GET_BREEDS:
            return{
                ...state,
                breeds:action.payload,
            };
        
        case GET_DETAIL:
            return{
                ...state,
               detail:action.payload,
            };
    
        default:return state;
    }
}

export default Reducer;