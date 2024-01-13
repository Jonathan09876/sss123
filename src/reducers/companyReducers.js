import {
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_RESET,
  COMPANY_LIST_REQUEST,
  COMPANY_ADD_DATA,
  COMPANY_ADD_FAIL,
  COMPANY_ADD_RESET,
  COMPANY_ADD_SUCCESS,
    
  } from '../constants/companyConstant'
  
  // export const createProjectReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case PROJECT_CREATE_REQUEST:
  //       return { loading: true }
  //     case PROJECT_CREATE_SUCCESS:
  //       return { loading: false, success: true, project: action.payload }
  //     case PROJECT_CREATE_FAIL:
  //       return { loading: false, error: action.payload }
  //     case PROJECT_CREATE_RESET:
  //       return { success: false }
  //     default:
  //       return state
  //   }
  // }
  
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
  export const companyGetReducer = (state = { companylist: [] }, action) => {
    switch (action.type) {
      case COMPANY_LIST_REQUEST:
          return {loading : true}
      case COMPANY_LIST_SUCCESS:
        return { loading: false, companylist: action.payload }
      case COMPANY_LIST_FAIL:
        return { loading: false, error: action.payload }
      case COMPANY_LIST_RESET:
        return { companylist: [] }
      default:
        return state
    }
  }
  export const companyAddDataReducer = (state = { companylist: [] }, action) => {
    switch (action.type) {
      case COMPANY_ADD_DATA:
          return {loading : true}
      case COMPANY_ADD_SUCCESS:
        return { loading: false, companylist: action.payload }
      case COMPANY_ADD_FAIL:
        return { loading: false, error: action.payload }
      case COMPANY_ADD_RESET:
        return { companylist: [] }
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
  
  