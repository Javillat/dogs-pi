import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Nav from "../nav/Nav";
import Loading from "../load/Loading";
import {
  getBreeds,
  orderByNameAction,
  orderByWeightAction,
} from "../../redux/actions/Actions";

export default function Home() {
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
    dispatch(getBreeds());
  }, []);

  
  //ORDER
  //const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  /**
   * Posibilita que el componente cambie, y que useEffect
   * en su segundo parametro recargue el componente home
   */

  function orderByName(event) {
    //setCurrentPage(2);
    event.preventDefault();
    dispatch(orderByNameAction(event.target.value));
    //setCurrentPage(1);
    setOrden(event.target.value);
  }

  function orderByWeight(event) {
    event.preventDefault();
    dispatch(orderByWeightAction(event.target.value));
    //setCurrentPage(1);
    setOrden(event.target.value);
  }

  // if(breeds == undefined || !breeds.length) return <Loading />;
  return (
    <div className="super_container">
      <Nav setCurrentPage={setCurrentPage} />
      <div className="filters_orders">
        <section className="order_name_section">
          <select
            className="select_order_name"
            onChange={(event) => orderByName(event)}
          >
            <option value="" defaultValue="">
              Sort by Name
            </option>
            <option value="ASCENDENT">Ascendent Order</option>
            <option value="DESCENDENT">Descendent Order</option>
          </select>
        </section>

        <section className="order_weight_section">
          <select
            name="order_weight"
            onChange={(event) => orderByWeight(event)}
          >
            <option value="" defaultValue="">
              Sort by Weight
            </option>
            <option value="asc">Ascendent order</option>
            <option value="desc">Descendent order</option>
          </select>
        </section>
      </div>

      <div className="container">
        {breeds > 0 || breeds !== undefined
          ? currentBreeds.map((breed) => (
              <div key={breed.id}>
                <Card
                  id={breed.id}
                  name={breed.name}
                  image={breed.image}
                  min_weight={breed.min_weight}
                  max_weight={breed.max_weight}
                  temperament={breed.temperament}
                />
              </div>
            ))
          : <Loading />
          }

        <div>Pag {currentPage}</div>
        <footer>
          {currentPage !== 1 ? (
            <button onClick={prevHandler}>Previous</button>
          ) : null}
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => Page(number)}>
              {number}
            </button>
          ))}
          {currentPage !== pageNumbers.length ? (
            <button onClick={nextHandler}>Next</button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
