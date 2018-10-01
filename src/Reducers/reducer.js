import { REHYDRATE } from 'redux-persist';


// * REDUCER

var initialState = {

  taskList :[]


}


export default function reducer(state=initialState,action){


  switch(action.type){

    case REHYDRATE:
      return {
        ...state
      };

    case "ADD_TASK" :

    //state.taskList.push(action.payload);
    //console.log(state.taskList)
    var tempTaskList = [];
    state.taskList.push(action.payload);
    //console.log(state.taskList)
    for(var i=0;i<state.taskList.length;i++){

      tempTaskList.push(state.taskList[i]);

    }
    //console.log(tempTaskList)

    return {
      ...state,
      taskList:tempTaskList

    }

    case "CLEAR_LIST" :


    var tempArr = [];
    return {

      taskList:tempArr

    }

    default:

      return{
        ...state
      }



  }





}
