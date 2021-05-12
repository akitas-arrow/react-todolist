import React,{ useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components'
import { Color } from './shared/style'

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
            <InputField>
                <input
                    type="text" value={name}
                    onChange={handleChange} placeholder="タスクを入力してください"
                />
            </InputField>
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

const InputField = styled.div`
    padding: 16px;
    input {
        width: 100%;
        border: 2px solid #b3b3b3;
        border-radius: 5px;
        outline: none;
        padding: 4px;
        &:focus {
            border-color: ${Color.main};
        }
    }
`

const Button = styled.div`
    color: ${Color.main};
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    &:hover {
        background-color: rgba(0,190,212,0.1);
    }
`

export default Form
