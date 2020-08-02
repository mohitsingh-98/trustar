import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, Dimensions, Text, Image, TouchableOpacity, } from 'react-native';
import styles from './styles';
import mainStyles from '../../mainStyles';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, postWithJwt, FILE_URL } from '../../JS/service';
import { compose } from 'recompose';
import serviceCallAction from '../../JS/Actions/ServiceCallAction';
import ModalComponent from '../../component/ModalComponent';



class Profile extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email_address: '',
      user_image: '',
      gender: '',
      follower: 0,
      following: 0,
      aboutme: '',
      feedDetails: [],
      rate: 1,
      paused: true,
      otherUser: false,
      isProgress: true,
      visible: false,
      modalText: "Loading...",
      userId: ''
    }
  }

  // Call after the component is rendered correctly

  componentDidMount() {

    this.setState({visible: true });
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ otherUser: false})
      const formData = new FormData();
      AsyncStorage.getItem('userId').then((value) => {
        const { id, token } = JSON.parse(value);
        this.setState({ userId: id });
        if (value !== null) {
          formData.append('user_id', id);
          const data = { param: "api/users/my_profile", formData: formData }
          this.getUserDetails(data, token);
        }
        else {
          console.warn('else');
          this.setState({ visible: false });
        }
      })
    });



  }


  getUserDetails(data, token) {

    postWithJwt(data, token).then((res) => {
      console.warn('res', res)
      if (res != undefined && res != null) {
        if (res.ack == 1) {
          const user = res.userDetails;
          console.warn('user', user)
          this.setState(Object.assign(user, { feedDetails: res.feedDetails, visible: false }));
          this.props.callService(res.userDetails);
        }
        else {
          this.setState({ visible: false });
        }
      }
      else {
        this.setState({ visible: false });
      }
    }).catch(error => {
      this.setState({ isProgress: false, visible: false, modalText: 'Something went wrong' })
    })
  }


  getFollowDetails(type) {
    this.props.navigation.navigate('FollowingUser', { type: type, userId: this.state.userId })
  }
  // call when video loaded and ready to play 



  // Call to navigate edit profile to edit user details
  gotoEditProfile() {
    const user = this.state
    this.props.navigation.navigate('editProfile', { user });
  }

  // Call to pass specific video url to play
  onPlayVideo(src) {
    this.props.navigation.navigate('video', { src })
  }


  render() {
    const { feedDetails } = this.state
    gridVideo = feedDetails.map((src) => {
      return (
        <View style={styles.card}>

            <TouchableOpacity onPress={() => this.onPlayVideo(src)}>
              <Image
                source={{ uri: FILE_URL + src.youtube_thumb }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.playVideoButton}>
                <TouchableOpacity onPress={() => this.onPlayVideo(src)}>
                  <Icons name="video-camera" color="white" size={22}></Icons>
                </TouchableOpacity>
              </View>
              
            </TouchableOpacity>
          <Text style={{fontSize:15,marginTop:8}}>{src.title}</Text>
          <Text style={{fontSize:13,marginTop:2,color:'grey'}}>{src.description}</Text>

        </View>
      )
    }
    )

    return (
      <ImageBackground
        source={require('../../assets/Images/appBackground.png')}
        style={styles.container}>
        <ScrollView>
          <View style={[styles.header, { justifyContent: !this.state.otherUser ? "space-between" : "center" }]}>
            {!this.state.otherUser && (
              <TouchableOpacity style={styles.iconButton} onPress={() => this.props.navigation.toggleDrawer()}>
                <Ionicons name="md-menu" size={24}></Ionicons>
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>Profile</Text>
            {!this.state.otherUser && (
              <TouchableOpacity onPress={() => this.gotoEditProfile()} style={styles.editButton}>
                <Icons name="pencil" style={styles.iconAlign} color="#fff" size={20} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.mainContainer}>
            {/* <Text>{Profile[0].sources}</Text> */}
            <Image
              source={{ uri: FILE_URL + this.state.user_image }}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <Text style={styles.name}>{this.state.first_name + ' ' + this.state.last_name}</Text>
            <View style={styles.profileStatus}>
              <TouchableOpacity disabled={this.state.follower == 0} onPress={() => this.getFollowDetails('follower')}>
                <Text style={styles.count}>{this.state.follower}</Text>
                <Text>Follower's</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={this.state.following == 0} onPress={() => this.getFollowDetails('following')}>
                <Text style={styles.count}>{this.state.following}</Text>
                <Text>Following</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textConatiner}>
              <View style={styles.line} />
              <Text style={styles.text}>About Me</Text>
              <View style={styles.line} />
            </View>
            <Text style={styles.description}>{this.state.aboutme}</Text>

            <View style={styles.userInfo}>
              <View style={styles.icon}>
                <Icons name='transgender-alt' size={20} style={styles.iconStyle} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.headerFont}>Gender</Text>
                <Text style={styles.inputValue}>{this.state.gender}</Text>
              </View>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.icon}>
                <Icons name='envelope' size={20} style={styles.iconStyle} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.headerFont}>Email</Text>
                <Text style={styles.inputValue}>{this.state.email_address}</Text>
              </View>
            </View>

            <Text style={styles.mediaText}>Uploaded Videos</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.videoContainer}>
              {gridVideo}
            </ScrollView>
          </View>
        </ScrollView>
        <ModalComponent
          isProgress={this.state.isProgress}
          visible={this.state.visible}
          title={this.state.modalText}
          page='editProfile'
          {...this.props}
        />
      </ImageBackground>
    );
  }
}


export default compose(serviceCallAction)(Profile)
