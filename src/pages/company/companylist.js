import React, { useState,useEffect } from "react";
import {  Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {addCompnayAction,getCompanyListAction} from "../../actions/companyAction"

const Company_list = () => {
  const dispatch = useDispatch();
  const listCompany=useSelector((state) => state.getCompanyData);
  const {companylist,loading,error}=listCompany;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    
    if (userInfo) {
     dispatch(getCompanyListAction());
      // console.log(companylist.companyList[0].hubs)
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
 
  return ( 
    <>
    <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>CompanyName</th>
              <th>detail1</th>
              <th>detail2</th>
              <th>president(CEO)</th>
              <th>address</th>
              <th>hubs</th>
              <th>sheet</th>
            </tr>
          </thead>
          <tbody>
            {/* {companylist.exceldata!=null ? companylist.exceldata.map((list) => (
              <tr>
                <td>{list.companyName}</td>
                <td>{list.detail1}</td>
                <td>{list.detail2}</td>
                <td>{list.president}</td>
                <td>{list.address}</td>
                <td>{list.hubs}</td>
                <td>{companylist.sheetname}</td>
               
              </tr>
            )) : <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
          </tr>} */}
          </tbody>
        
        </Table>
      )}
    </>
     
  );
 
};
export default Company_list;
