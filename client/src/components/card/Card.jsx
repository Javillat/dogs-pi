import React from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorites } from "../../redux/actions/Actions";
import "./Card.css";
import 'animate.css';

export default function Card(propsHome) {
  console.log(propsHome);
  const dispatch = useDispatch();
  const handleClick = (breed) =>{
    dispatch(addFavorites(breed))
    Swal.fire({
      title: 'Raza agregada a favoritos',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
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
        <button className="favorites" onClick={(()=> handleClick({"id":propsHome.id,"name":propsHome.name,"image":propsHome.image}))}>ADD FAVORITES</button>
      </div>
    </div>
  );
}
