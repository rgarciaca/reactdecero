import React from "react";
import ReactDom from "react-dom/client";

import { HelloWorldApp } from "./HelloWorldApp";
import { FirstApp } from "./FirstApp";
import { CounterApp } from "./CounterApp";

import "./main.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelloWorldApp />
    <FirstApp title="Hola, soy Goku" subtitle="Soy un subtitulo!!!" />
    <CounterApp value={ 5 } />
  </React.StrictMode>
);
