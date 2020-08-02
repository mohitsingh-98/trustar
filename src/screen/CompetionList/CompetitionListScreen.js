import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import constantData from '../../JS/constant';
import { postWithJwt, API_URL, FILE_URL } from '../../JS/service';
import styles from './styles';
import Carousel from 'react-native-banner-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;

export default class CompetitionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      competitionList: [],
      isRegister: 0,
      isFetching: true
    }
  }

  componentDidMount() {
    let data = {};
    let formData = new FormData();
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ isFetching: true });

      database().ref('/isRefresh').on('value', snapshot => {

        AsyncStorage.getItem('userId').then((value) => {
          if (value !== null) {
            const { id, token } = JSON.parse(value)
            formData.append("user_id", id);
            data = { param: "api/users/competitionList", formData: formData }
            postWithJwt(data, token).then(res => {
              console.warn(res);
              if (res != undefined) {
                this.setState({ competitionList: res.details, isRegister: res.isRegister, isFetching: false });
              }
              else {
                this.setState({ isFetching: false });
              }
            }).catch(err => {
              this.setState({ isFetching: false });
            })
          }
        })
      })
    })

  }


  gotoSubscribe(image) {
    this.props.navigation.navigate('Subscribe', { image: image, isRegister: this.state.isRegister })
  }



  renderPage(image, index) {
    return (
      <View key={index}>

        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: FILE_URL + image.original_image }} />
      </View>
    );
  }

  makeCrousel(image, index) {
    return (
      <View style={styles.crouselContain}>

        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {image.competitionimages.map((image, index) => this.renderPage(image, index))}
        </Carousel>
        {image.competitionimages.length > 0 && this.state.isRegister == 0 && (
          <TouchableOpacity
            onPress={() => this.gotoSubscribe(image)}
            style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Register Now</Text>
          </TouchableOpacity>
        )}
        {image.competitionimages.length > 0 && this.state.isRegister == 1 && (
          <TouchableOpacity
            onPress={() => this.gotoSubscribe(image)}
            style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>View Details</Text>
          </TouchableOpacity>
        )}

      </View>
    )
  }


  render() {
    return (
      <ImageBackground
        source={require('../../assets/Images/appBackground.png')}
        style={styles.container}>
        <Image
          style={styles.sliderImg}
          source={require('../../assets/newBanner/mohit2.png')}
        />
        {this.state.competitionList.length != 0 && !this.state.isFetching && (
          <FlatList
            data={this.state.competitionList}
            extraData={this.state}
            refreshing={this.state.isFetching}
            renderItem={({ item, index }) =>

              <View>
                {this.makeCrousel(item, index)}
              </View>

            }
          />
        )}

        {this.state.competitionList.length == 0 && !this.state.isFetching && (

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, letterSpacing: 1, color: 'grey' }}>Competition not found!</Text>
          </View>
        )}

        {this.state.isFetching && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </View>
        )}

      </ImageBackground>
    )
  }
}