import React from "react";
import load from "../../img/fatdog-dog-load.gif";
import "./Loading.css";

export default function Loading(){
    return(
        <div className="box">
            <span>
                <img className="circle" src={load} alt="Loading" />
            </span>
            <span className="loader">Loading...</span>
        </div>
    )
}
