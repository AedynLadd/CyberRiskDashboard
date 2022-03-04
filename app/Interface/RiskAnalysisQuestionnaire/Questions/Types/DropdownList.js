import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { 
    Box,
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';

import QuestionLabel from '../Common/QuestionLabel';

export default function CheckboxList({question, update}) {
    const entries = []
    const checked = question.answer

    question.values.map(value => {
        entries.push({
            key: uuidv4(),
            value: value
        })
    })

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        const newQuestion = {...question}
        newQuestion.answer = newChecked
        update(newQuestion)
    }

    return (
        <>
            <QuestionLabel question={question} />
            <Box sx={{m: 1}}>
                <List>
                    {entries.map(entry => (
                        <ListItem
                            key={entry.key}
                            secondaryAction={
                                <Checkbox 
                                    edge="end" 
                                    onChange={handleToggle(entry.value)}
                                    checked={checked.indexOf(entry.value) !== -1}
                                />
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
