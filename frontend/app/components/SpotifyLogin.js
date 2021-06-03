import React, { useState, useEffect } from 'react'

import Axios from 'axios'

function SpotifyLogin(props) {
    
    const [authorizeUrl, setAuthorizeUrl] = useState()

    useEffect(() => {
        async function loginToSpotify() {
            const { data } = await Axios.get('/api/login')
            setAuthorizeUrl(data)
        }
        loginToSpotify()
    }, [])

    if(!authorizeUrl || !props.playlist) return <>Loading...</>

    return (
        <div className="spotify">
            <a className="space-right" href={authorizeUrl}>
                Generate Spotify Playlist!
            </a>
            {props.playlist.map(song => {
                return (
                    <>{song}</>
                )
            })}
        </div>
    )
}

export default SpotifyLogin