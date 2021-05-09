import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, ToastAndroid
} from "react-native";
import { Card } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class PasswordReset extends Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      password: "",
      confirmPassword: "",
      docId: "",
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("email_id", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  updateCredentials = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return ToastAndroid("password doesn't match\nCheck your password.", ToastAndroid.SHORT);
    } else {
      firebase
        .auth()
        .updatePassword( password)
        .then(() => {
          this.props.navigation.navigate("DonateBooks");
        return ToastAndroid("Password Updated Successfully", ToastAndroid.SHORT);
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return ToastAndroid(errorMessage, ToastAndroid.SHORT);
        });
    }
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.12 }}>
          <MyHeader title="Change Password" navigation={this.props.navigation} />
        </View>


        <View style={styles.formContainer}>
            <View
              style={{
                flex: 0.66,
                padding: RFValue(10),
              }}
            >
            <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                  password: text
                });
              }}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Confrim Password"}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                  confirmPassword: text
                });
              }}
            />
            </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateCredentials  (this.state.password)
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#6E2C00"
  },
  formContainer:{
    flex: 0.88,
    justifyContent:'center'
  },
  label:{
    fontSize:RFValue(18),
    color:"#717D7E",
    fontWeight:'bold',
    padding:RFValue(10),
    marginLeft:RFValue(20)
  },
  formTextInput: {
    width: "90%",
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth:1,
    borderRadius:2,
    borderColor:"grey",
    marginBottom:RFValue(20),
    marginLeft:RFValue(20)
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#25714F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView:{
    flex: 0.22,
    alignItems: "center",
    marginTop:RFValue(100)
},
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
});
