import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import WebView from 'react-native-webview';
import styles from './styles';
import Video from 'react-native-video';
import Icons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, FILE_URL, get, postWithJwt } from '../../JS/service';
import mainStyles from '../../mainStyles';
import Share from 'react-native-share';
import Image from 'react-native-fast-image'


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      resizeMode: 'stretch',
      isBuffering: true,
      isPaused: true,
      userId: '',
      original_video: '',
      id: '',
      title: '',
      description: '',
      like_count: '',
      is_follow: '',
      view_count: 0,
      isMute: true,
      follow_count: 0
    }

    AsyncStorage.getItem('userId').then(value => {
      this.setState({ userId: value });
    })
  }


  // Call after the component is rendered correctly

  componentDidMount() {
    console.warn(this.props);
    this.setState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.warn("props update", nextProps);
    AsyncStorage.getItem('userId').then((value) => {
      if (value !== null) {
        const { id, token } = JSON.parse(value);
        let data = {};
        let formData = new FormData();
        formData.append("user_id", id);
        data = { param: "api/users/competition_feed_list", formData: formData }
        postWithJwt(data, token).then(res => {
          console.log("competition list===",res)
          Object.keys(res.details).map(k => {
            if (res.details[k].id == this.props.id) {
              this.setState(res.details[k])
            }
          })
        }).catch(err => console.warn("err", err))
      }
    })
  }

  componentWillUnmount() {
    this.setState({ paused: true });
  }


  //Call when video source loaded and ready to play
  onLoad() {
    this.setState({ isBuffering: false });
    this.player.seek(0);
    AsyncStorage.getItem('userId').then((val) => {
      const { id, token } = JSON.parse(val);
      let formData = new FormData();
      formData.append('user_id', id);
      formData.append('feed_id', this.props.id);
      const data = { param: "api/users/view_count", formData: formData }
      postWithJwt(data, token).then(res => {
        if (res.ack == 1) {
          this.setState({ view_count: this.state.view_count + 1 });
        }
      }).catch(error => console.warn("Error", error))
    })
  }


  onView() {
    AsyncStorage.getItem('userId').then((val) => {
      const { id, token } = JSON.parse(val);
      let formData = new FormData();
      formData.append('user_id', id);
      formData.append('feed_id', this.props.id);
      const data = { param: "api/users/view_count", formData: formData }
      postWithJwt(data, token).then(res => {
        if (res.ack == 1) {
          this.setState({ view_count: this.state.view_count + 1 });
        }
      }).catch(error => console.warn("Error", error))
    })
  }


  // Call when video end and change
  onEnd() {
    this.setState({ paused: !this.state.paused });
  }

  // Call To view user profile
  gotToView(user) {
    this.props.navigation.navigate('userDetails', { user });
  }

  // Call when user hit share button to share on social media
  onShare(social) {
    const shareOptions = {
      title: 'TruStar',
      message: '',
      url: FILE_URL + this.props.original_video,
      social: social
    };

    Share.shareSingle(shareOptions);
  }




  render() {
    return (
      <View style={styles.card}>
        {
          (this.props.user != undefined) && (
            <View style={styles.viewCount}>
              <TouchableOpacity style={styles.userInfo} onPress={() => this.gotToView(this.props.user)}>
                <Image style={styles.userImg} source={{ uri: FILE_URL + this.props.user.user_image }} />
                <View>
                  <Text style={mainStyles.blackColor}>{this.props.user.first_name + " " + this.props.user.last_name}</Text>
                </View>
              </TouchableOpacity>

            </View>
          )
        }
        {(this.props.video_type == 'R') && (
          <TouchableOpacity onPress={() => this.setState({ isMute: !this.state.isMute })}>
            <Video source={{ uri: FILE_URL + this.props.original_video }}
              ref={(ref) => {
                this.player = ref
              }}
              repeat={true}
              resizeMode={this.state.resizeMode}
              preventsDisplaySleepDuringVideoPlayback={false}
              playInBackground={false}
              playWhenInactive={false}
              paused={this.props.isPaused}
              rate={this.state.rate}
              onLoad={() => this.onLoad()}
              onEnd={() => this.onEnd()}
              onError={err => requestAnimationFrame(() => {
                console.warn(err);
              })}
              muted={this.state.isMute}
              style={styles.thumbnail}
            />
            <TouchableOpacity
              style={styles.backGroundLayer}
              onPress={() => this.setState({ isMute: !this.state.isMute })}>
              <Feather name={this.state.isMute ? "volume-x" : "volume-2"} size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.iconContainer}>

              {this.state.isBuffering && (
                <ActivityIndicator
                  color="#fff"
                  size="small"
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        {(this.props.video_type == 'Y') && (
          <TouchableOpacity style={{ width: '100%', height: '70%' }} onPress={() => this.onView()}>
            <WebView
              ref={(ref) => { this.videoPlayer = ref; }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: this.props.original_video + '?rel=0&modestbranding=0&autohide=0&showinfo=0&controls=1' }}
              useWebKit={true}
              originWhitelist={['*']}
              allowsInlineMediaPlayback={true}
            />
          </TouchableOpacity>
        )}
        <View style={styles.iconButtonContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <Text style={styles.value}>{this.state.like_count}</Text>
              <Text style={styles.text}>Votes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Text style={styles.value}>{(this.state.view_count == null || undefined) ? 0 : this.state.view_count}</Text>
              <Text style={styles.text}>Views</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(Share.Social.FACEBOOK)}>
              <Feather name="facebook" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(Share.Social.INSTAGRAM)}>
              <Feather name="instagram" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => this.onShare(Share.Social.TWITTER)}>
              <Feather name="twitter" size={25} />
            </TouchableOpacity>
          </View>

        </View>
        <Text style={styles.text}>{this.state.title}</Text>

        <Text style={styles.description}>{this.state.description}</Text>
      </View>
    )
  }
}


