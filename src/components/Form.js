import React,{ useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const Form = ({addTask, handleClose, open}) => {
    const [name, setName] = useState('')
    const { currentUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        if(name === '') {
            alert("入力欄が空白です");
            return false
        }else{
            e.preventDefault()
            addTask(name, currentUser.uid);
            setName('')
            handleClose()
            return true
        }
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleClickClose = () => {
        handleClose()
        setName('')
    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            component='form'
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>新しいタスクを作成しよう！</DialogTitle>
            <DialogContent>
                <TextField
                    type="text"
                    value={name}
                    onChange={handleChange}
                    required={true}
                    fullWidth
                    id="outlined-basic"
                    label="タスクを入力してください"
                    variant="outlined" 
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickClose} color="primary">
                    キャンセル
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    autoFocus>
                    作成
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Form
