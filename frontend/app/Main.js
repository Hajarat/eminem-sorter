import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import StateContext from './StateContext'
import SetStateContext from './SetStateContext'

// My Components
import Footer from './components/Footer'
import Content from './components/Content'
import Header from './components/Header'

function EminemSorter() {
    
    const [flashMessage, setFlashMessage] = useState(null)
    
    return (
        <StateContext.Provider value={flashMessage}>
            <SetStateContext.Provider value={setFlashMessage}>
                <Header/>
                <Content/>
                <Footer/>
            </SetStateContext.Provider>
        </StateContext.Provider>
    )
}

ReactDOM.render(<EminemSorter />, document.querySelector("#app"))

if(module.hot) {
    module.hot.accept()
}