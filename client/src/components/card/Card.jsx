import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(propsHome) {
  console.log(propsHome);
  return (
    <div className="card">
      <div className="image">
        <Link to={`/detail/${propsHome.id}`}>
          <img src={propsHome.image} alt="Breed" />
        </Link>
      </div>
      <div className="content">
        <h3 className="name">{propsHome.name}</h3>
        <div className="weight">
          <h3>Weight</h3>
          <h4>
            Min {propsHome.min_weight} Max {propsHome.max_weight}
          </h4>
        </div>
        <h4 className="temperaments">{propsHome.temperament}</h4>
        <button className="favorites">ADD FAVORITES</button>
      </div>
    </div>
  );
}
