import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFavorites } from "../../redux/actions/Actions";
import "./Favorites.css";
import 'animate.css';

export default function Favorites() {
  //console.log(propsHome);
  const favorites = useSelector((data) => data.favorites);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(removeFavorites(id));
    Swal.fire({
      title: 'Raza eliminada de favoritos',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  };
  return (
    <>
      <div>
        <Link to="/home">
          <button className="button load_all_home">Go Home</button>
        </Link>
      </div>
      <div className="container">
        {favorites.map((favorites) => {
          return (
            <div className="card_favorites">
              <div className="image">
                <Link to={`/detail/${favorites.id}`}>
                  <img src={favorites.image} alt="Breed" />
                </Link>
              </div>
              <div className="content">
                <h3 className="name_favorites">{favorites.name}</h3>
                <div className="weight">
                  {/* <h3>Weight</h3> */}
                  <h4>
                    {/* Min {propsHome.min_weight} Max {propsHome.max_weight} */}
                  </h4>
                </div>
                {/* <h4 className="temperaments">{propsHome.temperament}</h4> */}
                <button
                  className="remove_favorites"
                  onClick={() => handleClick(favorites.id)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
