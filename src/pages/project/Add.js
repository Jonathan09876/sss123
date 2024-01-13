import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { createProjectAction } from "../../actions/projectActions";
// import GoogleMapComponent from "../../components/MapComponent";

const AddProject = () => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(25.473);
  const [longitude, setLongitude] = useState(81.878);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");

  const dispatch = useDispatch();

  const createProject = useSelector((state) => state.createProject);
  const { loading, success, error } = createProject;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [dispatch, userInfo])

  useEffect(() => {
    if (success) {
      navigate('/project')
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      name,
      latitude,
      longitude,
      startDate,
      endDate,
      details
    }
    dispatch(createProjectAction(payload));
  };

  const onMarkerClick = (e) => {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }

  return (
    <FormContainer>
      <h2 className="text-center my-3">Add New Project</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row className="my-3">
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="startDate" className="my-3">
          <Form.Label>Enter Project Details</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            type="text"
            placeholder="Enter Project Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Add New Project
        </Button>
      </Form>
{/* 
      <GoogleMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMarkerClick={onMarkerClick}
        latitude={latitude}
        longitude={longitude}
      /> */}
    </FormContainer>
  );
};

export default AddProject;
