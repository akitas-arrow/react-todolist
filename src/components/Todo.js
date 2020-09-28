import React,{ useState } from 'react'

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = ({editTask, id, completed, toggleTaskCompleted, name, deleteTask}) => {
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

    const editingTemplate = (
        <form onSubmit={handleSubmit}>
            <TextField type="text" onChange={handleChange} required={true}/>
            <ListItemSecondaryAction>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button type="button" onClick={() => setEditing(false)}>
                        キャンセル
                    </Button>
                    <Button type="submit">
                        保存
                    </Button>
                </ButtonGroup>
            </ListItemSecondaryAction>
        </form>
    );

    const viewTemplate = (
        <>
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
            <IconButton type="button" onClick={() => setEditing(true)}>
                <EditIcon />
            </IconButton>
            <IconButton
                edge="end"
                type="button"
                onClick={() => deleteTask(id)}
            >
                <DeleteIcon />
            </IconButton>
        </>
    );
    
    return (
            <ListItem  alignItems="flex-start">
                {isEditing ? editingTemplate : viewTemplate}
            </ListItem>
    )
}

export default Todo
