import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TextInput, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native';
import styles from './styles';
import Icons from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import { postWithJwt, API_URL } from '../../JS/service';
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class UploadVideo extends Component {

  static navigationOtions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      video: "",
      title: "",
      description: "",
      paused: true,
      reapeat: false,
      isUploading: false,
      userId: "",
      error: "",
      token: '',
      video_type: '',
      is_competition: 0,
      isError: false,
      errText: ''
    }
  }

  // Call after the component is rendered correctly  
  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState(this.props.navigation.state.params)
      AsyncStorage.getItem("userId").then((value) => {
        const { id, token, is_competition } = JSON.parse(value)
        this.setState({ userId: id, token: token, is_competition: is_competition })
      })
    })
  }

  // Call for upload video details 
  onUploadVideo() {
    this.setState({ isUploading: true });
    let formData = new FormData();
    formData.append('user_id', this.state.userId)
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('video_type', 'R')
    formData.append('original_video', {
      uri: this.state.video,
      type: 'video/mp4',
      name: 'video.mp4'
    });
    formData.append('feed_type', this.state.is_competition == 0 ? "G" : "C");
    const data = { param: "api/users/saveVideo", formData: formData }

    console.warn(data);
    postWithJwt(data, this.state.token).then(res => {
      if (res != undefined) {
        if (res.ack == 1) {
          this.setState({ isUploading: false });
          this.props.navigation.navigate('Profile');
        }
        else {
          this.setState({ isUploading: false, isError: true, errText: 'Please try again' });
        }
      }
      else {
        this.setState({ errText: 'Please try again', isUploading: false, isError: true })
      }

    }).catch(error => {
      console.warn(error)
      this.setState({ isUploading: false, isError: true, errText: 'ACK 0' });
    })
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       
        <View style={styles.backgroundContainer}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', width:'100%',height:80,marginTop:60}}>
          <MaterialIcons onPress={()=>this.props.navigation.goBack()} name="keyboard-backspace" size={28} color="#fff" style={{position:'absolute',left:10}} />
          <Text style={{color:'#fff',fontSize:18, alignSelf:'center'}}>Upload</Text>
        </View>
          <Video
            source={{ uri: this.state.video }}
            ref={(ref) => {
              this.player = ref
            }}
            resizeMode="cover"
            paused={this.state.paused}
            reapeat={this.state.reapeat}
            playInBackground={false}
            playWhenInactive={false}
            onError={err => console.warn(err)}
            style={styles.thumbnail}
          />
          {this.state.isUploading && (
            <Text style={{color:'#fff',fontSize:18,position:"absolute",}}>UPLOADING...</Text>
         )}
          {!this.state.isUploading && (
          <TouchableOpacity style={styles.playButton} onPress={() => this.setState({ paused: !this.state.paused })}>
            <Icons name="video-camera" color="white" size={28}></Icons>
          </TouchableOpacity>
          )}
        </View>
        {/* <View style={styles.main}> */}

        <View style={styles.card}>

          <View>
            {/* <TextInput
              placeholder="Song Title"
              style={styles.input}
              onChangeText={(text) => this.setState({ title: text })}
              returnKeyType="done"
            />
            <TextInput
              placeholder="Describe your video"
              style={styles.input}
              onChangeText={(text) => this.setState({ description: text })}
              multiline={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            /> */}
  
            <TextField
              label='Title'
              onChangeText={(text) => this.setState({ title: text })}
              tintColor="#ffc107"
              autoCapitalize={false}
            />
            <TextField
              label='Describe your video'
              onChangeText={(text) => this.setState({ description: text })}
              tintColor="#ffc107"
              autoCapitalize={false}

            />



            {!this.state.isUploading && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onUploadVideo()}>
                  {/* <Icons name="check" color="#fff" size={20}></Icons> */}
                  <Text style={styles.buttonText}>UPLOAD</Text>
                  <AntDesign name="upload" color="#fff" size={24} style={{position:'absolute',right:15,top:10}}/>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Voice')}
                  style={styles.button}>
                  <Icons name="close" color="#fff" size={20}></Icons>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity> */}
              </View>
            )}
            {this.state.isUploading && (
              <TouchableOpacity style={styles.loader}>
                <ActivityIndicator
                  size="small" color="#fff" />
              </TouchableOpacity>
            )}
            {this.state.isError && (
              <Text style={styles.errorText}>{this.state.errText}</Text>
            )}

          </View>

        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    )
  }
}


