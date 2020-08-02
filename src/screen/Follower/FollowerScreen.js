import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TextInput
} from 'react-native';
import styles from './styles';
import constantData from '../../JS/constant';
import AsyncStorage from '@react-native-community/async-storage';
import { postWithJwt, API_URL, FILE_URL } from '../../JS/service';


let followLists = [];


export default class FollowerScreen extends Component {

  static navigationOptions = {
    header: null,
    title: 'dsfsd'
  }

  constructor(props) {
    super(props);
    this.state = {
      follows: followLists,
      isFollow: false,
      modalVisible: false,
      isLoading: true,
      userId: '',
      unFollowItem: {},
      index: '',
      token: ''
    }
  }


  // Call to update follow status

  onFollow(item) {

    let index = followLists.indexOf(item);

    console.warn(index);
    if (item.following == 0) {
      followLists[index].following = 1;
      this.setState({ follows: followLists });
      const formData = new FormData();
      formData.append('user_id', this.state.userId);
      formData.append('follower_id', item.id);
      const data = { param: "api/users/follow", formData: formData }
      if(item.id != null && item.id!=undefined){
        postWithJwt(data, this.state.token).then(res => {
          if (res != undefined) {
            if (res.ack == 0) {
              followLists[index].following = 0;
              this.setState({ follows: followLists });
            }
          }
          else {
            followLists[index].following = 0;
            this.setState({ follows: followLists });
          }
  
        }).catch(err => {
          followLists[index].following = 0;
          this.setState({ follows: followLists });
        })
      }
      else{
        followLists[index].following = 0;
        this.setState({ follows: followLists });
      }
   
    }
    else if (item.following == 1) {
      this.setState({ unFollowItem: item, modalVisible: true, index: index })
    }
  }


  // call to unfollow any specific user
  onUnfollow() {
    followLists[this.state.index].following = 0;
    this.setState({ follows: followLists, modalVisible: false });
    const formData = new FormData();
    formData.append('user_id', this.state.userId);
    formData.append('follower_id', this.state.unFollowItem.id);
    const data = { param: "api/users/follow", formData: formData }
    if(this.state.unFollowItem.id != null && this.state.unFollowItem.id != undefined){
      postWithJwt(data, this.state.token).then(res => {
        if (res != undefined) {
          if (res.ack == 0) {
            followLists[this.state.index].following = 1;
            this.setState({ follows: followLists, modalVisible: false, unFollowItem: {}, index: '' });
          }
        }
        else {
          followLists[this.state.index].following = 1;
          this.setState({ follows: followLists, modalVisible: false, unFollowItem: {}, index: '' });
        }
  
      }).catch(err => {
        followLists[this.state.index].following = 1;
        this.setState({ follows: followLists, modalVisible: false, unFollowItem: {}, index: '' });
      })
    }
    else{
      this.setState({ follows: followLists, modalVisible: false, unFollowItem: {}, index: '' });
    }
   
  }


  // Call after the component is rendered correctly
  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
      followLists = this.state.follows;
      AsyncStorage.getItem('userId').then((value) => {
        if (value !== null) {
          const { id, token } = JSON.parse(value);
          this.setState({ userId: id, token: token })
          const formData = new FormData();
          formData.append('user_id', id);
          const data = { param: "api/users/user_list", formData: formData };
          postWithJwt(data, token).then(res => {
            if (res != undefined) {
              followLists = res.userlist;
              console.warn(res.userlist);
              this.setState({ follows: followLists, isLoading: false });
            }
          })
        }
      })
    });
  }


  // call to navigate profile to view details

  gotoUserProfile(user) {
    this.props.navigation.navigate('userDetails', { user });
  }


  // Call to filter data based on user search input
  onSearch(text) {
    let val = text.toLowerCase();
    let matches = followLists.filter(v => (v.first_name+' '+v.last_name).toLowerCase().includes(val));
    if (text == "" || text == undefined || text == null) {
      this.setState({ follows: followLists })
    } else {
      this.setState({ follows: matches })
    }
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Follow</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search..."
            onChangeText={(text) => this.onSearch(text)}
            style={styles.input}
            returnKeyType="done"
          />
        </View>
        {(this.state.follows.length == 0 && !this.state.isLoading) && (
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:16,fontWeight:'400'}}> No user found</Text>
          </View>
        )}
        <ScrollView style={styles.mainContainer}>
          {
            this.state.follows.map((item, index) => (
              <TouchableOpacity onPress={() => this.gotoUserProfile(item)} style={styles.listStyle}>
                <View style={styles.listContainer}>
                  <Image source={{ uri: FILE_URL + item.user_image }} style={styles.image} />
                  <Text style={styles.text}>{item.first_name + " " + item.last_name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.onFollow(item)}
                  style={[styles.followButton, { backgroundColor: `${item.following == '1' ? constantData.colors.primary : '#fff'}` }]}>
                  <Text style={[styles.followText, { color: `${item.following == '1' ? '#fff' : constantData.colors.primary}` }]}>{item.following == '1' ? "Following" : "Follow"}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        {this.state.isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </View>
        )}

        <Modal animationType={"fade"} transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ visible: false }) }}>

          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: FILE_URL + this.state.unFollowItem.user_image }} style={styles.image} />
              <Text style={styles.userName}>Unfollow@{this.state.unFollowItem.first_name + " " + this.state.unFollowItem.last_name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ modalVisible: false })}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this.onUnfollow()}>
                  <Text>Unfollow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    )
  }

}

