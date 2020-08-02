import React,{Component} from 'react';
import {Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import constantData from '../../JS/constant';
import {post} from '../../JS/service'
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default class UserEmail extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      error:"",
      countryCode:"+1",
      email:'',
      emailValidate:false,  
      phone:'',        
    }
	}
	

	// Call to validate email and password for new user  
  validate(text,type){       
    let emailPattern=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(type=='email'){
      if(emailPattern.test(text)){
  	    this.setState({email:text,emailValidate:true});
      }
      else{
        this.setState({emailValidate:false})                
      }
    }
  
	}
	

	// Call to verify email with service and send otp to the email 
  gotoVerfiedEmail(){
    this.setState({isLoading:true});
    let formData = new FormData();
    formData.append("email_address",this.state.email);
    formData.append("mobile",this.state.phone);
    const data ={param:"api/users/signup_step1",formData:formData}
    post(data).then((res)=>{       
      if(res.ack == 1){
        this.setState({isLoading:false});
        this.props.navigation.navigate('UserEmailVerify',res);
      }
      else if(res.ack == 0){
        this.setState({error:res.message,isLoading:false});
      }
    })
  }

    
  render(){
    const {emailValidate,isLoading} = this.state;
    return(   
      <KeyboardAwareScrollView style={{backgroundColor:'#fff'}}>
            <Image 
              source={require("../../assets/logo/01.png")}
              style={styles.logo}
              resize="cover"
            />
            <View style={styles.main}>
              <Text style={styles.inputHeader}>Email</Text>
              <TextInput 
                style={styles.input}
                placeholder="Email address"
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text)=>this.validate(text,'email')} 
                returnKeyType="done"   
              />
              <Text style={styles.errorText}>{this.state.error}</Text>
           
              <TouchableOpacity
                disabled={!emailValidate}                
                onPress={()=>this.gotoVerfiedEmail()} 
                style={[styles.button,{backgroundColor:`${emailValidate ? constantData.colors.primary:"#eee"}`}]}>
                {!isLoading &&(
                  <Text style={{color:`${emailValidate ?"#fff":"grey"}`}}>Next</Text>
                )}
                {isLoading &&( 
                  <ActivityIndicator animating size="small" color="#fff" />                
                )}    
              </TouchableOpacity>
            </View>     
          </KeyboardAwareScrollView>
    )
  }
}



