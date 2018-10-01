import React from 'react';
import { Container, Header, Content, Button, Text,Form, Item, Input, Label,} from 'native-base';
import {View,AsyncStorage} from 'react-native';
import axios from 'axios';
export default class SignUpForm extends React.Component{

constructor(props){

  super(props);

this.state={

  firstName:"",
  lastName:"",
  email:"",
  password:"",



}

this.firstNameField=null;

this.onChangeHandler = this.onChangeHandler.bind(this);

}


async signUp(){



    var userData = {

      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,

    }

    console.log(userData);

    axios.post('http://192.168.56.62:3000/userAuth/signUp',userData).then( async (response)=>{

        console.log(response.data)
        if(!response.data.userAlreadyRegisteredFlag){

                try{

                    await AsyncStorage.setItem('token',response.data.token);

                    this.props.navigation.navigate('UserProfile');



                }catch(err){

                    console.log(err)

                }


        }



    })

}

async getToken(){

  var token = await AsyncStorage.getItem('token');

  return token;


}

onChangeHandler = (event,value) =>{

    console.log(event)

}



render(){

console.log(this.state)
console.log(this.props)


return(

  <View>

          <Form>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input name='firstName'  onChangeText={(text)=>{this.setState({firstName:text})}}/>
            </Item>

            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input name='lastName' onChangeText={(text)=>{this.setState({lastName:text})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input name='email' onChangeText={(text)=>{this.setState({email:text})}}/>
            </Item>
            <Item floatingLabel last >
              <Label>Password</Label>
              <Input name='password' onChangeText={(text)=>{this.setState({password:text})}} secureTextEntry={true} />
            </Item>
          </Form>

          <Button block style={{backgroundColor:"#283593",}} onPress={this.signUp.bind(this)} ><Text>Sign Up</Text></Button>

  </View>

);
}



}
