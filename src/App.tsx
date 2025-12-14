import "./App.css";
import "./global.css";

import { Header } from "./components/header/Header";
import { Content } from "./components/Board/Board";

export function App() {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}
