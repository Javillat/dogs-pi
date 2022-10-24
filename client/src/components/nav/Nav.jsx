import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
//import Order from "../filters/Order";

export default function Nav({ setCurrentPage }) {
  return (
    <nav className="nav">
      <SearchBar setCurrentPage={setCurrentPage} />
      <div className="create_button">
        <Link to="/create">
          <button>Create Breed</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </div>
      {/* <Order setCurrentPage={setCurrentPage} /> */}
    </nav>
  );
}
