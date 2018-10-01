import React from 'react'
import {ScrollView,View,AsyncStorage,Text} from 'react-native';
import { Calendar } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Container, Header, Content, Item, Input, Button, Fab } from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as taskActions from '../../Actions/taskActions'

 class NewTask extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      markedDay:{},
      active:'true',
      selectedDate:null,
      taskTitle:""

    },
    this.newTaskDate=null
  }

  select(day) {

  const markedDay = {[day.dateString]:{selected: true, marked: true}}

  this.newTaskDate = new Date(day.year,day.month-1,day.day)
  this.setState({markedDay: markedDay})
}

createNewTask(){

  // * CHECKING IF THE TASK TITLE FIELD IS NULL

  if(this.state.taskTitle!=""){

    if(this.newTaskDate==null){

        this.newTaskDate= new Date();

    }

      //alert(this.newTaskDate)
      // * CREATING UNIQUE TASK_ID

      var d = new Date();
      var timeStamp = d.getTime();
      var taskID = this.state.taskTitle+timeStamp;

      //alert(taskID);
      var newTask = {
        taskID:taskID,
        taskTitle:this.state.taskTitle,
        taskDate:this.newTaskDate,
        isCompleted:false
      }

      this.props.taskActions.addTaskActionCreator(newTask);
      this.props.navigation.navigate('MyList');

}
}
  render(){
    console.log("RENDER")
    dateObj = new Date();
console.log(this.state.selectedDate);
console.log(this.state.selectedDate)

    return(

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'white'}}>

<View style={{flex:0.6}}>

  <ScrollView>
            <Calendar


  // Initially visible month. Default = Date()
  current={this.state.selectedDate}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  markedDates={this.state.markedDay}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined

  // Handler which gets executed on day press. Default = undefined
  onDayPress={this.select.bind(this)}
  // Handler which gets executed on day long press. Default = undefined
  onDayPress={this.select.bind(this)}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={false}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')

  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={false}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={false}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon left. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}

/>
</ScrollView>
      </View>

      <View style={{flex:0.4,backgroundColor:'white',flexDirection: 'row'}}>
        <View style={{flex:0.8}}>
        <Item rounded>
      <Input onChangeText={(text)=>{this.setState({taskTitle:text})}} placeholder='I have to...'/>
    </Item>
  </View>
<View style={{flex:0.2, alignItems: 'center',}}>

  <Ionicons name='ios-add' size={50} color="#5067FF" onPress={this.createNewTask.bind(this)}/>

      </View>



      </View>


        </View>



    )


  }




}

const mapDispatchToProps = (dispatch)=>{

  return {

    taskActions:bindActionCreators(taskActions,dispatch)


  }


}

export default connect(null,mapDispatchToProps)(NewTask);
