import { combineReducers } from 'redux';
import apps from './apps';

const rootReducer = combineReducers({
  apps,
})

//{} initial store
// apps reducer --> { apps: [] } current store

export default rootReducer;
