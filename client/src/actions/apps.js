import axios from 'axios';

// get all apps - indux action
export const getApps = (callback) => {
  // thunk
  return(dispatch) => {
    axios.get('/api/apps')
      .then( res => dispatch({ type: 'APPS', apps: res.data}))
      .then( callback() )
  }
}
// add an app - create action
export const addApp = (app) => {
  return(dispatch) => {
    axios.post('/api/apps', {app})
      .then( res => dispatch({ type: 'ADD_APP', app: res.data}))
  }
}
// update an app - update action
export const updateApp = (app) => {
  return(dispatch) => {
    axios.put(`/api/apps/${app.id}`, { app })
      .then( res => dispatch({ type: 'UPDATE_APP', app: res.data}) )
  }
}
// delete an app - destroy action
export const deleteApp = (id) => {
  return(dispatch) => {
    axios.delete(`/api/apps/${id}`)
      .then( () => dispatch({ type: 'DELETE_APP', id}))
  }
}
