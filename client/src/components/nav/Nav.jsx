import React from "react";
import SearchBar from "../searchbar/SearchBar";
//import Order from "../filters/Order";

export default function Nav({setCurrentPage}) {
  return (
    <nav className="nav">
        <SearchBar setCurrentPage={setCurrentPage} />
        {/* <Order setCurrentPage={setCurrentPage} /> */}
    </nav>
  )
}
