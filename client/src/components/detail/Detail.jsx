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
    dispatch(getDetail(id)); //LIMPIAR EL STATE
    // return () => {
    //   dispatch(getClean());
    // };
  }, []);

  // useEffect(() => {
  //     return () => {};
  // },[])

  const backHandler = (event) => {
    history.push("/home");
  };

  return detail !== undefined ? (
    <>
      <span>
        <button className="buttond button_detail" onClick={backHandler}>Go Back</button>
      </span>
      <div className="detail_container">
        <div className="image_container">
          <img src={detail.image} alt="Breed" />
        </div>
        <div className="content_details">
          <div className="id_detail">
            <h3>ID:</h3>
            <h4>{detail.id}</h4>
          </div>
          <div className="name_detail">
            <h3>
              Name<h4>{detail.name}</h4>
            </h3>
          </div>
          <div className="height_detail">
            <h3>
              Min Height <h4>{detail.min_height}</h4>
            </h3>
            <h3>
              Max Height <h4>{detail.max_height}</h4>
            </h3>
          </div>
          <div className="weight_detail">
            <h3>
              Min Weight <h4>{detail.min_weight}</h4>
            </h3>
            <h3>
              Max Weight <h4>{detail.max_weight}</h4>
            </h3>
          </div>
          <div className="origin_detail">
            <h3>
              Origin<h4>{detail.origin}</h4>
            </h3>
          </div>
          <div className="lifespan_detail">
            <h3>
              Min Lifespan<h4> {detail.min_life_span}</h4>
            </h3>
            <h3>
              Max Lifespan<h4>{detail.max_life_span}</h4>
            </h3>
          </div>
          <div className="temperaments_detail">
            <h3>
              Temperaments<h4>{detail.temperament}</h4>
            </h3>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
