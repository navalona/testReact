import { TYPES } from '../actions/TaskActions';

const initialState = {
  tasks: [],
  tasksDone: [],
  taskToDo: []
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_TASKS_LISTS:
      return { ...state, tasks: action.payload };
    case TYPES.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload], taskToDo: [...state.taskToDo, action.payload] };
    case TYPES.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(element => element.id !== action.payload),
        taskToDo: state.taskToDo.filter(element => element.id !== action.payload),
        tasksDone: state.tasksDone.filter(element => element.id !== action.payload)
      };

    case TYPES.EDIT_TASK:
      const task = action.payload
      let array = state.tasks
      let arrayDone = state.tasksDone
      let arrayTodo = state.taskToDo
      array = array.filter(element => element.id !== task.id)
      arrayDone = arrayDone.filter(element => element.id !== task.id)
      arrayTodo = arrayTodo.filter(element => element.id !== task.id)
      array.push(task)
      if (task.status) {
        arrayDone.push(task)
      } else {
        arrayTodo.push(task)
      }

      return {
        ...state,
        tasks: array,
        tasksDone: arrayDone,
        taskToDo: arrayTodo
      };
    case TYPES.REORDER_TASK:
      return {
        ...state,
        tasks: action.payload,
        taskToDo: state.taskToDo,
        tasksDone: state.tasksDone,
      };
    default:
      return state;
  }
}
