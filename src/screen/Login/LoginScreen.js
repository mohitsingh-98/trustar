import React, {Component} from 'react';
import {View,ActivityIndicator, Text,Image,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import FBLogin from '../../component/FBLoginButton'
import Header from '../../component/Header';
import AsyncStorage from '@react-native-community/async-storage';
import ModalComponent from '../../component/ModalComponent';
import {post} from '../../JS/service'
import styles from './styles';


export default class LoginScreen extends Component{
	
	constructor(props){
    super(props);
    this.state={
      isLoading:false,
      error:'',
      email:'',
      emailValidate:false,
      password:'',
      isProgress:false,
      visible:false,
      modalText:''

      
    }
	}
	
	// Call to get input value for email and password

  onValidate(type,text){
    if(type=='email'){
      this.setState({email:text});
    }
		else if(type == 'password'){
      this.setState({password:text});           
    }

	}
	

// Call to check user exist or not
  onUserLogin(){
    if(this.state.email == "" || this.state.email == undefined || this.state.password =="" || this.state.password == undefined){
      this.setState({error:"Please enter Email & Password"})
		}
		else{
			this.setState({isLoading:true});
      let formData = new FormData();
      formData.append("email_address",this.state.email);
      formData.append("password",this.state.password);
      const data ={param:"api/users/login",formData:formData}
      console.warn('data',data);
    	post(data).then(res=>{
        console.warn('loginResponse....',res);
        if(res != undefined && res != null){
          if(res.ack==1){
           
            AsyncStorage.setItem("CurrentUser",JSON.stringify(Object.assign(res.details,{is_competition:res.is_competition})));
            AsyncStorage.setItem("userId",JSON.stringify({id:res.details.id,token:res.details.token,is_competition:res.is_competition}));
            AsyncStorage.setItem('switchLogin',JSON.stringify(true));
            // AsyncStorage.setItem('switchLogin',JSON.stringify({status:true}));
            this.setState({visible:true,isProgress:false,modalText:'Successfully Logged in'})
            // this.props.navigation.navigate('Feeds');
          }
          else {
            this.setState({error:"Email or password is incorrect"})
            this.setState({isLoading:false});
          }
        }
        else{
          this.setState({error:"Email or password is incorrect"})
          this.setState({isLoading:false});
        }
      })    
    }
     
  }

	render(){
		const {error}= this.state;
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Image
              style={styles.logo}
              source={require('../../assets/logo/01.png')}
							resizeMode="contain"
						/>
            <TextInput 
              onChangeText={(text)=>this.onValidate('email',text)} 
              style={styles.input} 
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
              autoCorrect={false}
              returnKeyType="done"
						/>

						<TextInput
              onChangeText={(text)=>this.onValidate('password',text)} 
              style={styles.input}
              secureTextEntry={true}
              autoCorrect={false}
              placeholder="Password"
              returnKeyType="done"
						/>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={()=>this.onUserLogin()}>
              {!this.state.isLoading &&(
                <Text style={styles.buttonText}>Sign In</Text>
              )}
              {this.state.isLoading &&(
                <ActivityIndicator size="small" color="#fff"/>
              )}
	          </TouchableOpacity>
            <View style={styles.textMessage}>
              <Text style={styles.text}>Forgotten your login details?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                <Text style={styles.textHighlight}> Get help</Text>
     	        </TouchableOpacity>
            </View>
             
            <Text style={styles.orText}>OR</Text>
            <FBLogin  {...this.props}/>

            <View style={styles.footer}>
	            <Text style={styles.text}>Don't have an account?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')}>
   	            <Text style={styles.textHighlight}>  Sign up</Text>
     	        </TouchableOpacity>
            </View>

            <ModalComponent 
              isProgress={this.state.isProgress}
              visible={this.state.visible}
              title={this.state.modalText}
              page='login'
              {...this.props}
            /> 
	        </KeyboardAvoidingView>
    )
  }
}




 