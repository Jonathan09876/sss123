import axios from 'axios'
import {
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_CREATE_FAIL,
  FILE_CREATE_RESET,

  FILE_LIST_REUQEST,
  FILE_LIST_FAIL,
  FILE_LIST_SUCCESS,
} from '../constants/fileConstant'

import { logout } from './userActions'

export const createFileAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FILE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
   
    const { data } = await axios.post(`http://localhost:5000/api/file/create`, payload, config,)

    dispatch({
      type: FILE_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({type: FILE_CREATE_RESET})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FILE_CREATE_FAIL,
      payload: message,
    })
  }
}

// export const updateProjectAction = (project) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PROJECT_UPDATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.patch(`http://localhost:5000/api/projects/${project._id}`, project, config)

//     dispatch({
//       type: PROJECT_UPDATE_SUCCESS,
//       payload: data,
//     })

//     dispatch({type: PROJECT_UPDATE_RESET})
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PROJECT_UPDATE_FAIL,
//       payload: message,
//     })
//   }
// }

export const FilelistAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FILE_LIST_REUQEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`http://localhost:5000/api/file/list`, '',config,)
    dispatch({
      type: FILE_LIST_SUCCESS,
      payload: data.filelist,
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
      type: FILE_LIST_FAIL,
      payload: message,
    })
  }
}

// export const getProjectDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PROJECT_DETAILS_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.get(`http://localhost:5000/api/projects/${id}`, config)

//     dispatch({
//       type: PROJECT_DETAILS_SUCCESS,
//       payload: data,
//     })
    
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PROJECT_DETAILS_FAIL,
//       payload: message,
//     })
//   }
// }

// export const deleteProjectAction = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PROJECT_DELETE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.delete(`http://localhost:5000/api/projects/${id}`, config)

//     dispatch({ type: PROJECT_DELETE_SUCCESS })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PROJECT_DELETE_FAIL,
//       payload: message,
//     })
//   }
// }