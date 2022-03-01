import React from 'react'
import { 
    Box,
    Stack,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Tooltip
} from '@mui/material'

export default function Threat({threat, update, sx}) {
    if (!threat) {
        threat = {}
    }

    const handleNameChange = (e) => {
        threat.name = e.target.value
        update(threat)
    }

    const handleImpactChange = (e) => {
        threat.impact = e.target.value
        update(threat)
    }

    const handlePOAChange = (e) => {
        threat.poa = e.target.checked
        update(threat)
    }

    return (
        <Box sx={sx}>
            <Stack direction="row" sx={{flex: 1}}>
                <TextField
                    value={threat.name}
                    onChange={handleNameChange}
                    placeholder="Enter threat name"
                    sx={{flex: 1, m: 1}}
                ></TextField>

                <Select
                    sx={{minWidth: 120, m: 1}}
                    displayEmpty
                    onChange={handleImpactChange}
                    value={threat.impact}
                >
                    <MenuItem value="LOW">
                        Low
                    </MenuItem>
                    <MenuItem value="MEDIUM">
                        Medium
                    </MenuItem>
                    <MenuItem value="HIGH">
                        High
                    </MenuItem>
                </Select>

                <Tooltip title="Plan of Action" placement="top">
                    <FormControlLabel
                        control={<Checkbox checked={threat.poa} onChange={handlePOAChange}/>}
                        label="POA"
                        labelPlacement="top"
                    />
                </Tooltip>
            </Stack>
        </Box>
    )
}
