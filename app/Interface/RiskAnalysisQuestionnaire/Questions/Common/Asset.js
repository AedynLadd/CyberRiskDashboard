import { Delete } from '@mui/icons-material'
import { Card, IconButton, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import { DEFAULT_IMPACT, DEFAULT_POA } from './Defaults'
import TextInputButton from './TextInputButton'
import Threat from './Threat'
import Vulnerability from './Vulnerability'

export default function ({asset, update, remove}) {
    if (!asset.threats) {
        asset.threats = []
    }

    const handleRemove = () => {
        remove(asset.name)
    }

    const handleVulnerabilityChange = (vulnerability) => {
        asset.vulnerability = vulnerability;
        update(asset);
    }

    const handleThreatChange = (threat) => {
        const newThreats = [...asset.threats]
        const threatIndex = newThreats.findIndex(t => t.name === threat.name)
        newThreats.splice(threatIndex, 1, threat)

        asset.threats = newThreats
        update(asset)
    }

    const addThreat = (name) => {
        if (asset.threats.findIndex(t => t.name === name) >= 0) {
            console.log("Cannot add a duplicate threat")
            return
        }

        asset.threats.push({
            name: name,
            impact: DEFAULT_IMPACT,
            poa: DEFAULT_POA
        })
        update(asset)
    }

    return (
        <Card variant="outlined" sx={{border: '1px solid black', flex: 1, p: 1, marginBottom: 1}}>
            <Stack direction="row" sx={{ flex: 1}}>
                <Typography variant="h6" sx={{ flex: 1}}>{asset.name}</Typography>
                <IconButton onClick={handleRemove}><Delete/></IconButton>
            </Stack>

            <Vulnerability vulnerability={asset.vulnerability} update={handleVulnerabilityChange} />

            {
                asset.threats.map(threat => <Threat
                    key={threat.name}
                    threat={threat}
                    update={handleThreatChange}
                    sx={{marginTop: 1}}
                />)
            }
            <TextInputButton 
                handleAdd={addThreat}
                placeholder="Enter threat name"
                sx={{flex: 1, marginTop: 1}}/>
        </Card>
    )
}
