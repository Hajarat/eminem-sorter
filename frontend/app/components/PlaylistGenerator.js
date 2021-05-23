import React, { useState, useEffect } from 'react'

import Axios from 'axios'

function PlayListGenerator(props) {
    
    const [authorizeUrl, setAuthorizeUrl] = useState()

    async function loginToSpotify() {
        const { data } = await Axios.get('/api/login').catch((err) => {
            if(err.response) {
                console.log("Use effect axios returns with the following")
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (err.request) {
                // The request was made but no response was received
                console.log("The axios request received no response")
                console.log(err.request)
            } else {
                console.log(err.message)
            }
        })
        setAuthorizeUrl(data)
    }

    useEffect(() => {
        loginToSpotify()
    }, [])

    useEffect(() => {
        console.log(props.playlist.items)
    })

    if(!authorizeUrl) return <>Loading...</>

    return (
        <a className="space-right" href={authorizeUrl}>
            Generate Spotify Playlist!
        </a>
    )
}

export default PlayListGenerator