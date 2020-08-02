import React, { Component } from 'react';
import {TouchableOpacity,Text} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {initUser,post} from '../JS/service'
import AsyncStorage from '@react-native-community/async-storage';
// var { FBLoginManager } = require('react-native-facebook-login');
import { AccessToken, LoginManager } from "react-native-fbsdk";


 
export default class Login extends Component {

  constructor(props){
    super(props);
  }


  facebookLogin = ()=>{
    
    // LoginManager.setLoginBehavior(LoginManager.LoginBehaviors.Native); // defaults to Native
    // LoginManager.logInWithPermissions(["public_profile"]).then((result) => {
    LoginManager.logInWithPermissions(["public_profile"],(error, data)=>{
      if (!error) {
        console.warn(data)
        initUser(data.credentials.token).then(res=>{
          console.warn('res',res);
          let formData = new FormData();
          formData.append("social_id",res.id)
          formData.append("name",res.name)
          formData.append("email",res.email);
          formData.append('picture','')
          const data ={param:"api/users/facebook_login",formData:formData}
          post(data).then(response=>{
            console.warn(response);
            if(response != undefined && response != null){
              if(response.ack==1 && response.details != null && response.details != undefined){
                AsyncStorage.setItem("CurrentUser",JSON.stringify(response.details));
                AsyncStorage.setItem("userId",JSON.stringify(response.details.id));
                this.props.navigation.navigate('Home');
              }
            }
          })  
        }).catch(err=>console.warn(error));
       
      } else {
        console.warn("Error: ", error);
      }
    })
  }

  render() {
    
    return (
    	<TouchableOpacity style={styles.facebookButton} onPress={()=>this.facebookLogin()}>
        <Icon name="facebook" color="#fff" size={20}/>
        <Text style={styles.fbLoginText}>Login With Facebook</Text>
      </TouchableOpacity>
    );
  }
};


