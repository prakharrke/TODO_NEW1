import React from 'react';
import { Container, Header, Content, Button, Text,Form, Item, Input, Label,Spinner} from 'native-base';
import {View,AsyncStorage} from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
//import localIPAddress from '../../../Constants/Constants'
export default class SignInForm extends React.Component{

constructor(props){

  super(props);

this.state={

  email:"",
  password:"",
  isLoading:false


}


}

async signIn(){

  console.log('SignIn')



  var userData = {

    email:this.state.email,
    password:this.state.password

  };
  this.setState({

    isLoading:true

  });

  axios.post('http://192.168.56.62:3000/userAuth/signIn',userData).then(async (response)=>{

      if(!response.data.wrongCredentials){

        try{

            console.log(response.data)
            await AsyncStorage.setItem('token',response.data.token);
            this.props.navigation.navigate('afterAuth');





        }catch(err){

            console.log(err)

        }

      }



  }).catch(err=>{

      console.log(err)
  })



}


async getToken(){


  var token = await AsyncStorage.getItem('token');

var decoded = jwt_decode(token);
console.log(decoded)


}


render(){


  axios.post('/http://192.168.56.62:3000/userAuth/signIn',{data:'hello'}).then((res)=>{

    console.log(res.data)


  }).catch(err=>{

    console.log(err);

  })

    //this.getToken();

    //console.log(localIPAddress.localIPAddress);


if(!this.state.isLoading){
return(


  <View>

          <Form>



            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text)=>{this.setState({email:text})}}/>
            </Item>
            <Item floatingLabel last >
              <Label>Password</Label>
              <Input onChangeText={(text)=>{this.setState({password:text})}} secureTextEntry={true}/>
            </Item>
          </Form>

          <Button block style={{backgroundColor:"#283593",}} onPress={this.signIn.bind(this)} ><Text>Sign In</Text></Button>

  </View>

);
}

if(this.state.isLoading){

  return(

      <Spinner color='blue'/>


  );


}
}



}
