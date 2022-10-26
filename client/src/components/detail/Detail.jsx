import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getDetail, getClean } from "../../redux/actions/Actions";
import Loading from "../load/Loading";
import "./Detail.css";

export default function Detail() {
  let { id } = useParams();
  let history = useHistory();
  console.log("id ", id);
  const dispatch = useDispatch();
  const detail = useSelector((data) => data.detail);
  console.log(detail);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getDetail(id));
    //setLoading(false);
    return () => {
      dispatch(getClean()); //LIMPIAR EL STATE
    };
  }, []);

  //if(detail.length > 0) {setLoading(false)};

  const backHandler = (event) => {
    history.push("/home");
  };

  //   return detail !== undefined ? (
  return (
      (detail !== undefined) ? 
      //(isLoading) ? (<Loading />) :
    (//<>
        <div>
          <span>
            <button className="buttond button_detail" onClick={backHandler}>
              Go Back
            </button>
          </span>
          <div className="detail_container">
            <div className="image_container">
              <img src={detail.image} alt="Breed" />
            </div>
            <div className="content_details">
              <div className="id_detail">
                <h3 className="white">ID:</h3>
                <h4>{detail.id}</h4>
              </div>
              <div className="name_detail">
                <h3 className="white">
                  Name<h4>{detail.name}</h4>
                </h3>
              </div>
              <div className="height_detail">
                <h3 className="white">
                  Min Height <h4>{detail.min_height}</h4>
                </h3>
                <h3 className="white">
                  Max Height <h4>{detail.max_height}</h4>
                </h3>
              </div>
              <div className="weight_detail">
                <h3 className="white">
                  Min Weight <h4>{detail.min_weight}</h4>
                </h3>
                <h3 className="white">
                  Max Weight <h4>{detail.max_weight}</h4>
                </h3>
              </div>
              <div className="origin_detail">
                <h3 className="white">
                  Origin<h4>{detail.origin}</h4>
                </h3>
              </div>
              <div className="lifespan_detail">
                <h3 className="white">
                  Min Lifespan<h4> {detail.min_life_span}</h4>
                </h3>
                <h3 className="white">
                  Max Lifespan<h4>{detail.max_life_span}</h4>
                </h3>
              </div>
              <div className="temperaments_detail">
                <h3 className="white">
                  Temperaments<h4>{detail.temperament}</h4>
                </h3>
              </div>
            </div>
          </div>
        </div> 
        //</>
       ) : (<Loading />)
  );
}
