import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity,ImageBackground,Alert, TextInput } from 'react-native';
import Header from '../../component/Header';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import constantData from '../../JS/constant';
import ModalComponent from '../../component/ModalComponent';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-fast-image';

export default class PostOption extends Component {
  static navigationOptions = {
    titile:'Add Post'
  }
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      channelName: "",
      isProgress: true,
      modalText: ''
    }
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
      iosClientId: '87170390835-ghvu64mjp6mtjjbjas57stjecd1moa8e.apps.googleusercontent.com',
    })
  }


  componentDidMount() {
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    }).catch(e => {
      console.log(e);
    });
  }


  getYoutubeData(token) {
    this.setState({ visible: false });
    this.props.navigation.navigate('Youtube', { token: token });
  }



  signIn = async () => {
    this.setState({ visible: true });
    try {
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.warn('token', token.accessToken)
      this.getYoutubeData(token.accessToken)

    } catch (error) {
      console.warn(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        Alert.alert("Please try again")
        this.setState({ visible: false });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    this.setState({ visible: false });
  };


  startRecording = ()=>{
    ImagePicker.openCamera({
      width:400,
      height:400,
      mediaType:'video',
    }).then(video=>{
      console.warn(video)
      this.props.navigation.navigate('uploadvideo', { video: video.path, userId: this.state.userId})
      // this.setState({ photo: image });
    })
  }


  render() {

    return (
      <ImageBackground
        source={require('../../assets/Images/appBackground.png')}
        style={styles.container}>
        
        <Image style={styles.logo} resize="contain" source={require("../../assets/logo/01.png")} />
        <View style={{marginTop:50}}>
        <TouchableOpacity style={styles.iconButton} onPress={() => this.signIn()}>
          <TouchableOpacity>
            <AntDesign name="youtube" color="red" size={60} />
          </TouchableOpacity>
          <Text style={styles.iconButtonText}>Upload with Youtube</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => this.startRecording()}>
          <TouchableOpacity>
            <Entypo name="video" color="#ffa000" size={60} />
          </TouchableOpacity>
          <View>
            <Text style={styles.iconButtonText}>Film your video</Text>
          </View>
        </TouchableOpacity>
        </View>
        <ModalComponent
          isProgress={this.state.isProgress}
          visible={this.state.visible}
          title={this.state.modalText}
          page='editProfile'
          {...this.props}
        />

      </ImageBackground>
    )
  }
}