import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName } from "../../redux/actions/Actions";
//import './SeachBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [breedvalue, setBreedvalue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getBreedsByName(breedvalue));
    setBreedvalue("");
  }

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
        <input type="submit" value="Search Breed" />
      </form>
    </div>
  );
}
