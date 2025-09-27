import React from "react";
import { PiFilmSlateBold } from "react-icons/pi";
import { Container, Col, Row } from "react-bootstrap";
type navProp = {
  search: (word: string) => void,
};
const NavBar = ({ search }: navProp) => {
  const onSearch = (word:string) => {
    search(word);
  };
  return (
    <div className="nav-style w-100">
      <Container>
        <Row className="p-4 ">
          <Col xs="2" lg="1">
            <a href="/">
             <PiFilmSlateBold size={50} style={{ color: "white" }} />
             </a>
          </Col>
          <Col xs="10" lg="11" className=" d-flex align-items-center">
            <div className="search  w-100">
              <i className="fa fa-search"></i>
              <input
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                className="form-control"
                placeholder="ابحث"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
