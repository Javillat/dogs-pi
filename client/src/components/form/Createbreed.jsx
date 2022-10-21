import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Createbreed.css";

export default function CreateBreed() {
  const [temperaments, setTemperaments] = useState([]);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    tempid: [],
    name: "",
    minheight: 0,
    maxheight: 0,
    minweight: 0,
    maxweight: 0,
    image: "",
    origin: "",
    life_span: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/temperaments").then((response) => {
      setTemperaments(response.data);
      //console.log("useeffect", temperaments);
    });
  }, []);

  const validateInput = (input) => {
    //   if (!input.name || input.name < 4) {
    //       setError("Name is empty or is less than 4 character");
    //     } else {
    //         setError("");
    //     }
    //     //console.log("cambio");
    let error = {};
    const nameValidate = input.name.length;
    if (nameValidate === 0) {
      error.name = "Name is required";
    }
    if (nameValidate !== 0 && nameValidate < 4) {
      error.name = "Name lenght must be at less 4 characters";
    }
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
            <label htmlFor="name">{error.name}</label>
          <label>
            Name
            <input
              key="name"
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
          </label>

          {temperaments.map((temp) => (
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
              error
            }
          />
        </form>
      </div>
    </div>
  );
}
