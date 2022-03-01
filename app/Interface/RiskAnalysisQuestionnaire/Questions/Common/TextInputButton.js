import React from 'react'
import { useRef } from 'react';


import { 
    Box,
    Stack,
    TextField,
    Button
} from '@mui/material';

export default function({handleAdd, placeholder, sx}) {
    const inputRef = useRef()

    const handleTextAdd = () => {
        const newValue = inputRef.current.value;
        if (!newValue) return
        inputRef.current.value = ""

        handleAdd(newValue);
    }

    const handleTextKeyPress = e => {
        if (e.key === "Enter") {
            handleTextAdd()
        }
    }

    return (
        <Box sx={sx}>
            <Stack direction="row" sx={{flex: 1}}>
                <TextField
                    inputRef={inputRef}
                    sx={{
                        maxWidth: 300,
                        m: 1,
                        flex: 1
                    }}
                    placeholder={placeholder ? placeholder : "Enter here"}
                    variant="standard"
                    onKeyPress={handleTextKeyPress}
                ></TextField>
                <Button
                    onClick={handleTextAdd}
                >Add</Button>
            </Stack>
        </Box>
    )
}
