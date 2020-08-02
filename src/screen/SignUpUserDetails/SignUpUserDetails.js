

import React,{Component} from 'react';
import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from './styles';
import { post } from '../../JS/service';
import constantData from '../../JS/constant';
import ModalComponent from '../../component/ModalComponent';


export default class SignUpUserDetails extends Component{
 
	static navigationOptions={
		header:null
	} 

  constructor(props){
    super(props);
    this.state={
      email:'',
      name:'',
      password:'',
      confirmPassword:'',
			visible:false,
      isProgress:true,
      errorText:"",        
    }
  }

  // Call after the component is rendered correctly
  componentDidMount(){
    if(this.props.navigation.state.params != undefined){
      this.setState({email:this.props.navigation.state.params.email});     
    }
  }

  // Call to complete signup and save the valid user details   
  onSignUp=()=>{
    if(this.state.name =='' || this.state.name == undefined){
      this.setState({errorText:"Username can not be blank"})
    }
    else if(!constantData.usernamePattern.test(this.state.name)){
      this.setState({errorText:"Full Name can't be numbers & special character"})
    } 
    else if(this.state.password == "" || this.state.password == undefined){
      this.setState({errorText:"Please enter Password "})
    }
    else if(!constantData.passwordPattern.test(this.state.password) || this.state.password.length<6){
      this.setState({errorText:"Password validation is set as 6 characters with atleast 1 symbol & number."})
    }
    else if(this.state.password != this.state.confirmPassword){
      this.setState({errorText:"Confirm password didn't match"})
    }
    else{
      this.setState({errorText:'',visible:true});
      let formData = new FormData();
      formData.append("email_address",this.state.email);
      formData.append("username",this.state.name);
      formData.append("password",this.state.password);
      const data ={param:"api/users/signup_step2",formData:formData}
      post(data).then((res=>{
        if(res.ack=='1'){
	        this.setState({isProgress:false});                                          
        }
      }))
    }       
  }

  //Call to get user input value  
  validate(text,type){       
    if(type=='name'){
      this.setState({name:text})        
    }
    else if(type=='password'){
      this.setState({password:text})
    }
    else if(type=='ConfirmPassword'){
      this.setState({confirmPassword:text})
    }
  }

  // Call to move previous screen or cancel signup 
	goBack = ()=>{
		this.setState({visible:false})
		this.props.navigation.navigate('Login') 
	}


  render(){
    return(
      <KeyboardAwareScrollView  contentContainerStyle={styles.container} scrollEnabled>
            <Image
              source={require("../../assets/logo/01.png")}
              style={styles.logo} resize="contain" />
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  autoCorrect={false}
                  onChangeText={(text)=>this.validate(text,'name')}
                  returnKeyType="done"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Password</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  returnKeyType="next"
                  onChangeText={(text)=>this.validate(text,'password')}
                  returnKeyType="done"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Confirm Password</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Re-enter your Password"
                  secureTextEntry={true}
                  returnKeyType="next"
                  onChangeText={(text)=>this.validate(text,'ConfirmPassword')}
                  returnKeyType="done"
                />
              </View>  
              <Text style={styles.errorText}>{this.state.errorText}</Text>              
              <TouchableOpacity 
                onPress={()=>this.onSignUp()}
                style={[styles.button,{backgroundColor:"#ffc107"}]}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <ModalComponent
                isProgress={this.state.isProgress}
                visible={this.state.visible}
                title={this.state.isProgress ? 'SignUp in progress ...' : "Sign up successful !!!"} 
                page='signUp'
                {...this.props}
              />
                
            </KeyboardAwareScrollView>
      )
    }
}


