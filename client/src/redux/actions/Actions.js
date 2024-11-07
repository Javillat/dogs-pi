import axios from "axios";
//import { URL } from "../../config";
const { REACT_APP_URL } = process.env;

export const GET_BREEDS = 'GET_BREEDS';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_BREEDS_NAME = 'GET_BREEDS_NAME';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_MIN_WEIGHT = 'ORDER_BY_MIN_WEIGHT';
export const ORDER_BY_MAX_WEIGHT = 'ORDER_BY_MAX_WEIGHT';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_API_BD = 'FILTER_BY_API_BD';
export const GET_CLEAN_DETAIL = 'GET_CLEAN_DETAIL';
export const ADD_FAVORITES = 'ADD_FAVORITES';
export const REMOVE_FAVORITES = 'REMOVE_FAVORITES';
export const ORDER_BY_PEQUE = 'ORDER_BY_PEQUE';

export function getBreeds(){
    //console.log(URL);
    return async (dispatch) => {
        const getData = await axios.get(`${REACT_APP_URL}/dogs`, {headers:{'Accept': 'application/json', 'origin':'https://javier-dogs.vercel.app'}});
        //const getData = await axios.get('http://localhost:3001/dogs');
        console.log('Action ',getData);
        dispatch({
            type: 'GET_BREEDS',
            payload:getData.data
        })
    }
}

export function getDetail(id){
    return async (dispatch) => {
        const getData = await axios.get(`${REACT_APP_URL}/dogs/${id}`);
        //const getData = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({
            type: 'GET_DETAIL',
            payload: getData.data
        })
    }
}

export function getBreedsByName(breedname){
    return async (dispatch) => {
        const getData = await axios.get(`${REACT_APP_URL}/dogs?name=${breedname}`);
        //const getData = await axios.get(`http://localhost:3001/dogs?name=${breedname}`);
        dispatch({
            type: 'GET_BREEDS_NAME',
            payload: getData.data
        })
    }
}

export function getClean(){
    return {
        type: 'GET_CLEAN_DETAIL',
    }
}

//ORDENAMIENTOS Y FILTROS
export function orderByNameAction(value){
    return {
        type: 'ORDER_BY_NAME',
        payload: value
    }
}

export function orderByMinWeightAction(value){
    return {
        type: 'ORDER_BY_MIN_WEIGHT',
        payload: value
    }
}

export function orderByMaxWeightAction(value){
    return {
        type: 'ORDER_BY_MAX_WEIGHT',
        payload: value
    }
}

export function orderByPequeAction(value){
    return{
        type: 'ORDER_BY_PEQUE',
        payload: value
    }
}

export function filterByTemperamentAction(value){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload: value
    }
}

export function filterByApiBdAction(value){
    return{
        type: 'FILTER_BY_API_BD',
        payload: value
    }
}

//FAVORITES
export function addFavorites(value){
    return{
        type: 'ADD_FAVORITES',
        payload: value
    }
}

export function removeFavorites(id){
    return {
        type: 'REMOVE_FAVORITES',
        payload: id
    }
}