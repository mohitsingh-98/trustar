

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { API_URL, postWithJwt, FILE_URL } from '../../JS/service';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      controls: true,
      paused: false,
      skin: 'custom',
      ignoreSilentSwitch: null,
      isBuffering: true,
    }
  }

  // Call after the component is rendered correctly
  componentDidMount() {
    console.warn(this.props.navigation.state.params.src);
    this.setState({ data: this.props.navigation.state.params.src });
    AsyncStorage.getItem("userId").then(value => {
      const { id, token } = JSON.parse(value);
      let formData = new FormData();
      formData.append('user_id', id);
      formData.append('feed_id', this.props.navigation.state.params.src.id);
      const data = { param: "api/users/view_count", formData: formData }
      postWithJwt(data, token).then(res => {
      }).catch(error => console.warn("Error", error))
    })

  }


  // Call to move previous screen
  onBack() {
    this.setState({ rate: 0 })
    this.props.navigation.goBack()
  }

  // Call at the end of the video
  onEnd() {
    this.player.seek(0);
  }

  // Call when video get loaded and ready to play
  onLoad() {
    this.setState({ isBuffering: false });
    this.player.seek(0);
  }

  // Call when video stands for buffering
  onBuffer() {
    this.setState({ isBuffering: true });
  }

  //  call when video is playing
  onProgress() {
    this.setState({ isBuffering: false });
  }

  // call when any error will be occur during loading the video
  videoError(err) {
    console.warn(err);
  }


  render() {
    return (
      <View style={styles.container}>
        {(this.props.navigation.state.params.src.video_type == 'R') && (

          <Video
            source={{ uri: FILE_URL + this.props.navigation.state.params.src.original_video }}
            ref={(ref) => {
              this.player = ref
            }}
            rate={this.state.rate}
            repeat={true}
            resizeMode="contain"
            preventsDisplaySleepDuringVideoPlayback={false}
            paused={false}
            onLoad={() => this.onLoad()}
            onBuffer={() => this.onBuffer()}
            onProgress={() => this.onProgress()}
            onerror={(error) => console.warn(error)}
            style={styles.fullScreen}
            controls={true}
          />
        )}

        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
          <Feather name="arrow-left" color="#fff" size={30} />
        </TouchableOpacity>
        {this.state.isBuffering && (this.props.navigation.state.params.src.video_type == 'R') && (
          <ActivityIndicator size="small" style={styles.loader} color="#fff" />
        )}

        {(this.props.navigation.state.params.src.video_type == 'Y') && (

          <View style={{ height: '100%', width: '100%' }}>
            
            <WebView
              style={styles.WebViewContainer}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              useWebKit={true}
              source={{ uri: this.props.navigation.state.params.src.original_video+"?rel=0" }}
            />

          </View>


        )}
      </View>
    )
  }
}
