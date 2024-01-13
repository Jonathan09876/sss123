import React from "react";
import { ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <h3 className="my-3 text-center">Project Locator</h3>
      <p>
        A small app created in MERN stack which using limited functionalities of
        Google maps. Includes the following features :-
      </p>
      <ListGroup>
        <ListGroup.Item>Use Authentication</ListGroup.Item>
        <ListGroup.Item>CRUD for projects. Each user can add projects and perform full CRUD functionalities</ListGroup.Item>
        <ListGroup.Item>Add location coordinates with click event on Google Maps</ListGroup.Item>
        <ListGroup.Item>Custom Bootswatch themes derived from Bootstrap</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default HomeScreen;
