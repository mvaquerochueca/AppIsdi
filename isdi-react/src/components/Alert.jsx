import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Snackbar from '@material-ui/core/Snackbar'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
    snackbar: {
        margin: theme.spacing(2),
        transition: 'transform 1s ease-in-out',
        transform: 'scale(0)',
    },
    open: {
        transform: 'scale(1)',
    },
}))

export default function CustomAlert({ message, onAccept }) {
    const classes = useStyles()

    const [open, setOpen] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose()
        }, 2200)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setOpen(false)
        if (onAccept) {
            onAccept()
        }
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={2200}
            onClose={handleClose}
            message={message}
            className={`${classes.snackbar} ${open ? classes.open : ''}`} // Agregar clase de apertura durante la apertura
            action={
                <Button color="secondary" size="small" onClick={handleClose}>
                    Accept
                </Button>
            }
        />
    )
}
