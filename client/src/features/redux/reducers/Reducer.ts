import { combineReducers } from 'redux';
import tokenReducer from '../slices/user/tokenSlice';
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice';
import allEmployerReducer from '../slices/user/allEmployersSlide';
import deleteEmployerRducer from '../slices/user/deleteEmployerSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  userAuth: userLoginAuthReducer,
  allEmployers: allEmployerReducer,
  deleteEmployers: deleteEmployerRducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
