import React, { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import "../../style.css";
const Wrapper = styled.main`
  width: 100%;
  height: 70%;
  position:fixed;
  left : 0
`;
const GoogleMap = ({ children, ...props }) => (
  
    <Wrapper>
        <GoogleMapReact 
          bootstrapURLKeys={{
            key: 'AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA',
          }}
          {...props}
        >
          {children}
        </GoogleMapReact>
        <div id = "showOfficeDetail"></div>
  </Wrapper>
);
const Marker = ({ show, list }) => {
  let i;
let colorStyle="RGB("
for(i=0;i<3;i++)
{
    const randomecolorNum= Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    colorStyle+=randomecolorNum;
    
    if(i==2)
    {
      colorStyle+=")";
    }
    else
    {
      colorStyle+=",";
    }
}
console.log(colorStyle)
const markerStyle = {
  border: '3px solid blue',
  borderRadius: '50%',
  height: 30,
  width: 30,
  backgroundColor: show ?  'RGB(255,0,20)' :"RGB(255,255,20)",
  cursor: 'pointer',
  zIndex: 10,
};
return (
  <>
    <div style={markerStyle} />
    {/* {show ? <DetailShow  /> :''} */}
  </>
);
};


Marker.propTypes = {
// show: PropTypes.bool.isRequired,
list: PropTypes.shape({
  companyName: PropTypes.string,
  address: PropTypes.string,

}).isRequired,
};


GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
