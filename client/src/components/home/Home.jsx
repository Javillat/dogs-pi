import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Nav from "../nav/Nav";
import Loading from "../load/Loading";
import {
  getBreeds,
  orderByNameAction,
  orderByMinWeightAction,
  orderByMaxWeightAction,
  filterByTemperamentAction,
  filterByApiBdAction,
  orderByPequeAction,
} from "../../redux/actions/Actions";
import axios from "axios";
import "./Home.css";
//import { URL } from "../../config";
const { REACT_APP_URL } = process.env;

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const breeds = useSelector((data) => data.breeds);
  //Paginación
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardpage = 8;
  const lastbreed = currentPage * cardpage;
  const firstbreed = lastbreed - cardpage;
  const currentBreeds =
    breeds !== undefined ? breeds.slice(firstbreed, lastbreed) : [];
  const pageNumbers = [];
  const totalBreeds = breeds.length;
  const [temperaments, setTemperaments] = useState([]); //Setear los temperamentos

  for (let i = 0; i < Math.ceil(totalBreeds / cardpage); i++) {
    pageNumbers.push(i + 1);
  }

  const Page = (page) => {
    setCurrentPage(page);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) return;
    setCurrentPage(prevPage);
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    if (nextPage > pageNumbers.length) return;
    setCurrentPage(nextPage);
  };

  //Paginación

  useEffect(() => {
    setLoading(true);
    dispatch(getBreeds());
    axios.get(`${REACT_APP_URL}/temperaments`).then((response) => {
    //axios.get("http://localhost:3001/temperaments").then((response) => {
      setTemperaments(response.data);
      setLoading(false);
      console.log("useeffect", temperaments);
    });
  }, []);

  //ORDENAR/FILTRAR
  const [orden, setOrden] = useState("");
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  /**
   * Posibilita que el componente cambie, y que useEffect
   * en su segundo parametro recargue el componente home
   */

  function orderByName(event) {
    event.preventDefault();
    dispatch(orderByNameAction(event.target.value));
    //setCurrentPage(1);
    setOrden(event.target.value);
  }

  //MINIMO Y MAXIMO ORDENAMIENTO

  function orderByMaxWeight(event) {
    event.preventDefault();
    dispatch(orderByMaxWeightAction(event.target.value));
    setOrden(event.target.value);
  }

  function orderByMinWeight(event) {
    event.preventDefault();
    dispatch(orderByMinWeightAction(event.target.value));
    //setCurrentPage(1);
    setOrden(event.target.value);
  }

  function orderByPeque(event){
    event.preventDefault();
    dispatch(orderByPequeAction(event.target.value));
    setOrden(event.target.value);
  }
  //+++++++++++++++++++++++++++++++++++++++++++++

  function filterByTemperament(event) {
    event.preventDefault();
    dispatch(filterByTemperamentAction(event.target.value));
    setOrden(event.target.value);
  }

  function filterByApiBd(event) {
    event.preventDefault();
    dispatch(filterByApiBdAction(event.target.value));
    setOrden(event.target.value);
  }

  // if(breeds == undefined || !breeds.length) return <Loading />;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="super_container">
          <Nav setCurrentPage={setCurrentPage} />
          <div className="filters_orders">
            <section className="order_weight_max_section">
              <select
                name="order_weight_max"
                onChange={(event) => orderByMaxWeight(event)}
              >
                <option value="" defaultValue="">
                  Max Weight Sort
                </option>
                <option value="asc">Ascendent order</option>
                <option value="desc">Descendent order</option>
              </select>
            </section>

            {/* ===================================================== */}

            <section className="order_weight_min_section">
              <select
                name="order_weight_min"
                onChange={(event) => orderByMinWeight(event)}
              >
                <option value="" defaultValue="">
                  Min Weight Sort
                </option>
                <option value="asc">Ascendent order</option>
                <option value="desc">Descendent order</option>
              </select>
            </section>
            
            {/* ===================================================== */}

            <section className="peque">
              <select
                name="order_peque"
                onChange={(event) => orderByPeque(event)}
              >
                <option value="" defaultValue="">
                  Peque
                </option>
                <option value="peque">Peque</option>
              </select>
            </section>
            

            <section className="order_name_section">
              <select
                name="select_order_name"
                onChange={(event) => orderByName(event)}
              >
                <option value="" defaultValue="">
                  Sort by Name
                </option>
                <option value="ASCENDENT">Ascendent Order</option>
                <option value="DESCENDENT">Descendent Order</option>
              </select>
            </section>

            {/* ===================================================== */}

            <section className="select_filter_temperaments">
              <select
                name="select_filter_temperament"
                onChange={(event) => filterByTemperament(event)}
              >
                <option value="" defaultValue="">
                  Temperament Filter
                </option>
                {temperaments.map((temp) => (
                  <option key={temp.id} value={temp.name}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </section>

            {/* ===================================================== */}

            <section className="select_filter_api_bd">
              <select
                name="select_filter_apibd"
                onChange={(event) => filterByApiBd(event)}
              >
                <option value="" defaultValue="">
                  Api/BD Filter
                </option>
                <option value="API">Select breeds from API</option>
                <option value="BD">Select breeds from BD</option>
              </select>
            </section>
          </div>

          <div className="container_home">
            {breeds > 0 || breeds !== undefined ? (
              currentBreeds.map((breed) => (
                <div key={breed.id}>
                  <Card
                    id={breed.idimg}
                    name={breed.name}
                    image={breed.image}
                    min_weight={breed.min_weight}
                    max_weight={breed.max_weight}
                    temperament={breed.temperament}
                  />
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>
          <footer>
            {/* <div className="leyenda">Pag {currentPage}</div> */}
              {currentPage !== 1 ? (
                <button className="prev" onClick={prevHandler}>Previous</button>
              ) : null}
              {pageNumbers.map((number) => (
                // <button className={currentPage && "pagination_button"}  key={number} onClick={() => Page(number)}>
                <button className={currentPage === number ? "pagination_button active" : "pagination_button"}  key={number} onClick={() => Page(number)}>
                  {number}
                </button>
              ))}
              {currentPage !== pageNumbers.length ? (
                <button className="next" onClick={nextHandler}>Next</button>
              ) : null}
            </footer>
        </div>//Super_container
      )}
    </>
  );
}
