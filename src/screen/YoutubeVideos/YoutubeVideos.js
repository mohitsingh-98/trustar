import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Modal, ActivityIndicator, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import mainStyles from '../../mainStyles';
import modalStyles from '../Follower/styles';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import constantData from '../../JS/constant';
import { postWithJwt } from '../../JS/service';
import moment from 'moment';


export default class YoutubeVideos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      authToken: '',
      videos: [],
      isReady: false,
      status: '',
      error: '',
      modalVisible: false,
      userId: '',
      titile: '',
      description: '',
      videoId: '',
      thumbnails: {},
      isProgress: false,
      isLoading: true,
      is_competition:0

    }

  }

  componentDidMount() {

    this.props.navigation.addListener('willFocus', (route) => {
      AsyncStorage.getItem('userId').then((value) => {
        if (value !== null) {
          const { id, token,is_competition } = JSON.parse(value);
          this.setState({ userId: id, authToken: token,is_competition:is_competition });
        }
      })
      this.getYoutubedetails(this.props.navigation.state.params.token);
    })
  }



  getYoutubedetails(token) {
    const key = 'AIzaSyDNv_aNAUQsFA2gVRZUpxOV0H-pPXGtciI';
    let URL = 'https://www.googleapis.com/youtube/v3/activities';

    let options = {
      key: key,
      part: 'snippet',
      mine: true
    };
    URL += '?' + Object.keys(options).map((k) => k + '=' + options[k]).join('&');
    console.warn(URL);
    fetch(URL, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => res.json())
      .then(data => {
        console.warn(data.items)
        this.setState({ videos: data.items || [], isLoading: false })

      })
      .catch(err => console.warn("error", err))
  }

  gotoUpload(item) {
    this.setState({ title: item.snippet.title, imgurl: item.snippet.thumbnails.default.url, description: item.snippet.description, thumbnails: item.snippet.thumbnails, modalVisible: true });
  }



  onUpload() {
    let x = this.state.thumbnails.default.url.split('https://i.ytimg.com/vi/');
    let id = x[1].split('/');
    this.setState({ isProgress: true })
    let formData = new FormData();
    formData.append('user_id', this.state.userId)
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('video_type', 'Y')
    formData.append('youtube_thumb', this.state.imgurl)
    formData.append('original_video', 'https://www.youtube.com/embed/' + id[0]);
    formData.append('feed_type', this.state.is_competition == 0 ? "G" : "C");
    const data = { param: "api/users/saveVideo", formData: formData }

    console.warn('data', data);
    postWithJwt(data, this.state.authToken).then(res => {
      if (res.ack == 1) {
        this.setState({ isProgress: false, modalVisible: false });
        this.props.navigation.navigate('Profile');
      }
    }).catch(error => {
      console.warn(error)
      this.setState({ isProgress: false, modalVisible: false });
    })

  }





  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.videos}
          extraData={this.state}
          refreshing={this.state.isLoading}
          ref={ref => (this.flatList = ref)}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => this.gotoUpload(item)} style={styles.listContainer}>
              <Image
                source={{ uri: item.snippet.thumbnails.default.url }}
                style={styles.profileImg}
                resizeMode="cover"
              />
              <View style={styles.textStyle}>
                <Text style={[mainStyles.title, { fontSize: 18 }]} numberOfLines={2}>{item.snippet.title}</Text>
                {(item.snippet.description != '') && (
                  <Text style={[mainStyles.description, { fontSize: 14 }]} numberOfLines={2}>{item.snippet.description}</Text>

                )}
                <Text style={[mainStyles.description, { fontSize: 12, marginTop: 5 }]}> {moment(item.snippet.publishedAt).format('DD-MM-YYYY')}</Text>
              </View>

            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
        />


        {(this.state.videos.length == 0 && !this.state.isLoading) && (
          <Text style={{ textAlign: 'center' }}>No video found</Text>
        )

        }


        <Modal animationType={"fade"} transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ visible: false }) }}>

          <View style={modalStyles.modal}>
            {this.state.isProgress && (
              <View style={modalStyles.modalContainer}>
                <ActivityIndicator color={constantData.colors.primary} size="large" />
                <Text style={styles.modalLoaderText}>Please wait ...</Text>
              </View>
            )}
            {!this.state.isProgress && (
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.userName}>Do you want to upload?</Text>
                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity style={modalStyles.modalButton} onPress={() => this.setState({ modalVisible: false })}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={modalStyles.modalButton} onPress={() => this.onUpload()}>
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </View>
        </Modal>


      </ScrollView>
    )
  }
} 