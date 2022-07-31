import React from "react";
import "./Pagination.css";

export default function Pagination({ dogsPerPage, allDogs, pagination }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(
      i + 1
    ); /* Para que no me aparezca la pagina 0 a i le sumo 1 */
  }
  // Renderizado de los numeros para navegar por las paginas.
  return (
    <div className="navPag">
      <nav>
        <ul>
          {/* Si pageNumber tiene algo hace un map*/}
          {pageNumbers &&
            pageNumbers.map((number) => (
              <button
                className="pagination"
                key={number}
                onClick={() => pagination(number)}
              >
                {number}
              </button>
            ))}
        </ul>
      </nav>
    </div>
  );
}
