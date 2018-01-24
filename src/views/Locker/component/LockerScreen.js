import React, {Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {  Container,Body, Header,Text,Title,Button,Icon,Content,Thumbnail,Left,List,ListItem} from "native-base";
import {logout} from '../../Login/actions';
import {fetchPolicies} from '../actions';
import { NavigationActions } from 'react-navigation';
import brollyLogo from '../../../../assets/images/brollyLogo.jpg'

class LockerScreen extends Component {
  
  static navigationOptions = {
    title: 'Your Locker',
  };

  async componentDidMount() {
    const {fetchData, isLoading, isReady} = this.props;

    if(!isLoading && !isReady) {
        fetchData();
    }
  }

  componentDidUpdate() {
    const {isLoggedIn,goToLoginScreen} = this.props;
    if(!isLoggedIn){
      goToLoginScreen();
    }
  }

  onLogoutClick = () => {
    const {logoutUser} = this.props;
    logoutUser();
  }

  
  render() {
    const {username, isLoading} = this.props;

    if(isLoading){
      return (
            <Container>
              <Content>
                <Text>Loading, please wait</Text>
              </Content>
            </Container>
        )
    }

    return (
  	<Container>
        <Header style={{height:150}} >
          <Body>
            <Button transparent  style={{height:40,alignSelf:'flex-end' }} iconRight onPress={this.onLogoutClick} >
              <Text>Welcome,{username} </Text>
              <Icon name='ios-log-out'/>
            </Button>
            <Title style={{alignSelf:'center'}}>Your Locker</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.props.policies}
            renderRow={(item) =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={brollyLogo} style={{height:30,width:30}}/>
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
              </ListItem>
            }>
          </List>
      </Content>
      </Container>

   )
  }
}


const mapStateToProps = (state) => {
    return {
      username: state.auth.username,
      isLoggedIn: state.auth.isLoggedIn,
      policies: state.policy.policies,
      isLoading: state.policy.isLoading,
      hasErrored: state.policy.hasErrored,
      isReady: state.policy.isReady
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToLoginScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
        fetchData: () => dispatch(fetchPolicies()),
        logoutUser: () => dispatch(logout()),
        // updateStore: (data) => dispatch(retrieveData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LockerScreen);
