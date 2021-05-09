import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class AllUsersScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      alluser: [],
    };
    this.userRef = null;
  }

  getAllUserList = () => {
    this.userRef = db
      .collection("users")
      .onSnapshot((snapshot) => {
        var allusers = snapshot.docs.map((doc) => doc.data());
        this.setState({
          alluser: allusers,
        });
      });
  };

  componentDidMount() {
    this.getAllUserList();
  }

  componentWillUnmount() {
  this.userRef = null;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.lastName}
        subtitle={item.age}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Details", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#A0522D" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <MyHeader title="All Users" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.alluser.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 , color:'#fff'}}>List Of All Users</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.alluser}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view:{
    flex: 1,
    backgroundColor: "#1E8449"
  }
});
