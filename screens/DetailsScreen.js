import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class DetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      name        : this.props.navigation.getParam('details')["firstName"] + " "+ this.props.navigation.getParam('details')["lastName"],
      age      : this.props.navigation.getParam('details')["age"],
      address       : this.props.navigation.getParam('details')["address"],
      location        : this.props.navigation.getParam('details')["location"],
      hobby     : this.props.navigation.getParam('details')["hobby"],
      emailId:this.props.navigation.getParam('details')["emailid"],
      docId : this.props.navigation.getParam('details')["doc.id"]
    }
  }

  removeRecord = ()=>{
    db.collection("users").doc(this.state.docId).delete().then(() => {
      ToastAndroid("User Deleted ",ToastAndroid.SHORT)
    })
  }

    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#ffffff'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:" Details ", style: { color: '#fff', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#A0522D"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"User Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.name}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Age : {this.age}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Hobby : {this.hobby}</Text>
              </Card>
            </Card>
          </View>
          
          <View style={styles.buttonContainer}>
            {
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.removeRecord();
                    this.props.navigation.navigate('AllUsers')
                  }}>
                <Text>Delete</Text>
              </TouchableOpacity>
              
            }
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1E8449"
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})