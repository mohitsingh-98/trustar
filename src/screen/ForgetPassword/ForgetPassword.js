import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import styles from '../ChangePassword/styles';
import mainStyles from '../../mainStyles';
import ConstantData from '../../JS/constant';
import { post } from '../../JS/service';



export default class ForgetPassword extends Component{


  constructor(props){
    super(props);
    this.state={
      userId:"",
      newPassword:"",
      password:"",
      error:"",
    }
  }

  //Call after the component is rendered correctly

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({userId:this.props.navigation.state.params.userId,newPassword:"",password:"",error:""});
    })
	}

  onCancel(){
    this.props.navigation.goBack()
  }
		
	//Call to get input field value 

  validate(text,type){     
    if(type=='newPassword'){
      this.setState({newPassword:text})
    }
    else if(type=='password'){
      this.setState({password:text})
    }
  }

	//Call to Update user password with server
	
  onSave(){
    if(this.state.password == "" || this.state.password == undefined ||
      this.state.newPassword == "" || this.state.newPassword == undefined){
      this.setState({error:"Please enter Password "})
    }
    else if(ConstantData.passwordPattern.test(this.state.newPassword)){
      let formData= new FormData();
      formData.append("password",this.state.password);
      formData.append("new_password",this.state.newPassword);
      formData.append("user_id",this.state.userId);        
      const data ={param:"api/users/change_password",formData:formData}
      post(data).then(res=>{
        if(res.ack==1){
          this.props.navigation.navigate('LoginOption')
        }
        else if(res.ack ==0){
          this.setState({error:res.message})
        }
      })
    }
    else{
      this.setState({error:"Password validation is set as 6 characters with atleast 1 symbol & number."});
    }
  
  }


  render(){
    return(
      <View style={mainStyles.fullWidth}>
        <View style={styles.card}>
          <Text style={styles.headerText}>Reset Your Password</Text>
          <View style={styles.inputContainerAlign}>
            <TextInput
              onChangeText={(text)=>this.validate(text,'newPassword')}
              style={styles.input} 
              autoCapitalize="none"
              placeholder="New Password"
              secureTextEntry={true}
              autoCorrect={false} 
              returnKeyType="done"
              secureTextEntry={true}
              value={this.state.newPassword}
            />
            <TextInput
              onChangeText={(text)=>this.validate(text,'password')}
              style={styles.input} 
              autoCapitalize="none"
              placeholder="Retype Password"
              secureTextEntry={true}
              autoCorrect={false}
              returnKeyType="done"
              secureTextEntry={true} 
              value={this.state.password}
            />
            <Text style={ConstantData.errorTextStyle}>{this.state.error}</Text>
            <TouchableOpacity 
              onPress={()=>this.onSave()}
              style={[styles.button,{backgroundColor:ConstantData.colors.primary}]}>
              <Text style={styles.buttonTextAlign}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>this.onCancel()}
              style={styles.button}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}



