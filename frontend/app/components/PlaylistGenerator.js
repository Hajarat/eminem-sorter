import React, { useEffect } from "react"

import Axios from 'axios'

function PlayListGenerator() {
    const dummyPlaylist = ["spotify:track:7ccTcabbJlCJiIqtrSSwBk", "spotify:track:0q2vG0UVuy6ajjcpkQHdZM", "spotify:track:0GQ5bFTVFFKpwNPc7KwQnB", "spotify:track:0VSzREd1OjEWJ9tXoFHRQH"]
    async function loginToSpotify() {
        await Axios.get('http://localhost:8888/login')
    }

    return (
        <button className="space-right" onClick={loginToSpotify}>
            Generate Spotify Playlist!
        </button>
    )
}

export default PlayListGenerator