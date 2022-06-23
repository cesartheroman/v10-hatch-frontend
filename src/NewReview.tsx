import React from "react";

import { Card, Button, Box, Label, Input } from '@twilio-paste/core'

const NewReview = () => {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('posted')
    }
    const handleChange = () => {
        console.log('handle change')
    }

    return (
        <div style={{maxWidth: 600, padding: 10, margin: 10}}>
        <Card style={{margin: '10px'}}>
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Review:</h1>
                <p>Please answer the following questions:</p>
                <Box marginBottom="space80" style= {{width: '500px'}}>
                    <Label htmlFor="q1" required>Question 1</Label>
                    <Input id="q1" name="q1" type="text" onChange={handleChange} required />
                </Box>
                <Box marginBottom="space80" style= {{width: '500px'}}>
                    <Label htmlFor="q2" required>Question 2</Label>
                    <Input id="q2" name="q2" type="text" onChange={handleChange} required />
                </Box>
                <Box marginBottom="space80" style= {{width: '500px'}}>
                    <Label htmlFor="q3" required>Question 3</Label>
                    <Input id="q3" name="q3" type="text" onChange={handleChange} required />
                </Box>
                <Button type="submit" variant="primary">Submit</Button>
            </form>
        </div>
        </Card>
        </div>
    )
}

export default NewReview;