import React, { Component } from 'react';
import { Text, View, ImageBackground, Modal, Platform, Keyboard, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import constantData from '../../JS/constant';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, FILE_URL, postWithJwt } from '../../JS/service';
import ImagePicker from 'react-native-image-crop-picker';
import modalStyles from '../../component/styles';
import { Dropdown } from 'react-native-material-dropdown';
import ModalComponent from '../../component/ModalComponent';


let gender = [{ value: 'Male' }, { value: 'Female' }, { value: 'Others' }]

export default class EditProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: constantData.defaultUserImage,
      email: "",
      userId: "",
      old_image: "",
      name: '',
      aboutme: "",
      gender: "",
      phoneno: "",
      photo: {},
      visible: true,
      modalText: "Loading...",
      isProgress: true,
      token: '',
      error: false,
      pickerOption: false
    }
  }



  // Call after the component is rendered correctly
  componentDidMount() {
    console.warn('edit', this.props.navigation.state.params);


    AsyncStorage.getItem("userId").then((value) => {
      const user = this.props.navigation.state.params.user;
      const { id, token } = JSON.parse(value)

      this.setState({
        email: user.email_address,
        name: user.first_name + " " + user.last_name,
        aboutme: user.aboutme == null ? '' : user.aboutme,
        gender: user.gender == null ? '' : user.gender,
        old_image: user.user_image,
        photo: { path: FILE_URL + user.user_image },
        visible: false,
        isProgress: false,
        userId: id,
        token: token
      })
      //   if (value !== null) {
      //     const { id, token } = JSON.parse(value)
      //     this.setState({ userId: id, token: token })
      //     const formData = new FormData();
      //     formData.append('user_id', id);
      //     const data = { param: "api/users/edit_profile", formData: formData };
      //     postWithJwt(data, token).then(res => {
      //       if (res.ack == 1) {
      //         this.setState({
      //           email: res.details.email_address,
      //           name: res.details.first_name + " " + res.details.last_name,
      //           aboutme: res.details.aboutme == null ? '' : res.details.aboutme,
      //           gender: res.details.gender == null ? '' : res.details.gender,
      //           old_image: res.details.user_image,
      //           photo: { uri: FILE_URL + res.details.user_image },
      //           visible: false,
      //           isProgress: false,
      //         })
      //       }
      //     })
      //   }
    })
  }


  // Call to choose image from gallery to change user profile image 
  handleChoosePhoto = () => {
    // const options = {
    //   noData: true,
    //   storageOptions: {
    //     skipBackup:true,
    //     mediaType:'photo',
    //     path:'images',
    //   },


    // };
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.uri) {
    //     this.setState({ photo: response });
    //   }
    // });
    this.setState({ pickerOption: true })


  };



  onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'image',
      width: 150,
      height: 150,
      cropping: true
    }).then(image => {
      console.warn(image)
      this.setState({ photo: image,pickerOption:false });
    }).catch(error=>this.setState({pickerOption:false}))
    
  }


  onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'image',
      width: 150,
      height: 150,
      cropping: true
    }).then(image => {
      console.warn(image)
      this.setState({ photo: image,pickerOption:false });
    }).catch(error=>{
      console.warn(error)
      this.setState({pickerOption:false})
    })
  }




  //call to move previous screen

  goBack() {
    this.setState({ visible: false })
    this.props.navigation.goBack();
  }

  //Call to save New Updated user details

  onSave() {
    let data = {};

    if (constantData.usernamePattern.test(this.state.name)) {
      this.setState({ isProgress: true, visible: true, modalText: "Profile saving..." })
      let formData = new FormData();
      formData.append('user_id', this.state.userId)
      formData.append('username', this.state.name.trim());
      formData.append('aboutme', this.state.aboutme.trim());
      formData.append('gender', this.state.gender);
      formData.append('email_address', this.state.email);
      console.warn('type', this.state.photo.mime)
      if (this.state.photo.mime != undefined) {
        formData.append('user_image', {
          uri: this.state.photo.path,
          name: "image.jpg",
          type: this.state.photo.mime,

        })
      }
      else {
        formData.append('old_image', this.state.old_image)
      }

      data = { param: "/api/users/edit_profile", formData: formData };
      console.warn(formData);
      postWithJwt(data, this.state.token).then((res => {
        if (res.ack == 1) {
          this.setState({ isProgress: false, visible: true, modalText: "Profile saved successfully !!!" })
        }
        else {
          this.setState({ isProgress: false, visible: true, modalText: "Profile not saved !!!" })
        }
      }))
    }
    else {
      this.setState({ error: true })
    }


  }

  render() {
    const { photo } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ImageBackground
          source={require('../../assets/Images/appBackground.png')}
          style={styles.main}>
          {/* <View>
            <Image source={{ uri: this.state.sources }} ></Image>
            <Text>{this.state.sources}</Text>
            
          </View> */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photo.path }}
              style={styles.profileImg}
            />
            <TouchableOpacity onPress={this.handleChoosePhoto} style={styles.editIconButton}>
              <Icons name="pencil" color="#fff" size={15} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.headerText}>Name</Text>
              <Icons name="pencil" size={15} color={constantData.colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
              returnKeyType="done"
            />

          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.headerText}>About me</Text>
              <Icons name="pencil" size={15} color={constantData.colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={this.state.aboutme}
              onChangeText={(text) => this.setState({ aboutme: text })}
              multiline={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.headerText}>Gender</Text>
              <Icons name="pencil" size={15} color={constantData.colors.primary} />
            </View>
            <Dropdown
              data={gender}
              containerStyle={{ height: 40 }}
              onChangeText={(itemValue) =>
                this.setState({ gender: itemValue })
              }
              value={this.state.gender}
              dropdownOffset={{ top: 5 }}
              valueExtractor={({ value }) => value}
            />
          </View>
          {this.state.error && (
            <Text style={constantData.errorTextStyle}>Full Name can't be numbers & special character</Text>
          )}
          <TouchableOpacity onPress={() => this.onSave()} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <ModalComponent
            isProgress={this.state.isProgress}
            visible={this.state.visible}
            title={this.state.modalText}
            page='editProfile'
            {...this.props}
          />
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.pickerOption}>
            <View style={modalStyles.modal}>
              <View style={[modalStyles.modalContainer, { padding: 10, borderBottomColor: '#eee', borderBottomWidth: 2 }]}>
                <TouchableOpacity onPress={() => this.setState({ pickerOption: false })} style={styles.closeIcon}>
                  <Icons name="close" color={constantData.colors.primary} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onCamera()}>
                  <Text style={styles.pickerText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onGallery()}>
                  <Text style={styles.pickerText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </ImageBackground>

      </KeyboardAvoidingView>
    )
  }
}



