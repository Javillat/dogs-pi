import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getDetail } from "../../redux/actions/Actions";

export default function Detail(){
    let { id } = useParams();
    let history = useHistory();
    console.log('id ', id);
    const dispatch = useDispatch();
    const detail = useSelector(data => data.detail);
    console.log(detail);

    useEffect(()=>{
        dispatch(getDetail(id));//LIMPIAR EL STATE
    },[]);

    // useEffect(() => {
    //     return () => {};
    // },[])

    const backHandler = (event) => {
        history.push('/home');
    };

    return(
        (detail !== undefined) ?
        ( 
            <div>
                <span><button onClick={backHandler}>Go Back</button></span>
                <div><h2>Breed</h2></div>
                <div><h3>Id</h3><h4>{detail.id}</h4></div>
                <div><h3>Name</h3><h3>{detail.name}</h3></div>
                <div><img src={detail.image} alt="Breed"/></div>
                <div><h3>Min Height</h3><h4> {detail.min_height}</h4></div>
                <div><h3>Max Height</h3><h4> {detail.max_height}</h4></div>
                <div><h3>Min Weight</h3><h4> {detail.min_weight}</h4></div>
                <div><h3>Max Weight</h3><h4> {detail.max_weight}</h4></div>
                <div><h3>Life span min</h3><h4> {detail.min_life_span}</h4></div>
                <div><h3>Life span max</h3><h4> {detail.max_life_span}</h4></div>
                <div><h3>Temperaments</h3><h4> {detail.temperament}</h4></div>
            </div> 
        ) : null//(<Loading />)
    );
};