import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/index';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export default (state = initialState, action) => {

   const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};