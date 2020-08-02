import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Header extends Component{

  constructor(props){
    super(props);
  }

  onBack(){
    if(this.props.page =='login'){
      this.props.navigation.navigate('LoginOption');
    }
    else {
      this.props.navigation.goBack()
    }
  }
  render(){
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>this.onBack()} >
          <Icon name='left' color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.title}</Text>
        <Text style={{color:'white'}}>.....</Text>
      </View>
    )
  }
} 