import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditForm from './EditForm'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    li: {
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

const Todo = ({editTask, id, completed, toggleTaskCompleted, name, deleteTask}) => {
    const classes = useStyles();
    const [ isEditing, setEditing ] = useState(false);
    const [newName, setNewName] = useState('');

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editTask(id, newName)
        setNewName("")
        setEditing(false);
    }

    const handleClickOpen = () => {
        setEditing(true);
    };
    
    const handleClose = () => {
        setEditing(false);
    };

    return (
        <>
            <ListItem  className={classes.li}>
                <ListItemIcon >
                    <Checkbox
                        edge='start'
                        id={id}
                        checked={completed}
                        onChange={() => toggleTaskCompleted(id)}
                    />
                </ListItemIcon>
                <ListItemText
                    htmlFor={id}
                    primary={name}
                />
                <IconButton type="button" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    type="button"
                    onClick={() => deleteTask(id)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <EditForm
                open={isEditing}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
            />
        </>
    )
}

export default Todo
