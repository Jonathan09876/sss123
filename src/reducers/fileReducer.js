
import {
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_CREATE_FAIL,
  FILE_CREATE_RESET,
  FILE_LIST_REUQEST,
  FILE_LIST_FAIL,
  FILE_LIST_SUCCESS,
  FILE_LIST_RESET,
  } from '../constants/fileConstant'
  
  export const createFileReducer = (state = { filelist: [] }, action) => {
    switch (action.type) {
      case FILE_CREATE_REQUEST:
        return { loading: true }
      case FILE_CREATE_SUCCESS:
        return { loading: false, success: true, filelist: action.payload }
      case FILE_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case FILE_CREATE_RESET:
        return { success: false }
      default:
        return state
    }
  }
  
  // export const updateProjectReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case PROJECT_UPDATE_REQUEST:
  //       return { loading: true }
  //     case PROJECT_UPDATE_SUCCESS:
  //       return { loading: false, success: true, userInfo: action.payload }
  //     case PROJECT_UPDATE_RESET:
  //       return { success: false }
  //     case PROJECT_UPDATE_FAIL:
  //       return { loading: false, error: action.payload }
  //     default:
  //       return state
  //   }
  // }
  
  // export const projectDetailsReducer = (state = { project: {} }, action) => {
  //   switch (action.type) {
  //     case PROJECT_DETAILS_REQUEST:
  //       return { ...state, loading: true }
  //     case PROJECT_DETAILS_SUCCESS:
  //       return { loading: false, project: action.payload }
  //     case PROJECT_DETAILS_FAIL:
  //       return { loading: false, error: action.payload }
  //     case PROJECT_DETAILS_RESET:
  //       return { project: {} }
  //     default:
  //       return state
  //   }
  // }
  
  
  export const fileListReducer = (state = { filelist: [] }, action) => {
    switch (action.type) {
      case FILE_LIST_SUCCESS:
        return { loading: false, filelist: action.payload }
      case FILE_LIST_FAIL:
        return { loading: false, error: action.payload }
      case FILE_LIST_RESET:
        return { filelist: [] }
      default:
        return state
    }
  }
  // export const projectDeleteReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case PROJECT_DELETE_REQUEST:
  //       return { loading: true }
  //     case PROJECT_DELETE_SUCCESS:
  //       return { loading: false, success: true }
  //     case PROJECT_DELETE_FAIL:
  //       return { loading: false, error: action.payload }
  //     default:
  //       return state
  //   }
  // }
  
  