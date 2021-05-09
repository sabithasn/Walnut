import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import SwipeableFlatlist from "../components/SwipeableFlatlist";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from "../config";

export default class NewUsersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNewUsers: []
    };

    this.newUserRef = null;
  }

  getUsers = () => {
    this.newUserRef = db
      .collection("users")
      .where("status", "==", "new")
      
      .onSnapshot(snapshot => {
        var allNewUsers = [];
        snapshot.docs.map(doc => {
          var newUser = doc.data();
          newUser["doc_id"] = doc.id;
          allNewUsers.push(newUser);
        });
        this.setState({
          allNewUsers: allNewUsers
        });
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    this.newUserRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
        <ListItem
        leftElement={<Icon name="user" type="font-awesome" color="#696969" />}
        title={item.firstName + " " + item.lastName}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={item.hobby}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{ flex: 0.13 }}>
          <MyHeader
            title={"New Users"}
            navigation={this.props.navigation}
          />
        </View>
        <View style={{ flex: 0.8 }}>
          {this.state.allNewUsers.length === 0 ? (
            <View style={styles.imageView}>
              <Image source={require("../assets/bgwalnut.png")} />
              <Text style={{ fontSize: 25 }}>No New Users</Text>
            </View>
          ) : (
            <SwipeableFlatlist allNewUsers={this.state.allNewUsers} />
          )}
        </View>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deeeed"
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});