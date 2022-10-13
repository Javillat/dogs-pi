import React from "react";
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card(propsHome){
    console.log(propsHome);
    return (
        <div className="card">
            <h3>{propsHome.name}</h3>
            <Link to={`/detail/${propsHome.id}`}>
                <img src={propsHome.image} alt="Breed"/>
            </Link>
            <h4>{propsHome.min_weight} {propsHome.max_weight}</h4>
            <h4>{propsHome.temperament}</h4>
        </div>
    )
};