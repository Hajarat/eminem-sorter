import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import StateContext from './StateContext'
import SetStateContext from './SetStateContext'

// My Components
import Container from './components/Container'
import Footer from './components/Footer'
import Form from './components/Form'
import Content from './components/Content'
import Header from './components/Header'

function EminemSorter() {
    
    const [flashMessage, setFlashMessage] = useState(null)
    
    return (
        <StateContext.Provider value={flashMessage}>
            <SetStateContext.Provider value={setFlashMessage}>
                <BrowserRouter>
                <Header/>
                <Container>
                    <Switch>
                        <Route path="/" exact>
                            <Content/>
                        </Route>
                        <Route path="/sorter" exact>
                            <Form/>
                        </Route>
                    </Switch>
                </Container>
                <Footer/>
                </BrowserRouter>
            </SetStateContext.Provider>
        </StateContext.Provider>
    )
}

ReactDOM.render(<EminemSorter />, document.querySelector("#app"))

if(module.hot) {
    module.hot.accept()
}