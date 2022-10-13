import { GET_BREEDS } from "../actions/Actions";

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
    
        default:return state;
    }
}

export default Reducer;