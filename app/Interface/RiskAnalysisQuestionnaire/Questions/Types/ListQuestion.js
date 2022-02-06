import React from 'react';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { 
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import QuestionLabel from '../Common/QuestionLabel';
import FileSelector from '../Common/FileSelector';

export default function ListQuestion({question, update}) {
    const entries = []
    const inputRef = useRef()

    question.answer.sort().map(value => {
        entries.push({
            key: uuidv4(),
            value: value
        })
    })

    const handleRemoveItem = toRemove => {
        const newQuestion = {...question}
        newQuestion.answer = entries
                .filter(entry => entry.key !== toRemove.key)
                .map(entry => entry.value)
        update(newQuestion)
    }

    const handleTextAdd = () => {
        const newValue = inputRef.current.value;
        if (!newValue) return
        inputRef.current.value = ""

        const newQuestion = {...question}
        newQuestion.answer = entries.map(entry => entry.value)
        newQuestion.answer.push(newValue)
        update(newQuestion)

    }

    const handleTextKeyPress = e => {
        if (e.key === "Enter") {
            handleTextAdd()
        }
    }

    const handleFileSelection = (filePath) => {
        if (filePath) {
            const skipHeader = false;
            electron.fileSystemApi.readCSV(filePath, skipHeader).then(content => {
                const newQuestion = {...question}
                newQuestion.answer = entries
                        .map(entry => entry.value)
                        .concat(content.flat())
                update(newQuestion)
            })
        }
    }

    return (
        <>
            <QuestionLabel question={question} />
            <Box sx={{m: 1}}>
                <Stack direction="row">
                    <TextField
                        inputRef={inputRef}
                        sx={{
                            display: "flex",
                            maxWidth: 300,
                            m: 1,
                            flexWrap: 'wrap',
                            flex: 'flex-grow'
                        }}
                        placeholder="Enter here"
                        variant="standard"
                        onKeyPress={handleTextKeyPress}
                    ></TextField>
                    <Button
                        onClick={handleTextAdd}
                    >Add</Button>
                    <FileSelector
                        onFileSelect={handleFileSelection}
                        showSelection={false}
                    ></FileSelector>
                </Stack>
            </Box>
            <Box sx={{m: 1}}>
                <List>
                    {entries.map(entry => (
                        <ListItem
                            key={entry.key}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleRemoveItem(entry)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton dense>
                                <ListItemText primary={entry.value} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
}
