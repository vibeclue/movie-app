import React from "react";

const Search = ({ searchTerm, setsearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="../../public/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Поиск среди миллиарда фильмов"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
