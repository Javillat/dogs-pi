import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByNameAction } from "../../redux/actions/Actions";

export default function Order({ setCurrentPage, orderByName }) {
//   const dispatch = useDispatch();
//   const [orden, setOrden] = useState('');

//   function orderByName(event) {
//     event.preventDefault();
//     //setCurrentPage(2);
//     dispatch(orderByNameAction(event.target.value));
//     setCurrentPage(1);
//     setOrden(event.target.value);
//   }

  // return (
  //   <section className="order_container">
  //     <select
  //       className="select_order_name"
  //       onChange={(event) => orderByName(event)}
  //     >
  //       <option value="" defaultValue="">
  //         Sort by Name
  //       </option>
  //       <option value="ASCENDENT">Ascendent Order</option>
  //       <option value="DESCENDENT">Descendent Order</option>
  //     </select>
  //   </section>
  // );
}
