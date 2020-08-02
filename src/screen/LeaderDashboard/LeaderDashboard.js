import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../component/Header';
import constantData from '../../JS/constant';
import { post, API_URL, postWithJwt, FILE_URL } from '../../JS/service';
import styles from './styles';
import mainStyles from '../../mainStyles'
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';


export default class LeaderDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({ isLoading: true })
      database().ref('/isRefresh').on('value', snapshot => {
      AsyncStorage.getItem('userId').then((value) => {
        if (value != null) {
          let data = {};
          let formData = new FormData();
          const { id, token } = JSON.parse(value);
          formData.append("user_id", id);
          formData.append("competition_id", this.props.navigation.state.params.image.competition_id);
          data = { param: "api/users/leaderBoardUser", formData: formData }
          postWithJwt(data, token).then(res => {
            if (res != undefined) {
              console.warn(res)
              this.setState({ userList: res.userList, isLoading: false });
            }
            else {
              this.setState({ isLoading: false });
            }

          })
            .catch(error => {
              console.warn(error)
              this.setState({ isLoading: false });
            })

        }
      })
    })
    })
  }

  gotoViewProfile(user) {
    this.props.navigation.navigate('userDetails', { user });
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* <Header title="Top Competitors" {...this.props} page="leader" /> */}
        {this.state.isLoading && (
          <View style={styles.main}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </View>
        )}
        {!this.state.isLoading && this.state.userList.length == 0 && (
          <View style={styles.main}>
            <Text>No User Found </Text>
          </View>
        )}
        {!this.state.isLoading && (
          <FlatList
            data={this.state.userList}
            extraData={this.state}
            refreshing={this.state.isLoading}
            renderItem={({ item,index }) =>
              <TouchableOpacity style={styles.card} onPress={() => this.gotoViewProfile(item)}>
              <Text style={{marginRight:5,fontSize:16}}>{index+1}.</Text>
                <Image style={styles.userImg} source={{ uri: FILE_URL + item.user_image }} />
                <View style={{width:'70%'}}>
                  <Text style={mainStyles.title}>{item.first_name+" "+item.last_name}</Text>

                <View style={styles.followDetails}>
                <View style={styles.textContainer}> 
                    <Text style={styles.value}>{item.likes}</Text>
                    <Text style={styles.text}>votes</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.value}>{item.feeds}</Text>
                    <Text style={styles.text}>posts</Text>
                  </View>
              
                  <View style={styles.textContainer}>
                    <Text style={styles.value}>{item.views}</Text>
                    <Text style={styles.text}>views</Text>
                  </View>
                </View>
                </View> 
                

              </TouchableOpacity>

            }
          />
        )}


      </View>
    )
  }
}

