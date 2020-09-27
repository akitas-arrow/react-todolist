import React,{ useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import {db} from './firebase/index'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent:'space-between'
  },
  cBox: {
    paddingTop:24,
    marginTop: 80, 
    // backgroundColor: "pink",
  }
}));

const App = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedTodo, setIsChangedTodo] = useState(false);

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection("todoList").doc("todos").get();
      setTasks(resTodo.data().tasks);
      setIsLoading(false);
    })()
  }, [db])

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true)
        const docRef = await db.collection('todoList').doc('todos');
        docRef.update({ tasks: tasks })
        setIsLoading(false)
      })()
    }
  }, [tasks, isChangedTodo, db])

  // フィルターのデータを入れたオブジェクトを作る
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  // タスクを追加する
  const addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    setIsChangedTodo(true);
  }

  // タスクを完了する
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // スプレッドを使って新しいオブジェクトを作る
        // completedが反転される
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsChangedTodo(true);
  }

  // タスクを削除する
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    setIsChangedTodo(true);
  }

  // タスクを編集する
  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      // このタスクが編集されたタスクと同じIDを持っている場合
        if (id === task.id) {
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList);
      setIsChangedTodo(true);
  }

  // Todoコンポーネントにしてリスト化する
  const taskList = tasks
  .filter(task => FILTER_MAP[filter](task))
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
    />
  ));
  

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className={classes.toolbar}> 
          <h1>My ToDo</h1>
            <select onChange={e => setFilter(e.target.value)}>
              {filterList}
            </select>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={classes.cBox}>
        {/* <button onClick={updateTodoList}>追加する</button> */}
        <Form addTask={addTask}/>
        <List>
          {taskList}
        </List>
      </Container>
    </>
  );
}

export default App;
