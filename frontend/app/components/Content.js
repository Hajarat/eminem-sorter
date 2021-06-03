import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// My Components
import Container from './Container'
import Form from './Form'
import FlashMessages from './FlashMessages'
import PlaylistDisplay from './PlaylistDisplay'

function Content() {
    return (
        <Container>
            <h1>Welcome to Music To Be Murdered By Sorter</h1>
            <p>You're going to make binary choices. For each choice select your favorite song from the two. We'll create your ordered list of favorites as you go. Only songs from Music to be murdered by side A & Music to be murdered by side B will be used.</p>
            <FlashMessages />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Form} />
                    <Route path="/display" component={PlaylistDisplay} />
                </Switch>
            </BrowserRouter>
        </Container>
    )
}

export default Content