import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { postWithJwt } from '../../JS/service';
import ModalComponent from '../../component/ModalComponent';
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

export default class PaymentScreen extends Component {

  static navigationOptions = {
    title: "Payment Details",
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
      isLoading: false,
      error: "",
      userId: "",
      competitionId: "",
      title: "",
      description: "",
      price: "",
      startDate: "",
      endDate: "",
      price: "",
      name: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      competitionimages: [],
      isProgress: false,
      visible: false,
      modalText: "",
      token: ''
    }
  }


  // Call after the component is rendered correctly
  componentDidMount() {
    AsyncStorage.getItem('userId').then(value => {
      const { id, token } = JSON.parse(value)
      this.setState({ userId: id, token: token });

    })
    console.warn(this.props.navigation.state.params);
    this.setState(this.props.navigation.state.params);

  }





  // Call to disabled payemnt button until the payment details is invalid 
  onDisabled() {
    let valid = true
    if (this.state.name != "" && this.state.name != undefined &&
      this.state.cardNumber != "" && this.state.cardNumber != undefined &&
      this.state.expDate != "" && this.state.expDate != undefined &&
      this.state.cvv != "" && this.state.cvv != undefined
    ) {
      valid = false
    }
    return valid
  }


  //validating Expiry Date
  _handlingCardExpiry(text) {
    if (text.indexOf('.') >= 0 || text.length > 5) {
      // Since the keyboard will have a decimal and we don't want
      // to let the user use decimals, just exit if they add a decimal
      // Also, we only want 'MM/YY' so if they try to add more than
      // 5 characters, we want to exit as well
      return;
    }

    if (text.length === 2 && this.state.expDate.length === 1) {
      // This is where the user has typed 2 numbers so far
      // We can manually add a slash onto the end
      // We check to make sure the current value was only 1 character
      // long so that if they are backspacing, we don't add on the slash again
      text += '/'
    }

    // Update the state, which in turns updates the value in the text field
    this.setState({
      expDate: text
    });
  }

  _handlingCardNumber(text) {
    if (text.indexOf('.') >= 0 || text.length > 19) {
      return;
    }
    if ((text.length === 4 || text.length === 9 || text.length === 14) && (this.state.cardNumber === 3 || this.state.cardNumber === 8 || this.state.cardNumber === 18)) {
      text += '-'
    }
    this.setState({
      cardNumber: text
    });
  }


  // use to make payment for specific competition
  onPay() {
    let date = ""
    if (this.state.expDate.includes('/')) {
      this.setState({ isLoading: true });
      date = this.state.expDate.split('/');
      let formData = new FormData();
      formData.append('user_id', this.state.userId);
      formData.append('competition_id', this.state.competitionId);
      formData.append('payment_method', 'cards');
      formData.append('card_number', this.state.cardNumber);
      formData.append('exp_month', date[0]);
      formData.append('exp_year', date[1]);
      formData.append('cvv', this.state.cvv);
      formData.append('total_amount', this.state.price)
      postWithJwt({ param: "api/users/save_checkout", formData: formData }, this.state.token).then(res => {
        if (res.ack == 1) {
          // this.props.navigation.navigate('Dashboard');
          AsyncStorage.getItem('userId').then((value) => {
            const { id, token, is_competition } = JSON.parse(value);
            AsyncStorage.setItem('userId',JSON.stringify({id:id,token:token,is_competition:1}));
          })

          this.setState({ isLoading: false, visible: true, modalText: "Payment Successfully !!!" });
        }
        else {
          this.setState({ isLoading: false });
        }
      })
    }
    else {
      this.setState({ error: "Invalid Expiry Date" })
    }
  }


  // getPurchases = async () => {
  //   try {
  //     const purchases =await RNIap.getProducts(itemSkus);
  //     console.warn(purchases)
  //   }
  //   catch(err) {
  //     console.warn(err);
  //   }
  // }

  getPurchases = async () => {

    try {
      console.warn('try1', this.props.navigation.state.params.competition_id)
      // const purchases =await RNIap.getProducts([this.props.navigation.state.params.competition_id]);

      const purchases = await RNIap.requestPurchase(this.props.navigation.state.params.competition_id);
      console.warn(purchases)
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.header}>Payment amount</Text>
          <Text style={styles.amountText}>$ {this.state.price}</Text>
          <Text style={styles.header}>Name on card</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => { this.setState({ name: text }) }}
            returnKeyType="done"
          />
          <Text style={styles.header}>Card number</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChangeText={(text) => this._handlingCardNumber(text)}
            returnKeyType="done"
            keyboardType={'numeric'}
            value={this.state.cardNumber}
          />
          <View style={styles.dateContainer}>
            <View style={styles.dateWidth}>
              <Text style={styles.header}>Expiry date</Text>
              <TextInput
                style={styles.input}
                // placeholder="MM/YY"
                // onChangeText={(text)=>{this.setState({exp_date:text})}}
                returnKeyType="done"
                onChangeText={(text) => this._handlingCardExpiry(text)}
                placeholder='MM/YY'
                keyboardType={'numeric'}
                value={this.state.expDate}
              />
            </View>
            <View style={styles.cvvWidth}>
              <Text style={styles.header}>Cvv</Text>
              <TextInput
                style={styles.input}
                placeholder="Cvv"
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({ cvv: text }) }}
                returnKeyType="done"
              />
            </View>
          </View>
          <Text style={styles.errorText}>{this.state.error}</Text>
          <TouchableOpacity
            disabled={this.onDisabled()}
            style={[styles.payButton, { backgroundColor: `${!this.onDisabled() ? "#ffaa00" : "#eee"}` }]}
            onPress={() => this.onPay()}>
            {!this.state.isLoading && (
              <Text style={{ color: `${!this.onDisabled() ? "#fff" : "grey"}` }}>Pay ${this.state.price}</Text>
            )}
            {this.state.isLoading && (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getPurchases()} style={[styles.payButton, { backgroundColor: "#ffaa00" }]}>
            <Text style={{ color: 'white' }}>In App Pay</Text>
          </TouchableOpacity>
        </View>
        <ModalComponent
          title={this.state.modalText}
          visible={this.state.visible}
          isProgress={this.state.isProgress}
          page="login"
          {...this.props}
        />
      </View>
    )
  }
}



