
import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, SafeAreaView, ActivityIndicator, Platform, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles';
import WebView from 'react-native-webview';
import mainStyles from '../../mainStyles';
import Icons from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import constantData from '../../JS/constant';
import { API_URL, FILE_URL, postWithJwt } from '../../JS/service';
import SoundPlayer from 'react-native-sound-player';
import modalStyles from '../../component/styles';
import Share from 'react-native-share';
import Image from 'react-native-fast-image'

let videos = [];
let audioList = [];
let images = [{ image: "" }];


export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topVideos: [],
      competitionImage: images,
      isVideoLoading: true,
      isMute: true,
      userId: '',
      token: '',
      screenWidth: Dimensions.get('window').width,
      heightScaled: Dimensions.get('window').height - 420,
      rate: 1,
      isFetching: false,
      visible: false,
      isBlock: false,
      isBlocking: false,
      isReport: false,
      blockUser: {}
    }

    this.viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 45
    }
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
  }

  // Call after the component is rendered correctly

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ rate: 1 })

      AsyncStorage.getItem('switchLogin').then(stat => {
        if (JSON.parse(stat)) {
          this.getFeedData();
        }
        else {
          console.warn('false1');
        }
      })
    })


    this.getFeedData();
    this.props.navigation.addListener('didBlur', () =>{
      var videos = this.state.topVideos;
      Object.keys(videos).map(k => {
        videos[k].isPlay=false
        
      })
      this.setState({topVideos:videos})
    })
  }


  getFeedData() {
    console.warn(videos.length)
    if (videos.length == 0) {
      this.setState({ isVideoLoading: true })
    }
    let data = {};
    let formData = new FormData();
    AsyncStorage.getItem('userId').then((value) => {
      if (value !== null) {
        const { id, token } = JSON.parse(value);
        this.setState({ userId: id, token: token })
        formData.append("user_id", id);
        data = { param: "api/users/top_videos", formData: formData }
        postWithJwt(data, token).then(res => {
          console.warn("res====",res)
          videos = [];
          if (res != undefined) {
            if (res.ack == 1) {
              Object.keys(res.details).map(k => {
                videos.push(Object.assign(res.details[k], { isBuffering: true, isPlay: false }));
              })
              AsyncStorage.setItem('switchLogin', JSON.stringify(false));
              // AsyncStorage.setItem('switchLogin',JSON.stringify({status:false}));
            }
          }
          this.setState({ topVideos: videos, isVideoLoading: false, isFetching: false });
        })
          .catch(error => {
            this.setState({ isVideoLoading: false, isFetching: false });
          })

      }
    })
  }


  handleViewableItemsChanged(info) {

    Object.keys(videos).map(k => {
      videos[k].isPlay = false;
    })
    if (info.viewableItems[0] != undefined) {
      videos[info.viewableItems[0].index].isPlay = true;
      let formData = new FormData();
      formData.append('user_id', this.state.userId);
      formData.append('feed_id', videos[info.viewableItems[0].index].id);
      const data = { param: "api/users/view_count", formData: formData }
      postWithJwt(data, this.state.token).then(res => {
        if (res.ack == 1) {
          videos[info.viewableItems[0].index].view_count = videos[info.viewableItems[0].index].view_count + 1
        }
      }).catch(error => console.warn("Error", error))
      this.setState({ topVideos: videos });
    }

  }


  //  call for like video

  onLike(item) {
    let index = videos.indexOf(item);
    if (item.isLike == 1) {
      videos[index].isLike = 0;
      videos[index].like_count = videos[index].like_count - 1
    }
    else if (item.isLike == 0) {
      videos[index].isLike = 1;
      videos[index].like_count = videos[index].like_count + 1
    }
    this.setState({ topVideos: videos })

    try {
      SoundPlayer.playSoundFile('like', 'mp3')
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
    AsyncStorage.getItem('userId').then((val) => {
      let data = {}
      const { id, token } = JSON.parse(val);
      let formData = new FormData();
      formData.append("user_id", id)
      formData.append("feed_id", item.id)
      if (item.isLike == 1) {
        formData.append("status", 1);
      }
      else {
        formData.append("status", 0);
      }
      data = { param: "api/users/like", formData: formData };

      postWithJwt(data, token).then(res => {
        if (res.ack == 0 && item.isLike == 1) {
          videos[index].isLike = 0;
          videos[index].like_count = videos[index].like_count - 1
        }
        else if (res.ack = 0 && item.isLike == 0) {
          videos[index].isLike = 1;
          videos[index].like_count = videos[index].like_count + 1
        }
        this.setState({ topVideos: videos })
      }).catch(error => {
        if (item.isLike == 1) {
          videos[index].isLike = 0;
          videos[index].like_count = videos[index].like_count - 1
        }
        else if (item.isLike == 0) {
          videos[index].isLike = 1;
          videos[index].like_count = videos[index].like_count + 1
        }
        this.setState({ topVideos: videos })
      })
    })
  }


  getItemLayout(data, index) {
    return (
      {
        length: Dimensions.get('screen').height - 240,
        offset: Dimensions.get('screen').height * index,
        index
      }
    );
  }


  // Call when video source url loaded and ready to play
  onLoad(data) {
    this.player.seek(0);
    let index = videos.indexOf(data);
    if (videos[index] != undefined) {
      videos[index].isBuffering = false;
      this.setState({ topVideos: videos });
    }

  }

  //Pull to refresh function
  onRefresh() {
    this.setState({ isFetching: true });
    this.getFeedData();
  }


  // call when video start buffering 
  onBuffering(src) {
    if (src.play == true) {
      let index = videos.indexOf(src);
      videos.map((video) => {
        video.isBuffering = false;
      })
      videos[index].play = true;
      this.setState({ topVideos: videos });
    }
  }


  // call to view specific video
  gotoView(src) {
    this.props.navigation.navigate('video', { src: src });
  }


  //  Call to subscribe competition
  gotoSubscribe() {
    this.props.navigation.navigate('CompetitionList')
  }

  // Call to Play or View video
  gotToView(user) {
    this.props.navigation.navigate('userDetails', { user });
  }


  onViewOption(item) {
    this.setState({ visible: true, blockUser: item });
  }

  onBlock(user) {
    console.warn(user);
    let formData = new FormData();
    formData.append('user_id', this.state.userId);
    formData.append('blocked_id', user.user_id);
    const data = { param: "api/users/userBlock", formData: formData }
    console.warn(data);
    this.setState({ isBlocking: true })
    postWithJwt(data, this.state.token).then(res => {
      console.warn(res);
      this.setState({ isBlocking: false, isBlock: false, visible: false })
      this.getFeedData();
    })
  }

  onReport(type, user) {
    console.warn(user);
    let formData = new FormData();
    formData.append('user_id', this.state.userId);
    formData.append('report_user_id', user.user_id)
    formData.append('message', type);
    const data = { param: "api/users/userReport", formData: formData }
    console.warn(data);
    this.setState({ isBlocking: true })
    postWithJwt(data, this.state.token).then(res => {
      this.setState({ isReport: false, isBlocking: false, isBlock: false, visible: false })
      this.getFeedData();
    })
  }


  onShare(item, social) {
    const shareOptions = {
      title: item.title,
      message: 'TruStar video',
      url: FILE_URL + item.original_video,
      social: social
    };

    Share.shareSingle(shareOptions);
  }


  renderRow(item, index) {
    return (
      <View style={styles.container}>
      

        <View style={styles.card}>
          {
            (item.user != undefined) && (
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.gotToView(item.user)} style={styles.topUserInfo}>
                  <Image style={styles.userImg} source={{ uri: FILE_URL + item.user.user_image }} />
                  <View>
                    <Text style={mainStyles.blackColor}>{item.user.first_name + " " + item.user.last_name}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onViewOption(item)}>
                  <Text style={{ marginRight: 10, fontSize: 18, fontWeight: '500' }}>...</Text>
                </TouchableOpacity>
              </View>
            )
          }
          <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.setState({ isMute: !this.state.isMute })}>
            {(item.video_type == 'R') && (
              <Video
                source={{ uri: FILE_URL + item.original_video }}
                ref={(ref) => {
                  this.player = ref
                }}
                poster={FILE_URL +item.youtube_thumb}
                posterResizeMode="cover"
                preventsDisplaySleepDuringVideoPlayback={true}
                disableFocus={true}
                rate={this.state.rate}
                repeat={true}
                resizeMode="cover"
                style={{
                  width: this.state.screenWidth,
                  height: this.state.heightScaled,
                  backgroundColor: '#212121',
                }}
                onLoad={response => {
               
                }}
                paused={!item.isPlay}
                onError={(err) => console.warn('error', err)}
                muted={this.state.isMute}
              />
            )}

            {(item.video_type == 'Y') && (
              <View style={{ width: '100%', height: (Dimensions.get('window').height * 50) / 100 }}>
                <WebView
                  useWebKit={true}
                  startInLoadingState={true}
                  originWhitelist={['*']}
                  ref={(ref) => { this.videoPlayer = ref; }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: item.original_video + '?rel=0&modestbranding=0&autohide=0&showinfo=0&controls=1' }}
                  allowsInlineMediaPlayback={true}


                />
              </View>
            )}
            {!item.isPlay && (
              <TouchableOpacity style={{ position: "absolute", alignSelf: 'center' }} onPress={() => this.setState({ isMute: !this.state.isMute })}>
                <EvilIcons name='play' size={90} color="#fff" />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10, padding: 10 }} onPress={() => this.setState({ isMute: !this.state.isMute })}>
              <Feather name={this.state.isMute ? "volume-x" : "volume-2"} size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onLike(item)}>
              {(item.isLike == 1) && (
                <Icons name="heart" size={25} color="#ffc107" />
              )}
              {(item.isLike == 0) && (
                <AntDesign name="hearto" size={25} />
              )}

            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(item, Share.Social.FACEBOOK)}>
              <Feather name="facebook" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(item, Share.Social.INSTAGRAM)}>
              <Feather name="instagram" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(item, Share.Social.TWITTER)}>
              <Feather name="twitter" size={25} />
            </TouchableOpacity>

            <Text style={styles.viewText}>{item.view_count == null ? 0 : item.view_count} views</Text>
          </View>
          {item.like_count > 0 && (
            <Text style={styles.likesText}>{item.like_count} Likes</Text>

          )}
          <Text style={mainStyles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={mainStyles.description} numberOfLines={4}>{item.description}</Text>
        </View>

        <Modal
          transparent={true}
          visible={this.state.visible}>
          <View style={modalStyles.modal}>
            {!this.state.isBlock && !this.state.isBlocking && !this.state.isReport && (
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => this.setState({ isBlock: true })} style={styles.modalList}>
                  <Text style={styles.modalListtext}>Block</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => this.setState({ isReport: true })}>
                  <Text style={styles.modalListtext}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ isReport: false, isBlock: false, visible: false })}>
                  <Text style={styles.modalListtext}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {this.state.isBlock && !this.state.isBlocking && !this.isReport && (
              <View style={styles.modalContainer}>
                <Text style={[styles.modalListtext, { margin: 10 }]}>Are you sure you want to block {this.state.blockUser.user.first_name + " " + this.state.blockUser.user.last_name} ?</Text>
                <Text>{this.state.blockUser.user.first_name + " " + this.state.blockUser.user.last_name} will no longer be able to:</Text>
                <Text>See things you post on your feed</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ isReport: false, isBlock: false, visible: false })}>
                    <Text>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => this.onBlock(this.state.blockUser)}>
                    <Text>BLOCK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {this.state.isBlocking && (
              <View style={{ width: '90%', backgroundColor: '#fff', padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <ActivityIndicator size='small' color={constantData.colors.primary} />
                <Text style={{ marginLeft: 10 }}>{this.state.isBlock ? 'Blocking...' : 'Reporting...'}</Text>
              </View>

            )}

            {this.state.isReport && !this.state.isBlocking && (
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => this.onReport("It's Spam", this.state.blockUser)} style={styles.modalList}>
                  <Text style={styles.modalListtext}>It's Spam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => this.onReport("It's inappropriate", this.state.blockUser)}>
                  <Text style={styles.modalListtext}>It's inappropriate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ isReport: false, isBlock: false, visible: false })}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>

            )}




          </View>
        </Modal>
      </View>
    );
  }


  render() {

    return (
      <SafeAreaView>
        <View style={styles.mainContainer}>
          <View>
            <Image
              style={styles.sliderImg}
              source={require('../../assets/newBanner/mohit2.png')}
              resizeMode="contain"
            />

<View style={styles.videoHeader}>
            <Text style={styles.titleText}>Top videos</Text>
            <TouchableOpacity
              onPress={() => this.gotoSubscribe()}
              style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Register Now</Text>
            </TouchableOpacity>
          </View>
         
            
          </View>

          {this.state.isVideoLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={constantData.colors.primary} />
            </View>
          )}
          {/* {!this.state.isVideoLoading && (this.state.topVideos.length == 0) && (
          <View style={styles.loaderContainer}>
            <Text>No Video Found</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={()=>this.getFeedData()}>
              <MaterialCommunityIcons size={40} name="reload" color={constantData.colors.primary} />
              </TouchableOpacity>
          </View>
        )} */}
          {!this.state.isVideoLoading && (this.state.topVideos.length == 0) && (
            <View style={styles.loaderContainer}>
              <Image source={require('../../assets/Images/internet-bg.png')} style={{ width: '100%', height: 200, marginTop: 80 }} />
              <Text style={{ fontSize: 18, marginTop: 15 }}>Feed not found</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}>Increase your follower to see more feed</Text>
              <TouchableOpacity style={styles.refreshButton} onPress={() => this.getFeedData()}>
                <MaterialCommunityIcons size={20} name="reload" color="#fff" />
                <Text style={{ fontSize: 20, color: '#fff', marginLeft: 10 }}>Reload</Text>
              </TouchableOpacity>
            </View>
          )}
          {!this.state.isVideoLoading && (
            <FlatList
              data={this.state.topVideos}
              extraData={this.state}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              ref={ref => (this.flatList = ref)}
              onViewableItemsChanged={this.handleViewableItemsChanged}
              viewabilityConfig={this.viewabilityConfig}
              renderItem={({ item, index }) =>
                this.renderRow(item, index)
              }
              keyExtractor={(item, index) => index.toString()}
            />
          )}

        </View>
      </SafeAreaView>
    );
  }
}



