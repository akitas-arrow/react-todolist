import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { nanoid } from "nanoid";
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import {db} from './firebase/index'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false)

  useEffect (() => {
    const observer = db.collection('todoList').onSnapshot(querySnapshot => {
      const _tasks = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setTasks(_tasks)
    });
    return () => {
      observer();
    };
  },[]);

  // フィルターのデータを入れたオブジェクトを作る
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // タスクを追加する
  const addTask = async (name) => {
    // const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    const data = { name: name, completed: false };
    await db.collection('todoList').doc(nanoid()).set(data)
    // const snapshot = await db.collection('todoList').get();
    // const newTasks = [];
    // snapshot.forEach(doc => {
    //   newTasks.push({
    //     id: doc.id,
    //     ...doc.data()
    //   })
    // })
    // setTasks(newTasks); 
  }

  // タスクを完了する
  const toggleTaskCompleted = (id) => {
    // const updatedTasks = tasks.map(task => {
    //   // このタスクが編集されたタスクと同じIDを持っている場合
    //   if (id === task.id) {
    //     // スプレッドを使って新しいオブジェクトを作る
    //     // completedが反転される
    //     // return {...task, completed: !task.completed}
    //     db.collection('todoList').doc(id).update({ completed: !task.completed})
    //   }
    tasks.map(task => {
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // スプレッドを使って新しいオブジェクトを作る
        // completedが反転される
        // return {...task, completed: !task.completed}
        db.collection('todoList').doc(id).update({ completed: !task.completed })
      }
      return task;
    });
    // setTasks(updatedTasks);
  }

  // タスクを削除する
  const deleteTask = (id) => {
    // const remainingTasks = tasks.filter(task => id !== task.id);
    // setTasks(remainingTasks);
    tasks.map(task => {
      if (id === task.id) {
        db.collection('todoList').doc(id).delete();
      }
      return task;
    })
  }

  // タスクを編集する
  const editTask = (id, newName) => {
    tasks.map(task => {
      // このタスクが編集されたタスクと同じIDを持っている場合
        if (id === task.id) {
          // return {...task, name: newName}
          db.collection('todoList').doc(id).update({
            name: newName
          })
        }
        return task;
    });
    // setTasks(editedTaskList);
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
      <AppBar>
        <Toolbar> 
          <h1 className={classes.title}>My ToDo</h1>
            <Select native onChange={e => setFilter(e.target.value)}>
              {filterList}
            </Select>
        </Toolbar>
      </AppBar>
      <Form addTask={addTask} handleClose={handleClose} open={open}/>
      <Container maxWidth="sm">
        <Box component='div' mx={0} mt={12}>
          <List>
            {taskList}
          </List>
        </Box>
      </Container>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </>
  );
}

export default App;
