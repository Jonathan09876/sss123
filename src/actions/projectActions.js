import axios from 'axios'
import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_RESET,
  PROJECT_DELETE_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_RESET,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_RESET,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_RESET,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL
} from '../constants/projectConstants'

import { logout } from './userActions'


export const createProjectAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    const { data } = await axios.post(`http://localhost:5000/api/projects`, payload, config,)

    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({type: PROJECT_CREATE_RESET})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateProjectAction = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`http://localhost:5000/api/projects/${project._id}`, project, config)

    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({type: PROJECT_UPDATE_RESET})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const listProjectAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/projects`, config)
    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data.projects,
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
      type: PROJECT_LIST_FAIL,
      payload: message,
    })
  }
}

export const getProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/projects/${id}`, config)

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
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
      type: PROJECT_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const deleteProjectAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`http://localhost:5000/api/projects/${id}`, config)

    dispatch({ type: PROJECT_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: message,
    })
  }
}