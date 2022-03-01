import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { 
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import QuestionLabel from '../Common/QuestionLabel';
import FileSelector from '../Common/FileSelector';
import TextInputButton from '../Common/TextInputButton';

export default function ListQuestion({question, update}) {
    const entries = []

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

    const handleTextAdd = (newValue) => {
        const newQuestion = {...question}
        newQuestion.answer = entries.map(entry => entry.value)
        newQuestion.answer.push(newValue)
        update(newQuestion)
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
            <Box>
                <Stack direction="row">
                    <TextInputButton handleAdd={handleTextAdd} sx={{width: 350}}></TextInputButton>
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
