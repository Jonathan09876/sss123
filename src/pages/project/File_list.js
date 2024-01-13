import React, { useState,useEffect } from "react";
// import {connect,mapDispatchToProps,mapDispatchToProps} from 'react-redux';
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {FilelistAction} from "../../actions/FileAction";
import {addCompnayAction} from "../../actions/companyAction"
const File_list = () => {
  const dispatch = useDispatch();
  const listFile=useSelector((state) => state.fileList);
  const {filelist,loading, error }=listFile;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const addCompnayData=(dataName)=>
  {
    dispatch(addCompnayAction(dataName));
  }
  const filesubmit =(e)=>{
     e.preventDefault();
     const selectedFile=e.target.files[0]
     const formdata = new FormData();
     formdata.append("xlsx", selectedFile);
     const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
     }
    fetch("http://localhost:5000/api/file/upload", { // Your POST endpoint
      method: 'POST',
      body: formdata,
      headers:config.headers
    }).then(
     dispatch(FilelistAction())
    ).catch(
      error => console.log("Test failed: " + error) // Handle the error response object
    );
  }
 
  
  useEffect(() => {
    if (userInfo) {
      dispatch(FilelistAction());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      
      <input
          element="input"
          id="name"
          type="file"
          label="File Upload"
          accept=".xls,xlsx"
          onChange={ (e) => filesubmit(e)} />
            <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {filelist.map((list) => (
              <tr key={list._id}>
                <td>{list._id}</td>
                <td>{list.filename}</td>
                <td>{list.updatedAt}</td>
                <td> { list.Status ? (<div className='badge rounded-pill bg-success'>read</div>) : (<div className='badge rounded-pill bg-danger'>unread</div>)}</td>
                <td> { list.Status ? ("") : (<button className='btn btn-sm rounded-pill btn-info' onClick={() =>addCompnayData(list.filename)}>add</button>)}</td>
                <td>
                { list.status ? ( <LinkContainer to={`/project/${list._id}`}>
                    <Button variant="light" className="btn-sm">
                      Delete
                    </Button>
                  </LinkContainer>) : ("")}
                 
                </td>
              </tr>
            ))}
          </tbody>
        
        </Table>
      )}
    </>
     
  );
 
};
// const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
//   counter: state.counterDetails.counter
// });

// const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = ({
//   increaseValueByAmount,
//   decreaseValueByAmount,
//   resetValue
// });

// const mapStateToProps = (state) => {
//   const {fileList}=state.fileList
//   return {
//       filelist: fileList
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//       addCompanyData: () => { dispatch(addCompnayAction())}
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(File_list);
export default File_list;
