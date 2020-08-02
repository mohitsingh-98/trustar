import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import mainStyles from '../../mainStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConstantData from '../../JS/constant';
import { postWithJwt } from '../../JS/service';
import AsyncStorage from '@react-native-community/async-storage';



export default class ChangePassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      newPassword: "",
      password: "",
      error: "",
      token: '',
    }
  }

  //Call after the component is rendered correctly

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      AsyncStorage.getItem('userId').then(value => {
        if (value != null) {
          const { id, token } = JSON.parse(value);
          this.setState({ userId: id, newPassword: "", password: "", error: "", token: token });
        }
      })
    })
  }

  onCancel() {
    this.props.navigation.goBack()
  }

  //Call to get input field value 

  validate(text, type) {
    if (type == 'newPassword') {
      this.setState({ newPassword: text })
    }
    else if (type == 'password') {
      this.setState({ password: text })
    }
  }

  //Call to Update user password with server

  onSave() {
    if (this.state.password == "" || this.state.password == undefined ||
      this.state.newPassword == "" || this.state.newPassword == undefined) {
      this.setState({ error: "Please enter Password " })
    }
    else if (ConstantData.passwordPattern.test(this.state.newPassword)) {
      let formData = new FormData();
      formData.append("password", this.state.password);
      formData.append("new_password", this.state.newPassword);
      formData.append("user_id", this.state.userId);
      const data = { param: "api/users/change_password", formData: formData }
      postWithJwt(data, this.state.token).then(res => {
        if (res.ack == 1) {
          this.props.navigation.navigate('LoginOption')
        }
        else if (res.ack == 0) {
          this.setState({ error: res.message })
        }
      })
    }
    else {
      this.setState({ error: "Password validation is set as 6 characters with atleast 1 symbol & number." });
    }

  }


  render() {
    return (
      <View style={[mainStyles.fullWidth,{backgroundColor:'white',flex:1}]}>
        <TouchableOpacity style={styles.buttonLeftAlign} onPress={() => this.props.navigation.toggleDrawer()}>
          <Ionicons name="md-menu" size={24}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Your Password</Text>

        <View style={styles.card}>
          <View style={styles.inputContainerAlign}>
            <TextInput
              onChangeText={(text) => this.validate(text, 'newPassword')}
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
              onChangeText={(text) => this.validate(text, 'password')}
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
              onPress={() => this.onSave()}
              style={[styles.button, { backgroundColor: ConstantData.colors.primary }]}>
              <Text style={styles.buttonTextAlign}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onCancel()}
              style={styles.button}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}



