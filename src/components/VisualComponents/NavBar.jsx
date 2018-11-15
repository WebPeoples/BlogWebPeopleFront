import React from "react";
import {
  Navbar,
  Nav,
  Image
} from "react-bootstrap";

import "../../css/Main.css";

const novoArtigo = () => {
    return localStorage.getItem("jwtToken") ? (<li><a href="#/novo-artigo">Novo Artigo</a></li>) : null;
}

export default props => (
  <Navbar id="NavBar">
        
    <Nav  id="ulNav">
      <a href="#/dashboard"><Image src="../../images/logo_menu.png" responsive id="navLogo" /></a>
      <li><a href="https://www.webpeople.net.br/blog/">Blog</a></li>
      <li><a href="https://www.webpeople.net.br/formulario.html">Soluções</a></li>
      
      {novoArtigo()}
    </Nav>
  </Navbar>
);
