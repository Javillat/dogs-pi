import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreeds, getBreedsByName } from "../../redux/actions/Actions";
import './Searchbar.css';

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [breedvalue, setBreedvalue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getBreedsByName(breedvalue));
    setBreedvalue("");
    setCurrentPage(1);
  }

  function handleAllBreeds(event){
    event.preventDefault();
    dispatch(getBreeds());
  };

  return (
    <div className="search_container">
      <form onSubmit={handleSubmit}>
        <input
          className="search_input"
          type="text"
          placeholder="Breed..."
          value={breedvalue}
          onChange={(eventclick) => setBreedvalue(eventclick.target.value)}
        />
        <input className="buttons search_button" type="submit" value="Search Breed"/>
        <input className="buttonh search_button" type="button" onClick={handleAllBreeds}  value="Load all breed"/>
      </form>
    </div>
  );
}
