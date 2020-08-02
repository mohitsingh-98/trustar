
import Icon from 'react-native-vector-icons/AntDesign';
import React, { Component } from "react";
import {View,TouchableOpacity} from "react-native";
import styles from './styles';
import Video from "react-native-video";
import {API_URL} from '../../JS/service';


export default class PreviewVideoScreen extends Component {

  static navigationOptions = { header: null }
    
  constructor(props) {
    super(props);
    this.state = { 
      paused: false,
      isComplete:false,
      data:'',
      userId:'',
      rate: 1,
    };
  }

	// Call after the component is rendered correctly

  componentDidMount(){
    this.props.navigation.addListener('willFocus',(route)=>{
      if(this.props.navigation.state.params != undefined){
        this.setState({data:this.props.navigation.state.params.data,rate:1,userId:this.props.navigation.state.params.userId});     
      }
    })
         
	}
	

	

  
  //Call to move previous screen 
  goBack = () => {
	    this.props.navigation.goBack();
  }

 //Call to navigate uploadVideo screen and pass the Recorded video details to upload
  gotoUpload(){
    this.setState({rate:0})
    this.props.navigation.navigate('uploadvideo',{video:this.state.data,userId:this.state.userId})
	}
	

  render() {
              
    return (
      <View  style={styles.fullScreen}>
          <Video
            source={{uri: this.props.navigation.state.params.data}}
            ref={(ref) => {
              this.player = ref
            }}
            rate={this.state.rate}    
            repeat={true}     
            resizeMode="contain" 
            paused={false}
            style={styles.videoContainerAndroid}
          />

	        <View style={styles.backButtonWrapper}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Icon style={styles.icon} name="closecircleo" size={50} color="#ffc107" />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>this.gotoUpload()}>
              <Icon style={styles.icon} name="checkcircleo" size={50} color="#ffc107" />
            </TouchableOpacity>
          </View>
      </View>
    );
  }

}
