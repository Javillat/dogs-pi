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
        <h3>{propsHome.name}</h3>
        <div className="weight">
          <h3>Weight</h3>
          <h4>
            Min {propsHome.min_weight} Max {propsHome.max_weight}
          </h4>
        </div>
        <h4>{propsHome.temperament}</h4>
      </div>
    </div>
  );
}
