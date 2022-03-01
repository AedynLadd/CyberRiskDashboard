import { Box, Button, Stack, TextField } from '@mui/material';
import FileIcon from '@mui/icons-material/FileOpen';
import React from 'react';

export default function FileSelector({onFileSelect, initialValue, showSelection}) {
    const textField = React.useRef();
    const openCsvDialog = () => {
        electron.dialogApi.open().then(result => {
            if (result) {
                onFileSelect(result)
                showSelection ? textField.current.value = result : null
            }
        })
    }

    return (
        <Box>
            <Stack direction="row" sx={{width: 1, height: 1}}>
                {showSelection ? <TextField
                    inputRef={textField}
                    variant="outlined"
                    disabled={true}
                    defaultValue={initialValue}
                    sx={{
                        width: 1,
                        paddingRight: 2
                    }}
                ></TextField> : null}
                <Button
                    onClick={openCsvDialog}
                    endIcon={<FileIcon />}
                >
                    Select
                </Button>
            </Stack>
        </Box>
    );
}
