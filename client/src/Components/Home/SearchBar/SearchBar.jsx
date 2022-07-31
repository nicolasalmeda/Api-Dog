import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../../Actions/index";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Estado local. Aca va lo que escriban en el input.

  function handleInputChange(e) {
    e.preventDefault();
    // el value del input va a setearse en el estado local
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // el boton va a disparar getNameCharacters(name) es decir a la ruta:
    // http://localhost:3001/characters?name=***name***(declarada en actions-->index)
    dispatch(getDogName(name)); // "name" es lo que esta guardado en el estado local.
  }

  return (
    <div className="divSearchBar">
      <input
        className="inputSearchBar"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Breed Name..."
      />
      <button
        className="btnSearchBar"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
