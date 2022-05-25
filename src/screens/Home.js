import React, { useState, useEffect } from 'react';
import { StatusBar, Text, StyleSheet, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Modal, Image, Switch, Alert, KeyboardAvoidingView } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import TaskComponent from '../components/TaskComponent';
import { makeid } from '../utils/utils';
import CheckBox from '@react-native-community/checkbox';
import { NestableScrollContainer, NestableDraggableFlatList } from 'react-native-draggable-flatlist';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAction, removeTaskAction, editTaskAction, reorderTaskAction } from '../actions/TaskActions';
import taskService from '../services/TaskService';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  //task from storage
  const { tasks, tasksDone, taskToDo } = useSelector(state => state.taskReducer);
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isUpdatingTask, setIsUpdating] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [isFiltering, setIsFiltering] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [toggleDone, setToggleDone] = useState(false)
  const [toggleUndone, setToggleUndone] = useState(true)
  const [toggleAll, setToggleAll] = useState(false)
  const [isDone, setIsDone] = useState(false)

  //actions onPress button
  const toggleSwitch = () => setIsDone(previousState => !previousState);

  const resetTaskForm = () => {
    setIsDone(false)
    setTitle('')
    setDescription('')
  }

  const addTask = () => {
    if (title !== "" && description !== "") {
      Keyboard.dismiss();
      setIsAddingTask(false)
      let task = {
        id: makeid(15),
        title,
        description,
        status: isDone,
        priority: tasks.length
      }
      dispatch(addTaskAction(task))
      taskService.addTaskToList(task)

    } else {
      Alert.alert(
        "",
        "Please fill all the fields",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
          }
        ]
      );

    }
  }

  const onChangeTitle = (text) => {
    setTitle(text)
  }

  const onChangeDescription = (text) => {
    setDescription(text)
  }

  const removeTask = (index) => {
    Alert.alert(
      "",
      "Are you sure you want to delete this task",
      [
        {
          text: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(removeTaskAction(index))
            setIsAddingTask(false)
            setIsUpdating(false)
          }
        }
      ],
      { cancelable: true }
    );
  }

  const showEditTask = (index) => {
    let itemArray = tasks.filter(element => element.id === index)
    if (itemArray.length > 0) {
      let item = itemArray[0]
      setTaskToEdit(item)
      setTitle(item.title)
      setDescription(item.description)
      setIsDone(item.status)
      setIsUpdating(true)
      setIsAddingTask(false)
    }
  }

  const editTask = () => {
    Keyboard.dismiss();
    if (title !== "" && description !== "") {
      let itemArray = tasks.filter(element => element.id !== taskToEdit.id)
      let task = {
        id: taskToEdit.id,
        title,
        description,
        status: isDone,
        priority: taskToEdit.priority
      }
      itemArray.push(task)
      itemArray = itemArray.sort((a, b) => (a.priority.value > b.priority.value) ? 1 : -1)
      dispatch(editTaskAction(task))
      setIsUpdating(false)
      setIsAddingTask(false)
    } else {
      Alert.alert(
        "",
        "Please fill all the fields",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),

          }
        ]
      );

    }
  }

  const fetchData = () => {
    if (toggleAll) {
      return tasks.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
    } else {
      if (toggleDone) {
        return tasksDone.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
      } if (toggleDone && toggleUndone) {
        return tasks.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
      } else {
        return taskToDo.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
      }
    }
  }

  const renderDragableitem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => showEditTask(item.id)}
      //disabled={item.status}
      >
        <TaskComponent text={item} edit={() => { showEditTask(item.id) }} />
      </TouchableOpacity>
    )
  }

  const updateTaskPriority = (items) => {
    let orderedItems = []
    let itemToOrder = [...items]
    itemToOrder.forEach((item, key) => {
      item.priority = key
      orderedItems.push(item)
    })

    return orderedItems
  }

  useEffect(() => {
    resetTaskForm()
  }, [!isAddingTask])

  return (
    <>

      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My tasks</Text>
          <TouchableOpacity onPress={() => {
            setIsFiltering(true)
          }}>
            <View >
              <Image
                source={require('images/icons-filter.png')}
                style={styles.filterImage}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setIsAddingTask(true)
            setIsUpdating(false)
          }}>
            <View style={styles.addContainer}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <NestableScrollContainer
          contentContainerStyle={{
            flexDirection: 'column',
            paddingTop: 20,
          }}
        >
          <NestableDraggableFlatList
            data={fetchData()}
            onDragEnd={({ data }) => dispatch(reorderTaskAction(updateTaskPriority(data)))}
            keyExtractor={(item) => item.id}
            renderItem={renderDragableitem}
          />
        </NestableScrollContainer>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddingTask || isUpdatingTask}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} style={styles.modalRoot} activeOpacity={1}>
          <View
            style={
              styles.modalWrapper
            }>
            <View style={styles.head}>
              <Text style={styles.title}>{isAddingTask ? 'Add' : 'Edit'} task</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsUpdating(false)
                  setIsAddingTask(false)
                }}
                style={styles.closeButton}>
                <Image
                  source={require('images/CloseBlackBackground.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldConainer}>
              <Text>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Title"

              />
            </View>
            <View style={styles.fieldConainer}>
              <Text>Description</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={description}
                onChangeText={onChangeDescription}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid='transparent'
                placeholder="Description"
              />
            </View>
            <View style={styles.fieldConainer}>
              <Text>Status</Text>
              <View style={styles.switchContainer}>
                <Text>Done</Text>
                <Switch
                  trackColor={{ false: "#ccc", true: "green" }}
                  thumbColor={isDone ? "white" : "grey"}
                  ios_backgroundColor="#gray"
                  onValueChange={toggleSwitch}
                  value={isDone}
                />
              </View>
              {
                isAddingTask &&
                <TouchableOpacity style={[styles.taskButton, styles.addTaskButton]} onPress={addTask}>
                  <Text style={styles.textAddButton}>Add</Text>
                </TouchableOpacity>
              }
              {
                isUpdatingTask &&
                <View style={styles.formBtnContainer}>
                  <TouchableOpacity style={[styles.taskButton, styles.deleteButton]} onPress={() => removeTask(taskToEdit.id)}>
                    <Text style={styles.textAddButton}>Delete</Text>
                  </TouchableOpacity>
                  {!taskToEdit.status &&
                    <TouchableOpacity style={[styles.taskButton, styles.addTaskButton]} onPress={editTask}>
                      <Text style={styles.textAddButton}>Save</Text>
                    </TouchableOpacity>
                  }
                </View>
              }

              <View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFiltering}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} style={styles.modalRoot} activeOpacity={1}>
          <View
            style={
              styles.modalWrapper
            }>
            <View style={styles.head}>
              <Text style={styles.title}>Filter task</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsFiltering(false)
                }}
                style={styles.closeButton}>
                <Image
                  source={require('images/CloseBlackBackground.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.filterMainWrapper}>
              <View style={styles.filterItemContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleDone}
                  onValueChange={(newValue) => setToggleDone(newValue)}
                />
                <Text>Done</Text>
              </View>
              <View style={styles.filterItemContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleUndone}
                  onValueChange={(newValue) => setToggleUndone(newValue)}
                />
                <Text>To do</Text>
              </View>
              <View style={styles.filterItemContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleAll}
                  onValueChange={(newValue) => setToggleAll(newValue)}
                />
                <Text>All</Text>
              </View>
              <TouchableOpacity style={[styles.taskButton, styles.addTaskButton]} onPress={() => setIsFiltering(false)}>
                <Text style={styles.textAddButton}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: "100%",
  },
  textarea: {
    textAlignVertical: 'top'
  },
  addContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
  },
  modalWrapper: {
    backgroundColor: 'white',
    height: '95%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: 'gray',
    padding: 25,
  },
  closeImage: {
    width: 30,
    height: 30,
    opacity: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    alignItems: 'flex-end'
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 10,
  },
  addTaskButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#DC143C',
  },
  textAddButton: {
    color: 'white'
  },
  fieldConainer: {
    marginHorizontal: 0,
    marginVertical: 10,
  },
  filterImage: {
    width: 28,
    height: 28,
    marginHorizontal: 7,
  },
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterMainWrapper: {
    padding: 15,
  }
});
