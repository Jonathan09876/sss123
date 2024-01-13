import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { getProjectDetails, updateProjectAction, deleteProjectAction } from "../../actions/projectActions";
import GoogleMapComponent from "../../components/MapComponent";

const UpdateProject = ({ history }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const params = useParams();
  const navigate = useNavigate();

  const projectDetail = useSelector((state) => state.projectDetails);
  const { project } = projectDetail;

  const projectUpdate = useSelector((state) => state.updateProject);
  const { loading, success, error } = projectUpdate;

  const updateProject = () => {
    const payload = {
      _id: project._id,
      name,
      details,
      startDate,
      endDate,
      latitude,
      longitude
    }
    dispatch(updateProjectAction(payload));
  };

  const deleteProject = () => {
    dispatch(deleteProjectAction(project._id));
    handleClose()
    navigate('/project')
  };

  const onMarkerClick = (e) => {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }

  useEffect(() => {
    if (success) {
      dispatch(getProjectDetails(project._id))
      navigate('/project')
    }
  }, [dispatch, success])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (project._id !== params.id) {
      dispatch(getProjectDetails(params.id))
    } else {
      setName(project.name)
      setLatitude(project.latitude)
      setLongitude(project.longitude)
      setStartDate(project.startDate)
      setEndDate(project.endDate)
      setDetails(project.details)
    }
  }, [dispatch, project])

  return (
    <FormContainer>
      <h2 className="text-center my-3">Update Existing Project</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form>
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

        <Button variant="primary" className="my-3" onClick={() => updateProject(project._id)}>
          Update Project
        </Button>
        <Button variant="danger" className="mx-3 my-3" onClick={() => handleShow()}>
          Delete Project
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, are you sure you want to delete this project ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteProject(project._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <GoogleMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMarkerClick={onMarkerClick}
        latitude={latitude}
        longitude={longitude}
      />
    </FormContainer>
  );
};

export default UpdateProject;
