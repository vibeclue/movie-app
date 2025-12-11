import React, { useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="hero banner" />
          <h1>
            Найди <span className="text-gradient">фильмы</span> для <br />
            посмотра без суеты
          </h1>
        </header>

        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
      </div>
    </main>
  );
};

export default App;
