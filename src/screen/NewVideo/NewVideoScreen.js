
import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import styles from './styles';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postWithJwt } from '../../JS/service';
import Video from 'react-native-video';
import ModalComponent from '../../component/ModalComponent';
import AsyncStorage from '@react-native-community/async-storage';

export default class RecordingScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      uri: '',
      userId: "",
      isBack: true,
      token: '',

    }
  }


  // Call after the component is rendered correctly
  componentWillMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ recording: false})
      AsyncStorage.getItem('userId').then((value) => {
        const { id, token } = JSON.parse(value);
        if (this.props.navigation.state.params != undefined) {
          this.setState({
            userId: this.props.navigation.state.params.userId,
            token: token
          })
        } else {
          this.setState({ userId: "" })
        }
      })
    })

  }

  // Call to start video recording

  startRecording() {
    this.setState({recording:true})
    this.camera.recordAsync().then((uri) => {
      this.setState({ recording: false })
      this.props.navigation.navigate('Preview', { data: uri.uri, userId: this.state.userId})
    }).catch(error => console.warn(error))

  }


  //Call when stop recording

  stopRecording() {
    this.camera.stopRecording()
  }

  //Call to move previous screen
  goBack() {
    if (this.state.recording) {
      this.camera.stopRecording();
    }
    this.props.navigation.goBack();
  }




  render() {
    let button = (
      <TouchableOpacity
        onPress={() => this.startRecording()}
        style={styles.button}>
        <Icon name="video-camera" size={40} color="#ffc107" />
      </TouchableOpacity>
    );

    if (this.state.recording == true) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.button}>
          <Icon name="stop-circle-o" size={80} color="#e91e63" />
        </TouchableOpacity>
      );
    }


    return (
      <View style={styles.container}>
        {
          !this.state.recording && (
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.goBack()} style={styles.editIcon}>
                <AntDesign name="close" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => this.props.navigation.navigate('musicList')}
              >
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ isBack: !this.state.isBack })}>
                <Ionicons name="ios-reverse-camera" size={40} color="#fff" />
              </TouchableOpacity>

            </View>

          )
        }

        <RNCamera
          mute={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          ref={cam => (this.camera = cam)}
          style={styles.cameraView}
          type={this.state.isBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          captureAudio={true}
        />
        <View style={styles.buttonContainer}>
          {button}
        </View>



      </View>
    );
  }
}



