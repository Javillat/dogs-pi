import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import "./Nav.css";

export default function Nav({ setCurrentPage }) {
  return (
    <nav className="nav">
      <div className="create_button">
        <ul>
          <div>
            <Link to="/create">
              <li>Create breed</li>
            </Link>
            <Link to="/favorites">
              <li>Favorites</li>
            </Link>
          </div>
        </ul>
        <div className="search_container">
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>
      </div>
      {/* <Order setCurrentPage={setCurrentPage} /> */}
    </nav>
  );
}
