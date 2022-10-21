import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Createbreed.css";

export default function CreateBreed() {
  const [temperaments, setTemperaments] = useState([]);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    tempid: [],
    name: "",
    minheight: "",
    maxheight: "",
    minweight: "",
    maxweight: "",
    image: "",
    origin: "",
    life_span: "",
  });
  const nameInput = useRef(null); //Setear nameInput useRef al name

  useEffect(() => {
    axios.get("http://localhost:3001/temperaments").then((response) => {
      setTemperaments(response.data);
      //console.log("useeffect", temperaments);
    });
    nameInput.current.focus(); //Establecer el foco en el input name al cargar el componente
  }, []);

  const validateInput = (input) => {
    let error = {};
    //***************************************Validaciones name
    const nameValidate = input.name.length;
    if (nameValidate === 0) {
      error.name = "Name is required";
    }
    if (nameValidate !== 0 && nameValidate < 4) {
      error.name = "Name lenght must be at less 4 characters";
    }
    if (nameValidate !== 0) {
      if (!/^[a-z A-Z]+$/.test(input.name)) {
        error.name = "Must be letters {a-z A-Z} only";
      }
    }
    //======================================Cierre name
    //**************************************Validaciones minheight
    const minheightValidate = input.minheight.length;
    if (!input.minheight) {
      error.minheight = "Minimun Height is required";
    }
    if (minheightValidate !== 0) {
      if (!/^\d+$/.test(input.minheight)) {
        error.minheight = "Must be numbers only";
      }
    }
    if (parseInt(input.minheight) <= 0) {
      error.minheight = "The value must be mayor than 0 and not equal than";
    }
    if (parseInt(input.minheight) > 99) {
      error.minheight = "The maximun value of minum height is 99";
    }
    if (parseInt(input.minheight) > parseInt(input.maxheight)) {
      error.minheight = "Minimun height can`t be mayor than maximun height";
    }
    if (
      parseInt(input.minheight) > 0 &&
      parseInt(input.maxheight) > 0 &&
      parseInt(input.minheight) === parseInt(input.maxheight)
    ) {
      error.minheight =
        "Minumun and maximun value are the same, please correct them.";
    }
    //======================================Cierre minheight
    //**************************************Validaciones maxheight
    const maxheightValidate = input.maxheight.length;
    if (!input.maxheight) {
      error.maxheight = "Maximun Height is required";
    }
    if (maxheightValidate !== 0) {
      if (!/^\d+$/.test(input.maxheight)) {
        error.minheight = "Must be numbers only";
      }
    }
    if (parseInt(input.maxheight) <= 1) {
      error.maxheight = "The value must be mayor than 1 and not equal than";
    }
    if (parseInt(input.minheight) > parseInt(input.maxheight)) {
      error.maxheight = "Maximun height can`t be menor than minimun height";
    }
    if (parseInt(input.maxheight) > 100 || parseInt(input.maxheight) < 2) {
      error.maxheight = "Minimun value is 2 and maximun value is 100";
    }
    if (
      parseInt(input.minheight) > 0 &&
      parseInt(input.maxheight) > 1 &&
      parseInt(input.minheight) === parseInt(input.maxheight)
    ) {
      error.maxheight =
        "Minumun and maximun value are the same, please correct them.";
    }
    //======================================Cierre maxheight
    //**************************************Validaciones minweight
    const minweightValidate = input.minweight.length;
    if (!input.minweight) {
      error.minweight = "Minimun weight is required";
    }
    if (minweightValidate !== 0) {
      if (!/^\d+$/.test(input.minweight)) {
        error.minweight = "Must be numbers only";
      }
    }
    if (parseInt(input.minweight) <= 0) {
      error.minweight = "The value must be mayor than 0 and not equal than";
    }
    if (parseInt(input.minweight) > 99) {
      error.minweight = "The maximun value of minum weight is 99";
    }
    if (parseInt(input.minweight) > parseInt(input.maxweight)) {
      error.minweight = "Minimun weight can`t be mayor than maximun weight";
    }
    if (
      parseInt(input.minweight) > 0 &&
      parseInt(input.maxweight) > 1 &&
      parseInt(input.minweight) === parseInt(input.maxweight)
    ) {
      error.minweight =
        "Minumun and maximun value are the same, please correct them.";
    }
    //======================================Cierre minweight
    //**************************************Validaciones maxweight
    const maxweightValidate = input.maxweight.length;

    if (!input.maxweight) {
      error.maxweight = "Maximun weight is required";
    }
    if (maxweightValidate !== 0) {
      if (!/^\d+$/.test(input.maxweight)) {
        error.maxweight = "Must be numbers only";
      }
    }
    if (parseInt(input.maxweight) <= 1) {
      error.maxweight = "The value must be mayor than 1 and not equal than";
    }
    if (parseInt(input.miwheight) > parseInt(input.maxweight)) {
      error.maxheight = "Maximun weight can`t be menor than minimun weight";
    }
    if (parseInt(input.maxweight) > 100 || parseInt(input.maxweight) < 2) {
      error.maxheight = "Minimun value is 2 and maximun value is 100";
    }
    if (
      parseInt(input.minweight) > 0 &&
      parseInt(input.maxweight) > 1 &&
      parseInt(input.minweight) === parseInt(input.maxweight)
    ) {
      error.maxweight =
        "Minumun and maximun value are the same, please correct them.";
    }
    //======================================Cierre maxweight
    //**************************************Validaciones origin
    if (!input.origin) {
      error.origin = "Origin is required";
    }
    if (input.origin.length !== 0) {
      if (!/^[a-z A-Z]+$/.test(input.origin)) {
        error.origin = "Must be letters {a-z A-Z} only";
      }
    }
    if (input.origin.length < 4) {
      error.origin = "Origin must have at less 4 characters";
    }
    //======================================Cierre origin
    //**************************************Validaciones lifespan
    const lifespanValidate = input.life_span.length;
    if (!input.life_span) {
      error.life_span = "Lifespan is required";
    }
    if (lifespanValidate !== 0) {
      if (!/^\d+$/.test(input.life_span)) {
        error.life_span = "Must be numbers only";
      }
    }
    if (input.life_span <= 0) {
      error.life_span = "Lifespan can`t be equal or menor than 0.";
    }
    //======================================Cierre lifespan
    return error;
  };

  const handleChange = (event) => {
    const valueInput = event.target.value;
    setInput({ ...input, [event.target.name]: valueInput });
    setError(
      validateInput({
        ...input,
        [event.target.name]: valueInput,
      })
    );
  };

  const submitBreed = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <form
          className={error && "error"}
          onSubmit={(event) => submitBreed(event)}
        >
          <label htmlFor="name">
            {!error ? "Name:" : error.name}
            <input
              key="name"
              ref={nameInput} //Referencia del name
              type="text"
              placeholder="Breed Name..."
              name="name"
              value={input.name}
              onChange={(event) => handleChange(event)}
            />
          </label>
          <label>
            Minimun Height
            <input
              key="minheight"
              type="number"
              placeholder="Minimun Height..."
              name="minheight"
              value={input.minheight}
              onChange={(event) => handleChange(event)}
            />
            {error.minheight}
          </label>
          <label>
            Maximun Height
            <input
              key="maxheight"
              type="number"
              name="maxheight"
              placeholder="Maximun Height..."
              value={input.maxheight}
              onChange={(event) => handleChange(event)}
            />
            {error.maxheight}
          </label>
          <label>
            Minimun Weight
            <input
              key="minweight"
              type="number"
              name="minweight"
              placeholder="Minimun Weight..."
              value={input.minweight}
              onChange={(event) => handleChange(event)}
            />
            {error.minweight}
          </label>
          <label>
            Maximun Weight
            <input
              key="maxweight"
              type="number"
              name="maxweight"
              placeholder="Maximun Weight..."
              value={input.maxweight}
              onChange={(event) => handleChange(event)}
            />
            {error.maxweight}
          </label>
          <label>
            Breed Image
            <input
              key="image"
              type="text"
              name="image"
              placeholder="Imagen..."
              value={input.image}
              onChange={(event) => handleChange(event)}
            />
          </label>
          <label>
            Origin
            <input
              key="origin"
              type="text"
              name="origin"
              placeholder="Origin..."
              value={input.origin}
              onChange={(event) => handleChange(event)}
            />
            {error.origin}
          </label>
          <label>
            Lifespan
            <input
              key="life_span"
              type="number"
              name="life_span"
              placeholder="Life Span..."
              value={input.life_span}
              onChange={(event) => handleChange(event)}
            />
            {error.life_span}
          </label>

          {temperaments.slice(0, 20).map((temp) => (
            <label key={temp.id}>
              <input type="checkbox" key={temp.id} value={temp.id} />{" "}
              {temp.name}
            </label>
          ))}
          {/* {error && <p>{error}</p>} */}
          <input
            type="submit"
            value="Send breed"
            disabled={
              !input.name ||
              !input.minheight ||
              !input.maxheight ||
              !input.minweight ||
              !input.maxweight ||
              !input.origin ||
              !input.life_span ||
              error.name ||
              error.minheight ||
              error.maxheight ||
              error.minweight ||
              error.maxweight ||
              error.origin ||
              error.life_span
            }
          />
        </form>
      </div>
    </div>
  );
}
