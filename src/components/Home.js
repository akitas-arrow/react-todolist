import React,{ useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider'
import { makeStyles } from '@material-ui/core/styles'
import FilterButton from './FilterButton';
import Form from './Form';
import Todo from './Todo';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import {db, auth} from '../firebase/index'
import styled from 'styled-components'
import { Color } from './shared/style'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)

  useEffect (() => {
    const observer = db.collection('todoList').where("userId", "==", currentUser.uid).onSnapshot(querySnapshot => {
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
  },[currentUser.uid]);

  // フィルターのデータを入れたオブジェクトを作る
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // タスクを追加する
  const addTask = (name, uid) => {
    const data = { name: name,
      userId: uid, completed: false, createAt: new Date()};
    db.collection('todoList').add(data)
  }

  // タスクを完了する
  const toggleTaskCompleted = (id) => {
    tasks.map(task => {
      if (id === task.id) {
        db.collection('todoList').doc(id).update({ completed: !task.completed })
      }
      return task;
    });
  }

  // タスクを削除する
  const deleteTask = (id) => {
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
        if (id === task.id) {
          db.collection('todoList').doc(id).update({
            name: newName
          })
        }
        return task;
    });
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
      <Header>
        <select onChange={e => setFilter(e.target.value)} className={classes.select}>
          {filterList}
        </select>
        <LogoutButton onClick={() => auth.signOut()}>
          <ExitToAppIcon style={{color:'#fff'}} fontSize="large"/>
          ログアウト
        </LogoutButton>
      </Header>
      <Form addTask={addTask} handleClose={handleClose} open={open}/>
      <Container maxWidth="sm">
          <h1>MY TODO</h1>
          <List>
            {taskList}
          </List>
      </Container>
      <Fab aria-label="add" className={classes.fab} onClick={handleClickOpen} style={{backgroundColor:'#00bed4'}}>
        <AddIcon style={{color:'#fff'}}/>
      </Fab>
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 80px;
  background-color: ${Color.main};
  position: fixed;
  top:0;
  left:0;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 
  0px 4px 5px 0px rgb(0 0 0 / 14%), 
  0px 1px 10px 0px rgb(0 0 0 / 12%);
  padding: 16px;
  select {
    background: rgba(255,255,255,0.2);
    border: none;
    color: ${Color.white};
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
    &:focus {
      outline: none;
    }
  }
`

const LogoutButton = styled.div`
  display: flex;
  cursor: pointer;
  color: ${Color.white};
  align-items: center;
  padding: 0 8px;
  border-radius: 4px;
  margin-left: 16px;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`

const Container = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding-top: 120px;
  h1 {
    font-size: 24px;
  }
`

export default Home;
