import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Root } from "native-base";
import AppNavigation from './navigation';
import Expo, {AppLoading, Font, Asset} from "expo";
import {appIsReady,restoreSession} from './actions'
import {SecureStore} from 'expo'

class BrollyApp extends Component {

	//preload fonts, assets, etc
	 _cacheResourcesAsync = async() => {

		await Font.loadAsync({
		  Roboto: require("native-base/Fonts/Roboto.ttf"),
		  Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		  Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		});

		const images = [
		  require('../assets/images/brollyLogo.jpg'),
		];

		const cacheImages = images.map((image) => {
		  return Asset.fromModule(image).downloadAsync();
		});

		const {restoreStoredSession, updateStore} = this.props;

		//*********************** NOTE *******************************************************
		// Initially I wanted to use redux-persist to handle the storage and fetching automatically but
		// I had some dependency version conflicts trying to use that library and AsyncStorage 
		// with the Expo framework, that's why I ended up using their SecureStore instead
		//************************************************************************************

		//check for session and data saved in the storage and update state accordingly
		let storedSession = await SecureStore.getItemAsync('user');
	    let sessionObj= JSON.parse(storedSession);
	    let storedData = await SecureStore.getItemAsync('policy');
    	let storedObj= JSON.parse(storedData);
    	if(storedObj && sessionObj){
    		restoreStoredSession(sessionObj,storedObj);
    	}

		return Promise.all(cacheImages)

	}

	render() {
		const {isReady, appReady} = this.props;

		if (!isReady) {
	      return <AppLoading
	          startAsync={this._cacheResourcesAsync}
	          onFinish={() => appReady()}
	          onError={console.warn}
	        />;
	    }

		return (
	        <Root>  
				<AppNavigation />
	        </Root> 
        ) 
	}
}

const mapStateToProps = (state) => {
    return {
      isReady: state.app.isReady
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        appReady: () => dispatch(appIsReady()),
        restoreStoredSession: (session, data) => dispatch(restoreSession(session, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrollyApp);
