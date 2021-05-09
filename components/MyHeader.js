import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      userId : firebase.auth().currentUser.email,
      value:""
    }
  }

getNumberOfNewUsers(){
  db.collection('users').where('status','==',"new")
  .onSnapshot((snapshot)=>{
    var NewUsers = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: NewUsers.length
    })
  })
}

componentDidMount(){
  this.getNumberOfNewUsers()
}


 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#ffffff' size={25}
          onPress={() =>this.props.navigation.navigate('NewUsers')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        <Header
          leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
          centerComponent={{ text: this.props.title, style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#32867d"
        />

)
}

}
