import React from 'react';
import { Container, Header,List,ListItem, Content, Button, Text,Form, Item, Input, Label,Fab,Icon, Separator } from 'native-base';
import {ScrollView,View,AsyncStorage,SectionList,ListView} from 'react-native';
import axios from 'axios';
import * as taskActions from '../Actions/taskActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';



 class MyList extends React.Component{




   constructor(props) {

     super(props);

     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
     this.ds2 = new ListView.DataSource({rowHasChanged : (r1,r2) => r1 !== r2});
     this.state = {
          active: 'true',
          basic: true,
          listViewData:this.props.taskList,
          backgroundColor:'green'

        };

        this.todaysTasks=[];
        this.upcomingTasks=[];

        this.backgroundColor = "blue";

        this.changeCol = this.changeCol.bind(this);

     }




addTask(){


  //this.props.taskActions.addTaskActionCreator({taskTitle:"New Task",isCompleted:false});
  this.props.navigation.navigate('NewTask')

}

clearList(){

    this.props.taskActions.clearListActionCreator();

}


changeCol(id){


    this[id].setNativeProps({style : {backgroundColor:'red'}})


}




  render(){



const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const ds2 = new ListView.DataSource({rowHasChanged : (r1,r2) => r1 !== r2});

  this.todaysTasks=[];
  this.upcomingTasks=[];

  this.props.taskList.forEach((task)=>{

    var today = new Date();
    var taskDate = new Date(task.taskDate);
    console.log("Hello")
    console.log(today)

    if(today.getDate() == taskDate.getDate() && today.getMonth == taskDate.getMonth && today.getFullYear == taskDate.getFullYear){


        this.todaysTasks.push(task);




    }
    else{

      this.upcomingTasks.push(task)

    }





  })

  // * SETTING TODAYLIST COMPONENT IN VARIABLE

  var todaysTaskList =this.todaysTasks.length==0?  (<Text style={{marginLeft:30}}>You do not have any tasks for today</Text>) : (

     (

      <List
          dataSource={this.ds.cloneWithRows(this.todaysTasks)}
          renderRow={data =>
            <ListItem>
              <Text> {data.taskTitle} </Text>
            </ListItem>}
          renderLeftHiddenRow={data =>
            <Button full onPress={() => alert(data)}>
              <Icon active name="information-circle" />
            </Button>}
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={()=>alert("delete")}>
              <Icon active name="trash" />
            </Button>}
          leftOpenValue={75}
          rightOpenValue={-75}
        />



    )



  )

  // * CREATING UPCOMING TASKS LIST

  var upcomingTasksList = this.upcomingTasks.length==0? (<Text style={{marginLeft:30}}>You do not have any upcoming tasks</Text>) : (

    <List
        dataSource={this.ds2.cloneWithRows(this.upcomingTasks)}
        renderRow={data =>
          <ListItem>
            <Text> {data.taskTitle} </Text>
          </ListItem>}
        renderLeftHiddenRow={data =>
          <Button full onPress={() => alert(data)}>
            <Icon active name="information-circle" />
          </Button>}
        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          <Button full danger onPress={()=>alert("delete")}>
            <Icon active name="trash" />
          </Button>}
        leftOpenValue={75}
        rightOpenValue={-75}
      />


  )


  return(


      <View style={{flex:1}}>

      <SectionList

        sections = {[{title:'Today\'s tasks',data:this.todaysTasks}, {title:'Upcoming Tasks', data:this.upcomingTasks}]}
        renderItem={({item}) => <ListItem ref={(thisItem) => this[`${item.taskTitle}`] = thisItem}  onPress={this.changeCol(item.taskTitle)}><Text>{item.taskTitle}</Text></ListItem>}
        renderSectionHeader={({section}) => <Text>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />

        <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={this.addTask.bind(this)}
              onLongPress={this.addTask.bind(this)}
            >
              <Ionicons name="ios-add" size={25} />

            </Fab>


    <Button onPress={this.clearList.bind(this)}><Text>Clear List</Text></Button>
      </View>

  )
  }






}


const mapStateToProps = (state)=>{



  return {

    taskList:state.taskList


  }

}

const mapDispatchToProps = (dispatch)=>{

    return {

      taskActions:bindActionCreators(taskActions,dispatch)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
