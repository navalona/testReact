
export const TYPES = {
  GET_TASKS_LISTS: 'GET_TASKS_LISTS',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  REORDER_TASK: 'REORDER_TASK'
};

export const getTask = tasks => ({
  type: TYPES.ADD_TASK,
  payload: tasks
})


export const addTaskAction = tasks => ({
    type: TYPES.ADD_TASK,
    payload: tasks
  })

export const removeTaskAction = taskId => ({
  type: TYPES.REMOVE_TASK,
  payload: taskId
})

export const editTaskAction = tasks => ({
  type: TYPES.EDIT_TASK,
  payload: tasks
})

export const reorderTaskAction = tasks => ({
  type: TYPES.REORDER_TASK,
  payload: tasks
})