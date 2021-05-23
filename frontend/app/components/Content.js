import React, { useEffect } from "react"

// My Components
import Container from './Container'
import Form from './Form'
import FlashMessages from './FlashMessages'

function Content() {
    return (
        <Container>
            <h1>Welcome to Music To Be Murdered By Sorter</h1>
            <p>You're going to make binary choices. For each choice select your favorite song from the two. We'll create your ordered list of favorites as you go. Only songs from Music to be murdered by side A & Music to be murdered by side B will be used.</p>
            <FlashMessages />
            <Form />
        </Container>
    )
}

export default Content