import axios from "axios";

export const GET_BREEDS = 'GET_BREEDS';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_BREEDS_NAME = 'GET_BREEDS_NAME';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';


export function getBreeds(){
    return async (dispatch) => {
        const getData = await axios.get('http://localhost:3001/dogs');
        dispatch({
            type: 'GET_BREEDS',
            payload:getData.data
        })
    }
}

export function getDetail(id){
    return async (dispatch) => {
        const getData = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({
            type: 'GET_DETAIL',
            payload: getData.data
        })
    }
}

export function getBreedsByName(breedname){
    return async (dispatch) => {
        const getData = await axios.get(`http://localhost:3001/dogs?name=${breedname}`);
        dispatch({
            type: 'GET_BREEDS_NAME',
            payload: getData.data
        })
    }
}

//ORDENAMIENTOS Y FILTROS
export function orderByNameAction(value){
    return {
        type: 'ORDER_BY_NAME',
        payload: value
    }
}

export function orderByWeightAction(value){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload: value
    }
}