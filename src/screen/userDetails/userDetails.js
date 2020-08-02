import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,Modal, Image, ScrollView } from 'react-native';
import styles from './styles';
import { API_URL, postWithJwt, FILE_URL } from '../../JS/service';
import Header from '../../component/Header';
import constantData from '../../JS/constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import mainStyles from '../../mainStyles';
import Video from 'react-native-video';


let videos = [];
let user = {};
export default class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
      },
      videos: [],
      isFollow: false,
      isLoading: false,
      isVideo: true,
      posts: 0,
      token: '',
      modalVisible:false
    }
  }


  // Call after the component is rendered correctly
  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      videos = this.state.videos;
      this.setState({isLoading:true});
      AsyncStorage.getItem('userId').then(value => {
        const formData = new FormData();
        const { id, token } = JSON.parse(value);
        this.setState({ token: token })
        formData.append('current_user_id', id);
        formData.append('user_id', this.props.navigation.state.params.user.id);
        const data = { param: "api/users/userProfile", formData: formData }
        postWithJwt(data, token).then(res => {
          console.warn(res);
          this.setState({ post: 0 })
          videos = []
          Object.keys(res.feedDetails).map(k => {
            videos.push(Object.assign(res.feedDetails[k], { isBuffering: true }));
            this.setState({ post: this.state.post + 1 })

          })
          user = res.userDetails
          this.setState({ user: user,isVideo:false,isLoading:false, videos: videos, isFollow: res.isFollow == undefined ? false : res.isFollow });
        }).catch(error=>{
          this.setState({isVideo:false,isLoading:false})
        })
      })
    })
  }


  // Call after the video loaded
  onLoad(data) {
    this.player.seek(0);
    let index = videos.indexOf(data);
    if (videos[index] != undefined) {
      videos[index].isBuffering = false;
    }
    this.setState({ videos: videos });
  }

  // Call to navigate video player screen to play video
  gotoView(src) {
    this.props.navigation.navigate('video', { src: Object.assign(src, { userId: this.state.user.id }) });
  }

  //Call to view Following or Follower's details
  getFollowDetails(type) {
    this.props.navigation.navigate('FollowingUser', { type: type, userId: this.props.navigation.state.params.user.id })
  }

  // Call to follow user
  onFollow() {
    if(!this.state.isFollow || this.state.modalVisible){
    this.setState({ isLoading: true,modalVisible:false });
      
      AsyncStorage.getItem("userId").then(value => {
        const { id, token } = JSON.parse(value);
        const formData = new FormData();
        formData.append('user_id', id);
        formData.append('follower_id', this.state.user.id);
        const data = { param: "api/users/follow", formData: formData }
        if(this.state.user.id != null && this.state.user.id !=undefined){
          postWithJwt(data, token).then(res => {
            if (res.ack == 1) {
              this.setState({ isFollow: !this.state.isFollow });
            }
            this.setState({ isLoading: false });
    
          }).catch(error => { this.setState({ isLoading: false}) })
        }
        else{
          this.setState({ isLoading: false})
        }
        
      })
    }
    else{
      this.setState({modalVisible:true})
    }
  

  }

  render() {
    const { user, videos } = this.state
    let uploadedVideo;
    if (videos != undefined) {
      uploadedVideo = videos.map((src) => {
        return (
          <View style={styles.container}>
            {/* {(src.video_type == 'R') && (
              <View style={styles.card}>

                <Video
                  source={{ uri: FILE_URL + src.original_video }}
                  ref={(ref) => {
                    this.player = ref
                  }}
                  resizeMode="contain"
                  paused={true}
                  onLoad={() => this.onLoad(src)}
                  style={styles.thumbnail}
                />
                <View style={styles.videoPlayIcon}>
                  <TouchableOpacity style={styles.button} onPress={() => this.gotoView(src)}>
                    <Icon name="video-camera" color="white" size={22}></Icon>
                  </TouchableOpacity>
                </View>
              </View>

            )} */}
            {/* {(src.video_type == 'Y') && ( */}
              <View style={styles.card}>

                <Image
                  source={{ uri: FILE_URL + src.youtube_thumb }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <View style={styles.videoPlayIcon}>
                  <TouchableOpacity style={styles.button} onPress={() => this.gotoView(src)}>
                    <Icon name="video-camera" color="white" size={22}></Icon>
                  </TouchableOpacity>
                </View>
              </View>

            {/* )} */}


          </View>
        )
      })
    }




    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <ScrollView>
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: FILE_URL + user.user_image }} style={styles.profileImg} />
            <View style={styles.userInfo}>
              <View style={styles.followDetails}>
                <View>
                  <Text style={styles.value}>{this.state.post}</Text>
                  <Text style={styles.text}>posts</Text>
                </View>
                <TouchableOpacity disabled={user.follower=='0'} onPress={() => this.getFollowDetails('follower')}>
                  <Text style={styles.value}>{user.follower}</Text>
                  <Text style={styles.text}>follower's</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={user.following=='0'} onPress={() => this.getFollowDetails('following')}>
                  <Text style={styles.value}>{user.following}</Text>
                  <Text style={styles.text}>following</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.onFollow()}
                style={[styles.followButton, { backgroundColor: `${this.state.isFollow ? constantData.colors.primary : '#fff'}` }]}>
                {this.state.isLoading && (
                  <ActivityIndicator size="small" color={this.state.isFollow ? '#fff' : constantData.colors.primary} />
                )}
                {!this.state.isLoading && (
                  <Text style={{ color: `${this.state.isFollow ? '#fff' : constantData.colors.primary}` }}>{this.state.isFollow ? "Following" : "Follow"}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.emailText}>{user.first_name + " " + user.last_name}</Text>
          <Text style={styles.aboutme}>{user.aboutme == 'null' ? "" : user.aboutme}</Text>
          <View style={styles.mediaConatiner}>
            <TouchableOpacity style={[styles.tabStyle]}>
              <Text>Uploaded Videos</Text>
            </TouchableOpacity>
        
          </View>
          {!this.state.isVideo && (
            <View style={styles.videoContainer}>
              {uploadedVideo}
            </View>
          )}
          {this.state.isVideo && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={constantData.colors.primary} />
            </View>
          )}
        
        </ScrollView>

            <Modal animationType={"fade"} transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ visible: false }) }}>

          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: FILE_URL + user.user_image }} style={styles.profileImg} />
              <Text style={styles.userName}>Unfollow@{user.first_name + " " + user.last_name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ modalVisible: false })}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.onFollow()}>
                  <Text>Unfollow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}