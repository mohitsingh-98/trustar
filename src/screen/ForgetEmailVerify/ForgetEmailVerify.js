import React, { Component } from 'react';
import { Image, ActivityIndicator,View, Text, TextInput, Keyboard,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import styles from '../SignUpEmailVerify/styles';
import {post} from '../../JS/service'
let otp = '';

export default class ForgetEmailVerify extends Component {


	constructor(props) {
		super(props);
		this.state = {
			email: "",
			isLoading:false,
			isResend:false,
			inuputCount: [1, 2, 3, 4, 5, 6],
			timer: 30,
			input1: "",
			input2: "",
			input3: "",
			input4: "",
			input5: '',
			input6: "",
			error: "",

		}

	}


	// Call after the component is rendered correctly
	componentDidMount() {
		
    this.makeTimer();
	}
    
  makeTimer(){
    if (this.props.navigation.state.params != undefined) {
			this.setState({ email: this.props.navigation.state.params.email });
    }
    this.interval = setInterval(
		  () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
			1000
		);
  }

 //Call when state would be update
	componentDidUpdate() {
		if (this.state.timer === 0) {
			clearInterval(this.interval);
		}
	}

	// call to verify otp with backend service

	onVerifyOtp() {
		let formData = new FormData();
		formData.append('email_address', this.state.email);
		formData.append('otp', this.state.input1 + this.state.input2 + this.state.input3 + this.state.input4 + this.state.input5 + this.state.input6);
		const data = { param: "api/users/otp_verification", formData: formData}
		post(data).then((res)=>{
			if(res.ack==1){
				this.props.navigation.navigate('ResetPassword', res)
			}
			else if(res.ack==0){
				this.setState({ error: res.message })
			}
		})

	}


	// Call to recieve otp input by the user
	getOtp(value, index) {
		this.setState({ ['input' + index]: value });
		otp = this.state.input1 + this.state.input2 + this.state.input3 + this.state.input4
	}

	// Call when user try to hit resend otp 
	resendOtp() {
		this.setState({isResend:true,
			input1: "",
			input2: "",
			input3: "",
			input4: "",
			input5: "",
			input6: ""
		})

		let formData = new FormData();
		formData.append("email_address", this.state.email);
		const data = { param: "api/users/forgot_password", formData: formData}
		post(data).then((res)=>{
			if(res.ack==1){
				clearInterval(this.interval);
				this.setState({ timer: 30,isResend:false });
				this.makeTimer();
			}
		})
	}


	// Disabled Verify button until the otp is missing
	isVerfyDisabled() {
		let valid = false
		for (let i = 1; i <= 6; i++) {
			if (this.state['input' + i] == '' || this.state['input' + i] == undefined || this.state.timer < 1) {
				valid = true;
			}
		}
		return valid
	}


	render() {
		const {isLoading,isResend} = this.state;
		const input = this.state.inuputCount.map((count) => {
			return (
				<TextInput
					style={styles.verfifyOtpInput}
					returnKeyType="done"
					maxLength={1}
					keyboardType={'numeric'}
					onChangeText={(text) => {
						this.getOtp(text, count);
						if (count == 1 && text != "") {
							this.input2.focus()
						}
						else if (count == 2 && text != "") {
							this.input3.focus()
						}
						else if (count == 3 && text != "") {
							this.input4.focus()
						}
						else if (count == 4 && text != "") {
							this.input5.focus()
						}
						else if (count == 5 && text != "") {
							this.input6.focus()
						}
					}}
					ref={(input) => {
						if (count == 2) {
							this.input2 = input
						}
						else if (count == 3) {
							this.input3 = input
						}
						else if (count == 4) {
							this.input4 = input
						}
						else if (count == 5) {
							this.input5 = input
						}
						else if (count == 6) {
							this.input6 = input
							Keyboard.dismiss
						}

					}}
					value={this.state['input' + count]}
					placeholder="0"
				/>
			)
		})
		return (
				<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
						<Image 
							source={require("../../assets/logo/01.png")}
							style={styles.logo}
							resize="contain" />
						<Text style={styles.verifyHeaderText}>EMAIL VERIFICATION </Text>
						<Text style={styles.emailText}>{this.state.email}</Text>
						<View style={styles.inputContainer}>
							{input}
						</View>
							<Text style={styles.displayText}>
								Please enter the verification code receive by Email.If you did not receive the verification code. Click to Resend Otp
							</Text>
						<View style={styles.buttonContainer}>
							<Text style={{ color: `${this.state.timer == '0' ? "#fff" : "#ffc107"}` }}> {this.state.timer} </Text>
							{isResend && (
									<ActivityIndicator size="small" color="#ffc107" />
							)}
							<TouchableOpacity 
								disabled={this.state.timer !='0'}
								onPress={() => this.resendOtp()}
								style={styles.button}>
								<Text style={{ color: `${this.state.timer=='0' ? "#ffc107" : "grey"}`, fontWeight: "400" }}>Resend Otp</Text>
							</TouchableOpacity>							
							
							<TouchableOpacity
								disabled={this.isVerfyDisabled()}
								onPress={() => this.onVerifyOtp()}
								style={[styles.button,{backgroundColor: `${!this.isVerfyDisabled() ? "#ffc107" : "#e0e0e0"}`}]}>
								{!isLoading &&(
									<Text style={{ color: `${!this.isVerfyDisabled() ? "#fff" : "grey"}` }}>Next</Text>
								)}
								{isLoading && (
									<ActivityIndicator animating size="small" color="#fff" />
								)}						
							</TouchableOpacity>
							<Text style={styles.errorText}>{this.state.error}</Text>
						</View>
					</KeyboardAvoidingView>
	


		)
	}

}


