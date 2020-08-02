import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, } from 'react-native';
import styles from '../Follower/styles'
import { postWithJwt, API_URL,FILE_URL } from '../../JS/service';
import constantData from '../../JS/constant';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../component/Header';

let followLists = [];
export default class FollowingUser extends Component {



	
	constructor(props) {
		super(props)
		this.state = {
			follows: [],
			userId: '',
			token: ''
		}
	}

	static navigationOptions({navigation}){
    return {
			title: navigation.state.params.type == 'following' ? "Following" : "Followers",
    }
}
	// static navigationOptions = {
  //   title: this.props.navigation.state.params.type == 'following' ? "Following" : "Followers",
	// }

	componentDidMount() {
		this.props.navigation.addListener('willFocus', (route) => {
			console.warn(this.props.navigation.state.params.type)
			followLists = this.state.follows;
			AsyncStorage.getItem('userId').then((value) => {
				if (value !== null) {
					const { id, token } = JSON.parse(value);
					this.setState({ userId: id, token: token })
					const formData = new FormData();
					formData.append('user_id', this.props.navigation.state.params.userId);
					formData.append('type', this.props.navigation.state.params.type)

					const data = { param: "api/users/followerList", formData: formData };
					postWithJwt(data, token).then(res => {
						followLists = res.list;
						console.warn(res);
						this.setState({ follows: followLists, isLoading: false });
					})
				}
			})
		});
	}

	getUserDetails(user) {
		this.props.navigation.navigate('userDetails', { user });
	}


	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				{/* <Header title={this.props.navigation.state.params.type == 'following' ? "Following" : "Followers"} {...this.props} /> */}
				{(this.state.follows != undefined) && (
					<ScrollView style={styles.mainContainer}>
						{
							this.state.follows.map((item, index) => (
								<TouchableOpacity style={styles.listStyle} onPress={() => this.getUserDetails(item)}>
									<View style={styles.listContainer}>
										<Image source={{ uri: FILE_URL + item.user_image }} style={styles.image} />
										<Text style={[styles.text, { fontSize: 18 }]}>{item.name}</Text>
									</View>
									{/* <TouchableOpacity
                                        onPress={() => this.onFollow(item, index)}
                                        style={[styles.followButton, { backgroundColor: `${item.following == '1' ? constantData.colors.primary : '#fff'}` }]}>
                                        <Text style={[styles.followText, { color: `${item.following == '1' ? '#fff' : constantData.colors.primary}` }]}>{item.following == '1' ? "Following" : "Follow"}</Text>
                                    </TouchableOpacity> */}
								</TouchableOpacity>
							))
						}
					</ScrollView>
				)}


			</View>
		)
	}
}