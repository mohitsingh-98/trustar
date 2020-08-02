import React, { Component } from 'react';
import { View, Text,ActivityIndicator, ScrollView,Platform, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import { API_URL,postWithJwt, FILE_URL } from '../../JS/service';
import constantData from '../../JS/constant';
import Carousel from 'react-native-banner-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';


const itemSkus = Platform.select({
  ios: [
    'com.GameSmash.TruStar.ParticipationCharge'
  ],
  android: [
    'com.GameSmash.TruStar.ParticipationCharge'
  ]
});
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;

export default class SubscribeScreen extends Component {

  static navigationOptions = {
    title: "Details",
    headerStyle: {
      elevation: 0
    },
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: "normal"
    },

  }

  constructor(props) {
    super(props);
    this.state = {
      competitionId: "",
      title: "",
      description: "",
      price: "",
      startDate: "",
      endDate: "",
      price: "",
      competitionimages: [],
      isRegister: "",
      isLoading:false
    }
  }

  // Call after the component is rendered correctly
  componentDidMount() {
    this.props.navigation.addListener('willFocus', (route) => {
    this.setState({
      competitionId: this.props.navigation.state.params.image.id,
      isRegister: this.props.navigation.state.params.isRegister,
      startDate: this.props.navigation.state.params.image.start_date,
      endDate: this.props.navigation.state.params.image.end_date,
      isLoading:false
    })
    this.setState(this.props.navigation.state.params.image)
  })
  }

  //Call to make banner crousel
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: FILE_URL + image.original_image }} />
      </View>
    );
  }

  // Call to move payement screen to make payment
  
  gotoPayment =async ()=> {
    this.setState({isLoading:true});
    AsyncStorage.getItem('userId').then(value => {
      const { id, token } = JSON.parse(value)
      let formData = new FormData();
      formData.append('user_id', id);
      formData.append('competition_id', this.state.competitionId);
      formData.append('payment_method', 'cards');
      formData.append('card_number', '1258254852145258');
      formData.append('exp_month', '05');
      formData.append('exp_year', '19');
      formData.append('cvv', '456');
      formData.append('total_amount', '9.99')
      postWithJwt({ param: "api/users/save_checkout", formData: formData },token).then(res => {
        console.warn(res);
        if (res.ack == 1) {
          // this.props.navigation.navigate('Dashboard');
          AsyncStorage.getItem('userId').then((value) => {
            const { id, token, is_competition } = JSON.parse(value);
            AsyncStorage.setItem('userId',JSON.stringify({id:id,token:token,is_competition:1}));
          })

          this.props.navigation.navigate('Home');
        }
       
      })
   
    })

    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {this.state.competitionimages.map((image, index) => this.renderPage(image, index))}
        </Carousel>
        <View>
          <Text style={styles.header}>Competition Name</Text>
          <Text style={styles.text}>{this.state.title}</Text>
        </View>
        <View>
          <Text style={styles.header}>Description</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
        <View>
          <Text style={styles.header}>Start on</Text>
          <Text style={styles.text}>{Moment(this.state.startDate).format('DD MMM YYYY')}</Text>
        </View>
        <View>
          <Text style={styles.header}>End on</Text>
          <Text style={styles.text}>{Moment(this.state.endDate).format('DD MMM YYYY')}</Text>
        </View>

        {this.state.isRegister == 0 && !this.state.isLoading  &&(
          <TouchableOpacity style={styles.button} onPress={() => this.gotoPayment()}>
            <Text style={styles.buttonText}>Pay ${this.state.price}</Text>
          </TouchableOpacity>
        )}
        {this.state.isRegister == 1 && (
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {this.state.isRegister == 0 && this.state.isLoading && (
          <TouchableOpacity style={styles.button}>
            <ActivityIndicator size="large" color={constantData.colors.primary} />
          </TouchableOpacity>
        )}


      </ScrollView>
    )
  }


}

