import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, SafeAreaView, Picker
} from "react-native";
import { Card } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import GetLocation from 'react-native-get-location'
import { RFValue } from "react-native-responsive-fontsize";
import {Dropdown} from 'react-native-material-dropdown';

export default class PasswordReset extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      firstName: "",
      lastName: "",
      location: "",
      age: "",
      hobby:'',
      image: "#",
      docId: "",
      name:'',
      scroll:false,
      newUser:true
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("emailid", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.emailId,
            firstName: data.firstName,
            lastName: data.lastName,
            location: data.location,
            age: data.age,
            hobby:data.hobby,
            docId: doc.id,
            name: doc.data().firstName + " " + doc.data().lastName,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      emailId: this.state.emailId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      location: this.state.location,
      age: this.state.age,
      hobby:this.state.hobby,
      newUser:false
    });

    Alert.alert("Profile Updated Successfully");
  };
  getlocation = ()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        this.setState({location:location})
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().firstName + " " + doc.data().lastName,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }
  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    { if (this.state.newUser) {
      return (
        <SafeAreaView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.12 }}>
            <MyHeader title={"Welcome " + this.state.name} navigation={this.props.navigation} />
          </View>
  
  
          <View style={styles.formContainer}>
              <View
                style={{
                  flex: 0.66,
                  padding: RFValue(10),
                }}
              >
              <Text style={styles.label}>First Name </Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"First Name"}
                  maxLength={12}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  value={this.state.firstName}
                />
  
              <Text style={styles.label}>Last Name </Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Last Name"}
                  maxLength={12}
                  onChangeText={(text) => {
                    this.setState({
                      lastName: text,
                    });
                  }}
                  value={this.state.lastName}
                />
  
                  <Text style={styles.label}>Age </Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Age"}
                  maxLength={2}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({
                      contact: text,
                    });
                  }}
                  value={this.state.contact}
                />
                <Text style={styles.label}>Hobby </Text>
                <Dropdown  tyle={styles.formTextInput} data = {DATA}  onChangeText={(text) => {
                    this.setState({
                      hobby: text,
                    });
                  }}
                />
                <Avatar
                  rounded
                  source={{
                    uri: this.state.image,
                  }}
                  size={"xlarge"}
                  onPress={() => this.selectPicture()}
                  showEditButton
                />
  
  
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.getlocation();
                    }}
                  >
                    <Text style={styles.buttonText}>Get Location </Text>
                </TouchableOpacity>
              </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.updateUserDetails();
                    }}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </View>
        </SafeAreaView>
      );
    }
    else {
      return (
      <SafeAreaView>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.12 }}>
          <MyHeader title={"Welcome " + this.state.name} navigation={this.props.navigation} />
        </View>


        <View style={styles.formContainer}>
            <View
              style={{
                flex: 0.66,
                padding: RFValue(10),
              }}
            >
            <Text style={styles.label}>{"First Name : "+this.state.firstName} </Text>
              
            <Text style={styles.label}>{"Last Name : " +this.state.lastName} </Text>
            <Text style={styles.label}>{"Age :"+ this.state.age} </Text>
            <Text style={styles.label}>{"Hobby :"+ this.state.hobby} </Text>
            <Text style={styles.label}>{"Location :"+ this.state.location} </Text>
              <Avatar
                rounded
                source={{
                  uri: this.state.image,
                }}
                size={"xlarge"}
                onPress={() => this.selectPicture()}
                showEditButton
              />


              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setState({newUser : true});
                  }}
                >
                  <Text style={styles.buttonText}>Edit </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </SafeAreaView>
    );
    }}
    
  }
}

const DATA = [
  {value: "Swimming"},
  {value: "Driving"},
  {value: "Travelling"},
  {value: "Reading"},
  {value: "Dancing"},
  {value: "Singing"},
  {value: "Cricket"},
  {value: "Badminton"},
  {value: "Cooking"},
  {value: "Writing"},
  {value: "Painting/Drawing"},
  {value: "Watching TV"},
  {value: "Games Online"},
  {value: "Basket Ball"},
  {value: "Football"},
  {value: "Knitting"},
  {value: "Playing"},
  {value: "Board Games"},
  {value: "Nothing"}
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#1E8449"
  },
  formContainer:{
    flex: 0.88,
    justifyContent:'center'
  },
  label:{
    fontSize:RFValue(18),
    color:"#fff",
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
    backgroundColor: "#fff",
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
    color: "#A0522D",
  },
});
/*
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => {this.setState({hobby:itemValue})}}
                >
                  <Picker.Item label="Reading" value="Reading" />
                  <Picker.Item label="Swimming" value="Swimming" />
                  <Picker.Item label="Driving" value="Driving" />
                  <Picker.Item label="Writing" value="Writing" />
                  <Picker.Item label="Singing" value="Singing" />
                  <Picker.Item label="Listening Music" value="Listening Music" />
                  <Picker.Item label="Dancing" value="Dancing" />
                  <Picker.Item label="Plarying" value="Playing" />
                  <Picker.Item label="Online Games" value="Online Games" />
                  <Picker.Item label="None" value="No Hobby" />
                </Picker>
  */
