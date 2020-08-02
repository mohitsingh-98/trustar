import React,{Component} from 'react';
import {ImageBackground,Text,Image,TouchableOpacity} from 'react-native';
import styles from './styles';
import Login from '../../component/FBLoginButton'
// var {FBLoginManager} = require('react-native-facebook-login');
// import { AccessToken, LoginManager } from "react-native-fbsdk";


export default class LoginOptionScreen extends Component{


  static navigationOptions={
    header:null,
  }

  constructor(props){
    super(props);
    this.state={
      checked:'first'
    }
  }

  // on Press login button to navigate into LoginScreen
  onLogin=()=>{
    this.props.navigation.navigate('Login')
  }
    
  //call to navigate UserEmail page where we asking Email for new user
  onSignUp=()=>{
    this.props.navigation.navigate('Signin');
  }


  render(){
    return(
      <ImageBackground 
        source={require('../../assets/Images/appBackground.png')}
        style={styles.container}>
        <Image style={styles.logo} resize="contain" source={require("../../assets/logo/01.png")} />
        <TouchableOpacity style={styles.createNewButton} onPress={this.onSignUp}>
          <Text style={styles.textStyle}>Create New Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <Login {...this.props}/>
      </ImageBackground>
    )
  }


}

