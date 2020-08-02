import React, { Component } from 'react';
import { View, Text, FlatList, Share, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Dimensions } from 'react-native';
import styles from './styles';

import {  postWithJwt, FILE_URL } from '../../JS/service'
import AsyncStorage from '@react-native-community/async-storage';
import constantData from '../../JS/constant';
import mainStyles from '../../mainStyles';

import Image from 'react-native-fast-image';


let lists = [];
export default class ExploreScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,



    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.navigation.addListener('willFocus', (route) => {
      this.getExplore()
    })
  }

  getExplore() {
    AsyncStorage.getItem('userId').then(value => {
      let { id, token } = JSON.parse(value);
      let formData = new FormData();
      formData.append('user_id', id);
      let data = { param: 'api/users/feedListUnfollow', formData: formData };
      postWithJwt(data, token).then(res => {
        console.warn('resexp',res);
        if (res != undefined) {
          if (res.ack == 1) {
            this.setState({ list: res.list, isLoading: false });
          }
          else {
            this.setState({ isLoading: false });
          }
        }

      })
    })
  }

  gotToView(user) {
    this.props.navigation.navigate('userDetails', { user });
  }



  renderRow(item, index) {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => this.gotToView(item)} style={styles.topUserInfo}>
          <Image style={styles.userImg} source={{ uri: FILE_URL + item.user_image }} />
          <View>
            <View>
              <Text style={mainStyles.blackColor}>{item.name}</Text>
              {/* {item.aboutme && (item.aboutme != "null") && ( */}
              <Text style={[mainStyles.description, { marginLeft: 0 }]}>{item.aboutme}</Text>
              {/* )} */}
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => this.gotToView(item)} style={styles.topUserInfo}>
					<Image style={styles.userImg} source={{ uri: FILE_URL + item.user_image }} />
					<View>
						<View>
							<Text style={mainStyles.blackColor}>{item.name}</Text>
							{item.aboutme && (item.aboutme != "null") && (
								<Text style={[mainStyles.description, { marginLeft: 0 }]}>{item.aboutme}</Text>
							)}
						</View>
					</View>
				</TouchableOpacity> */}

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.videoContainer}>
          {item.feeds.map((src) => {
            return (
              <View style={styles.container}>
                {/* {(src.video_type == 'R') && (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('video', { src: src })}>

                    <Video
                      source={{ uri: FILE_URL + src.original_video }}
                      ref={(ref) => {
                        this.player = ref
                      }}
                      resizeMode="cover"
                      paused={true}
                      style={styles.thumbnail}
                    />

                  </TouchableOpacity>

                )} */}
                {/* {(src.video_type == 'Y') && ( */}
                  <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('video', { src: src })}>

                    <Image
                      source={{ uri: FILE_URL + src.youtube_thumb }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />

                  </TouchableOpacity>

                {/* )} */}


              </View>
            )


          })
          }
        </ScrollView>



      </View>
    );
  }

  render() {

    return (
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Explore</Text>
        </View>
        {this.state.isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </View>
        )}
        {!this.state.isLoading && (this.state.list.length == 0) && (
          <View style={styles.loaderContainer}>
            <Text>No Video Found</Text>
          </View>
        )}
        {!this.state.isLoading && (
          <FlatList
            data={this.state.list}
            extraData={this.state}
            onRefresh={() => this.getExplore()}
            refreshing={this.state.isLoading}
            ref={ref => (this.flatList = ref)}
            renderItem={({ item, index }) =>
              this.renderRow(item, index)
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}


      </View>
    )
  }
}