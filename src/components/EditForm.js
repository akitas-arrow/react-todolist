import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const EditForm  = ({name, open, handleChange, handleSubmit, handleClose}) => {
    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            component='form'
            open={open}
            onClose={open}
        >
            <DialogTitle>編集</DialogTitle>
            <DialogContent>
                <TextField
                    type="text"
                    onChange={handleChange}
                    required={true}
                    fullWidth
                    id="outlined-basic"
                    label={name}
                    variant="outlined" 
                />
            </DialogContent>
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

export default EditForm 
