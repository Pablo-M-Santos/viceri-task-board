import "./Header.css";

import ImagemFundo from "../../assets/imagemFundo.png";

export function Header() {
  return (
    <div className="containerHeader">
      <img src={ImagemFundo} className="header" alt="Logotipo do ToDo List" />
    </div>
  );
}
