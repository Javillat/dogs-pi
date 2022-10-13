import axios from "axios";

export const GET_BREEDS = 'GET_BREEDS';

export function getBreeds(){
    return async (dispatch) => {
        const getData = await axios.get('http://localhost:3001/dogs');
        dispatch({
            type: 'GET_BREEDS',
            payload:getData.data
        })
    }
}