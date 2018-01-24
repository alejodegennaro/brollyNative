import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../views/Login/component/LoginScreen';
import LockerScreen from '../views/Locker/component/LockerScreen';

export const AppNavigator = StackNavigator({
	Login: { screen: LoginScreen },
	Locker: { screen: LockerScreen },
	},
	{
	    headerMode: "none"
	}
	);

const AppNavigation = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigation);