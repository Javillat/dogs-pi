import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import Reducer from "../reducer/Reducer";
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(thunk))
);