
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Card from "../card/Card";
import Nav from "../nav/Nav"
import { getBreeds } from "../../redux/actions/Actions";

export default function Home(){
    const dispatch = useDispatch();
    const breeds = useSelector((data) => data.breeds);
    //Paginación
    const [ currentPage, setCurrentPage] = useState(1);
    const cardpage = 8;
    const lastbreed = currentPage * cardpage;
    const firstbreed = lastbreed - cardpage;
    const currentBreeds = (breeds !== undefined) ? breeds.slice(firstbreed, lastbreed) : [];
    const pageNumbers = [];
    const totalBreeds = breeds.length;
   
    for(let i = 0; i < Math.ceil(totalBreeds/cardpage); i++){
        pageNumbers.push(i+1);
    }
    
    const Page = (page) => {
        setCurrentPage(page)
    };
    
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if(prevPage < 1) return;
        setCurrentPage(prevPage);
    }
    
    const nextHandler = () => {
        const nextPage = currentPage + 1;
        if(nextPage > (pageNumbers.length)) return;
        setCurrentPage(nextPage);
    }
    
    //Paginación
    
    useEffect(()=>{
        dispatch(getBreeds())
    },[]);

   // if(breeds == undefined || !breeds.length) return <Loading />;
    return(
        <div className="super_container">
            <Nav setCurrentPage={setCurrentPage} />
            <div className="container">
                {breeds > 0 || breeds !== undefined
                    ? (currentBreeds.map(breed => (
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
                    ) : null
                }
                <div>Pag {currentPage}</div>
                <footer>
                    {currentPage !== 1 ? <button onClick={prevHandler}>Previous</button> : null}
                    {
                        pageNumbers.map(number =>
                            <button key={number} onClick={() => Page(number)}>{number}</button>)
                        }
                    {currentPage !== pageNumbers.length ? <button onClick={nextHandler}>Next</button> : null}
                </footer>
            </div>
        </div>
    )
}