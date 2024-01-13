import axios from 'axios'
import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  // COMPANY_LIST_RESET,

  COMPANY_ADD_DATA,
  COMPANY_ADD_FAIL,
  // COMPANY_ADD_RESET,
  COMPANY_ADD_SUCCESS,
} from '../constants/companyConstant'

import { logout } from './userActions'

export const getCompanyListAction= () => async (dispatch, getState) =>{
  try {
  dispatch({
    type: COMPANY_LIST_REQUEST,
  })

  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  
  const { data } = await axios.get(`http://localhost:5000/api/company/getdata`, config,)
  dispatch({
    type: COMPANY_LIST_SUCCESS,
    payload: data,
  })
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Not authorized, token failed') {
    dispatch(logout())
  }
  dispatch({
    type: COMPANY_LIST_FAIL,
    payload: message,
  })
}
}
export const addCompnayAction = (payload) => async (dispatch, getState) => {
  console.log("--here--")
  try {
    dispatch({
      type: COMPANY_ADD_DATA,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`http://localhost:5000/api/company/add`, {body:payload}, config,)

    dispatch({
      type: COMPANY_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: COMPANY_ADD_FAIL,
      payload: message,
    })
  }
}
