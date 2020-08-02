
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OctIcons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { compose } from 'redux';
import serviceCallAction from '../JS/Actions/ServiceCallAction';
import { API_URL, FILE_URL } from '../JS/service';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: '',
      userName: ''
    }
  }




  onLogout() {
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('CurrentUser').then(() => {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      this.props.callService({});
      this.props.navigation.navigate('LoginOption');
    });
  }

  gotoNavigate(nav) {
    this.props.navigation.closeDrawer();
    if (nav == 'Profile') {
      this.props.navigation.navigate('Profile')
    }
    else if (nav == 'leaderDashboard') {
      this.props.navigation.navigate('leaderDashboard')
    }

    else if (nav == 'changePassword') {
      this.props.navigation.navigate('changePassword')
    }

  }


  render() {
    return (
      <View style={styles.fullWidth}>
        <View style={styles.header}>
          <Image
            source={{ uri: FILE_URL + this.props.data.user_image }}
            style={styles.userImage} />
          {this.props.data.first_name != undefined && (
            <Text style={styles.textStyle}>
              {this.props.data.first_name + " " + this.props.data.last_name}
            </Text>
          )}

        </View>
        <TouchableOpacity onPress={() => this.gotoNavigate('Profile')} style={styles.container}>
          <OctIcons name="person" size={26} style={styles.leftAlign}></OctIcons>
          <Text style={styles.textAlign}>My Profile</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>this.gotoNavigate('leaderDashboard')} style={styles.container}>
          <MaterialCommunityIcons name="view-dashboard" size={26} style={styles.leftAlign} />
          <Text style={styles.textAlign}>Leader Dashboard</Text>
        </TouchableOpacity> */}


        <TouchableOpacity onPress={() => this.gotoNavigate('changePassword')} style={styles.container}>
          <MaterialCommunityIcons name="onepassword" size={25} style={styles.leftAlign}></MaterialCommunityIcons>
          <Text style={styles.textAlign}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onLogout()} style={styles.container}>
          <SimpleLineIcons name="logout" size={25} style={styles.leftAlign}></SimpleLineIcons>
          <Text style={styles.textAlign}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default compose(serviceCallAction)(DrawerContent);


const styles = StyleSheet.create({

  header: {
    backgroundColor: '#f50057',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  container: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },

  fullWidth: {
    width: "100%"
  },

  leftAlign: {
    marginLeft: 10
  },


  textAlign: {
    fontSize: 15,
    marginLeft: 20
  },

  textStyle: {
    color: 'white',
    fontSize: 18
  }
})