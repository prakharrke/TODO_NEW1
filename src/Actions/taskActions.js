
export function addTaskAction(taskData){


  return {

    type:"ADD_TASK",
    payload:taskData


  }



}

export function clearListAction(){

  return {

    type:"CLEAR_LIST"

  }


}




// * ADD_TASK ACTION CREATOR

exports.addTaskActionCreator = (taskData) => {

alert(taskData.taskID+"\n"+taskData.taskTitle);

  return (dispatch) => {

    dispatch(addTaskAction(taskData));

  }


}

exports.clearListActionCreator = () => {

  return (dispatch) => {

    dispatch(clearListAction());



  }


}
