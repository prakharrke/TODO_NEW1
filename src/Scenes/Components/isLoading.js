import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';

export default class IsLoading extends React.Component{

  render(){

    return(

      <Container>
      <Header />
      <Content>

        <Spinner color='blue' />
      </Content>
    </Container>


    )


  }

}
