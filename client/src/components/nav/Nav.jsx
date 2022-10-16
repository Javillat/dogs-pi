import React from "react";
import SearchBar from "../searchbar/SearchBar";

export default function Nav({setCurrentPage}) {
  return (
    <nav className="nav">
        <SearchBar setCurrentPage={setCurrentPage}/>
    </nav>
  )
}
