import { combineReducers } from 'redux';
import tokenReducer from '../slices/account/tokenSlice';
import userLoginAuthReducer from '../slices/account/accountLoginAuthSlice';
import allEmployerReducer from '../slices/account/allAccountsSlide';
import deleteEmployerRducer from '../slices/account/deleteAccountSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  userAuth: userLoginAuthReducer,
  allEmployers: allEmployerReducer,
  deleteEmployers: deleteEmployerRducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
