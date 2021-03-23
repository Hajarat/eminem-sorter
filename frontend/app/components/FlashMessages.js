import React, { useEffect, useContext } from "react"

import StateContext from '../StateContext'

function FlashMessages() {
    const appState = useContext(StateContext)
    return (
        <div className="flash">
            {appState}
        </div>
    )
}

export default FlashMessages