import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function PlaylistDisplay() {


    const search = useLocation().search
    const playlistURL = new URLSearchParams(search).get('playlistURL')

    return (
        <div>
            Playlist: {playlistURL}
        </div>
    )
}

export default PlaylistDisplay