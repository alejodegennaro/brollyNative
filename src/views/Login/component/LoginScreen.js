import React, {Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import { Container,Body, Header,Text, Item,Content,Form,Input,Button,Right} from "native-base";
import {View} from 'react-native';
import {login} from '../actions'
import { NavigationActions } from 'react-navigation';

class LoginScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {username: '', password:''};
  }

  static navigationOptions = {
    title: 'Login',
  };

  async componentDidMount() {
    const {isLoggedIn, goToLockerScreen} = this.props;
    //if the session is stored, jump to the main screen
    if(isLoggedIn){
      goToLockerScreen();
    }
  }

  componentDidUpdate() {
    const {isLoggedIn,goToLockerScreen} = this.props;
    
    if(isLoggedIn){
      goToLockerScreen();
    }
  }


  onLoginClick = () =>{
     const {login} = this.props;
     login({username:this.state.username, password:this.state.password});
  }

  
  render() {


    return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',}}>  
       <Form>
          <Item>
            <Input placeholder="Username" onChangeText={(text) => this.setState({username:text})}  value={this.state.username}/>
          </Item>
          <Item>
            <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({password:text})}  value={this.state.password}/>
          </Item>
          <Button primary full onPress={this.onLoginClick}><Text> Login </Text></Button>
      </Form>
    </View>
   )
  }
}


const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToLockerScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Locker' })),
        login: (userLogin) => dispatch(login(userLogin)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
