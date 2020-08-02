import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import constantData from '../JS/constant';
import styles from './styles';


export default class ModalComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isProgress: false,
      title: ''
    }
  }

  componentDidMount() {
    this.setState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  navigateRoute = () => {
    this.setState({ visible: false })
    if (this.props.page == 'signUp') {
      this.props.navigation.navigate('Login')
    }
    else if (this.props.page == 'login') {
      this.props.navigation.navigate('Feeds');
    }
    else if (this.props.page == 'editProfile') {
      this.props.navigation.navigate('Profile');
    }
  }


  render() {

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.visible}>
        <View style={styles.modal}>
          {this.state.isProgress && (
            <View style={[styles.modalContainer,{flexDirection:'row',padding:15}]}>
              <ActivityIndicator color={constantData.colors.primary} size="large" />
              {(this.state.title != '' && this.state.title != undefined) && (
                <Text style={styles.modalLoaderText}>{this.state.title}</Text>
              )}
            </View>
          )}
          {!this.state.isProgress && (
            <View style={[styles.modalContainer,{paddingTop:15,paddingBottom:15}]}>
              <Text style={styles.modalTitleStyle}>{this.state.title}</Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => this.navigateRoute()}>
                <Text style={styles.modalText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

    )
  }
}




