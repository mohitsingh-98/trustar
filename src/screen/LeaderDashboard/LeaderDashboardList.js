import React, { Component } from 'react'
import { ActivityIndicator, View,FlatList,TouchableOpacity,Dimensions,Image } from 'react-native'
import Header from '../../component/Header';
import {getWithJwt,API_URL, FILE_URL} from '../../JS/service';
import styles from '../CompetionList/styles';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-banner-carousel';
import constantData from '../../JS/constant';
import database from '@react-native-firebase/database';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;
export default class LeaderDashboardList extends Component {

  constructor(props){
    super(props);
    this.state={
      competitionList:[],
      isFetching:true
    }
  }

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (route) => {
      this.setState({isFetching:true})
      database().ref('/isRefresh').on('value', snapshot => {
      AsyncStorage.getItem('userId').then((value)=>{
          const {id,token}=JSON.parse(value);
          let data={};
          data ={param:"api/users/leaderBoardCompetition"}
          getWithJwt(data,token).then(res=>{
            if(res!= undefined){
              this.setState({competitionList:res.competitionList,isFetching:false});
            }
            else{
              this.setState({isFetching:false})
            }
            // this.setState({isFetching:false})
          }).catch(error=>this.setState({isFetching:false}))
        })
      })
    })
 
  }


  gotoView(image){
    this.props.navigation.navigate('LeaderDashboard',{image:image})
  }



  renderPage(image, index) {
    return (
      <TouchableOpacity key={index} onPress={()=>this.gotoView(image)}>
        <Image 
          style={{ width: BannerWidth, height: BannerHeight }}
				  source={{ uri:FILE_URL+image.original_image }} />
      </TouchableOpacity>
    );
	}

  makeCrousel(image,index){
    return(
      <View style={{marginTop:10}}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {image.competitionimages.map((image, index) => this.renderPage(image, index))}
        </Carousel>
        {/* {image.competitionimages.length>0&& this.state.isRegister==0&&(
          <TouchableOpacity
           onPress={()=>this.gotoSubscribe(image)}
           style={styles.subscribeButton}>
           <Text style={styles.subscribeText}>Register Now</Text>
          </TouchableOpacity>
        )}
          {image.competitionimages.length>0&& this.state.isRegister==1&&(
           <TouchableOpacity
            onPress={()=>this.gotoSubscribe(image)}
            style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>View Details</Text>
          </TouchableOpacity>
        )} */}
       
      </View>
    )
  }

  render(){
    return(
      <View style={{paddingBottom:80}}>
       {!this.state.isFetching && (
        <FlatList
          data={this.state.competitionList}
          extraData={this.state}
          refreshing={this.state.isFetching}
          renderItem={({item,index}) => 

              <View>
              {this.makeCrousel(item, index)}          
              </View>
           
           
          }
        />
       )}

        {this.state.isFetching && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </View>
        )}
      </View>
    )
  }
}