class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text style={{ fontSize: 20 }}>No more cards</Text>
      </View>
    )
  }
}


let cards = [];
let cards2 = [];
let userId = '';
let saveToken = ''

export default class CompetitionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      userId: '',
      isLoading: true,
      competitionImage: [{ image: "" }],
      isPaused: false,
    }
  }

  handleYup(card) {
    let data = {}
    let formData = new FormData();
    formData.append("user_id", userId)
    formData.append("feed_id", card.id)
    formData.append("status", 1);
    data = { param: "api/users/like", formData: formData };
    postWithJwt(data, saveToken).then(res => {
    })
  }

  handleNope(card) {
    let data = {}
    let formData = new FormData();
    formData.append("user_id", userId)
    formData.append("feed_id", card.id)
    formData.append("status", 0);
    data = { param: "api/users/like", formData: formData };
    postWithJwt(data, saveToken).then(res => {
    })
  }



  componentDidMount() {
    AsyncStorage.getItem('userId').then((value) => {
      if (value !== null) {
        const { id, token } = JSON.parse(value);
        this.setState({ token: token });
        userId = id;
        saveToken = token
        let data = {};
        let formData = new FormData();
        formData.append("user_id", id);
        data = { param: "api/users/competition_feed_list", formData: formData }
        postWithJwt(data, token).then(res => {
          console.warn("res", res);
          cards = res.details;

          this.setState({ cards: cards });
          this.render();
        }).catch(err => console.warn("err", err))
      }
    })
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ isPaused: false });
    })

    this.props.navigation.addListener('didBlur', () => this.setState({ isPaused: true }));
  }



  //  Call to subscribe competition
  gotoSubscribe() {
    this.props.navigation.navigate('CompetitionList')
  }




  render() {
    return (

      <View style={{ flex: 1 }}>
        <View>
          <Image
            style={styles.sliderImg}
            source={require('../../assets/newBanner/moht.png')}
            resizeMode="contain"
          />
       

        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:10}}>
        
        <TouchableOpacity style={[styles.subscribeButton,{width:120,backgroundColor:'#fff' }]} onPress={() => this.props.navigation.navigate('leaderDashboard')}>
          <Text style={styles.textColor}>LeaderBoard</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.gotoSubscribe()}
            style={[styles.subscribeButton,{backgroundColor: "#d50000"}]}>
            <Text style={styles.subscribeText}>Register Now</Text>
          </TouchableOpacity>
      
        </View>

        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData}  {...this.props} isPaused={this.state.isPaused} />}
          yupText="Vote"
          showYup={true}
          loop={true}
          showNope={true}
          smoothTransition={true}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          onClickHandler={() => console.log('click')}
        />
      </View>
    )
  }

}





