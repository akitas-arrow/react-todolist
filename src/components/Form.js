import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
    },
    input: {
        flex: 1,
    },
    btn: {
        marginLeft: 16
    }
}));

const Form = ({addTask}) => {
    const classes = useStyles();
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(name);
        setName('')
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <TextField className={classes.input}
                underlinestyle={{display: 'none'}}
                type="text"
                value={name}
                onChange={handleChange}
                required={true}
            />
            <Button variant="contained" color="primary" type="submit" className={classes.btn}>
                追加
            </Button>
        </form>
    )
}

export default Form
