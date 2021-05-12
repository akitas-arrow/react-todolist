import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components'
import { Color } from './shared/style'

const EditForm  = ({name, open, handleChange, handleSubmit, handleClose}) => {
    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            component='form'
            open={open}
            onClose={open}
        >
            <DialogTitle><Span>"{name}"</Span>を編集しよう！</DialogTitle>
            <InputField>
                <input
                    type="text"
                    onChange={handleChange} placeholder="タスクを入力してください"
                />
            </InputField>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    キャンセル
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    autoFocus>
                    保存
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

const Span = styled.span`
    color: ${Color.main};
`

export default EditForm
