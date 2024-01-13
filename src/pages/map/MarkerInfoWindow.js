import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty'; 
import "../../style.css"; ///example
import GoogleMap from './GoogleMap';
import DetailShow from "./DetailShow";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getCompanyListAction} from "../../actions/companyAction"
import Loader from "../../components/Loader";
// import { geocode, RequestType,setDefaults } from "react-geocode";
// const address = "1600 Amphitheatre Parkway, Mountain View, CA";

const MarkerInfoWindow = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCompany=useSelector((state) => state.getCompanyData);
  const {companylist,loading,error}=listCompany;
  const userLogin = useSelector((state) => state.userLogin);
  const [show,setShow] = useState(false);
  const [childshow,setChildshow] = useState(false);
  const [currentMother,setCurrentMother] = useState(false);
  const { userInfo } = userLogin;
  const [currentChild,setCurrentChild]=useState(false);
  let hubs= new Array();

  const onChildClickCallback = (key) => {
    
    const index = companylist.findIndex((e) => e._id === key);
    
    if(index==null || index==undefined || index==-1)
    {
        setChildshow(true);
        const keynumber=Number(key)
        const indexChild= hubs.findIndex((e) => e.id === keynumber);
        setCurrentChild(hubs[indexChild])
    }
    else
    {
      setCurrentMother(companylist[index]);
      setShow(true);
    }
   
    

  };
  const onClosedetail=(type)=>
  {
    if(type=="child")
    {
      setChildshow(false);
    }
    else
    {
      setShow(false)
    }
   
  }
  useEffect(() => {
    
    if (userInfo) {
      dispatch(getCompanyListAction());
      
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate,userInfo]);
  if(companylist=="here" || companylist=={} || companylist==undefined)
  {
    return (<Loader />);
  }
  else
  {
     
      let count=0;
      
      for(let i=0;i<companylist.length;i++)
      {
        let Jhub=JSON.parse(companylist[i].hubs);
        for(let j=0;j<Jhub.arr.length;j++)
        {
          const randomnum=Math.floor(Math.random() * (20000 - 0 + 1)) + 0
       
          hubs[count]=Jhub.arr[j];
          hubs[count].hub=true;
          hubs[count].id=randomnum;
          hubs[count].roundColor=companylist[i].roundColor;
          hubs[count].color=companylist[i].color;
          hubs[count].hq=companylist[i].companyName
          count++;
        }
      }
    
    return (
      <div >
        {!isEmpty(companylist) && (
          <GoogleMap
            defaultZoom={15}
            // backgroundColor={"grey"}
            defaultCenter={[companylist[0].lat,companylist[0].long]}
            bootstrapURLKeys={{ key: 'AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA'}}
            onChildClick={onChildClickCallback}
          >
            {companylist.map((list) => ( 
           
              <Marker
                    key={list._id}
                    lat={list.lat}
                    lng={list.long}
                    show={list.show}
                    list={list}
                />
           
              ))
              
              }
             
              {hubs.map((place) => (
                  <Marker
                      key={place.id}
                      lat={place.lat}
                      lng={place.long}
                      show={place.show}
                      list={place}
                  />
            ))}

          </GoogleMap>
          
        )}
         {show && <DetailShow onClosedetail={onClosedetail} list={currentMother} show={show} child={false}/> }
         {childshow && <DetailShow onClosedetail={onClosedetail} list={currentChild} show={show} child={true}/> }
      </div>
    );
  }
  
  
}
 // InfoWindow component

const Marker = ({ show, list }) => {
  if(list.hub==undefined || list.hub==null)
  {
    const upsty={
      border: '5px solid '+list.motherColor,
      borderRadius: '50%',
      height: 39,
      width: 39,
    }
    const markerStyle = {
      border: '3px solid ' + list.roundColor,
      borderRadius: '50%',
      height: 30,
      width: 30,
      backgroundColor: show ?  'RGB(255,0,20)' :list.color,
      cursor: 'pointer',
      zIndex: 10,
    };
    return (
      <>
        <div style={upsty}>
          <div style={markerStyle}></div>
        </div>
      </>
    );
  }
  else
  {
    const markerStyle = {
      border: '3px solid ' + list.roundColor,
      borderRadius: '50%',
      height: 30,
      width: 30,
      backgroundColor: show ?  'RGB(255,0,20)' :list.color,
      cursor: 'pointer',
      zIndex: 10,
    };
    return (
      <>
       
          <div style={markerStyle}></div>
       
        {/* {show ? <DetailShow  /> :''} */}
      </>
    );
  }
  
};


Marker.propTypes = {
  show: PropTypes.bool.isRequired,
  list: PropTypes.shape({
    companyName: PropTypes.string,
    address: PropTypes.string,
    detail: PropTypes.string,
    detail1: PropTypes.string,
  }).isRequired,
};
 


export default MarkerInfoWindow;