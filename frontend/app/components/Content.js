import React, { useEffect } from "react"

import { Link } from 'react-router-dom'

function Content() {
    return (
        <div>
            <h1>Welcome to MTBMB Sorter</h1>
            <p>Join us in This fun but equally brutal way to determine your favorites to least favorites from both sides (A&B) of the MTBMB albums.</p>
            <p>This will hopefully be the first of many experiments on this site.</p>
            <p>Watch us both do this:</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/FQLbCfTGqWE" title="YouTube video player" frameBorder="3" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="embedded-video" />
            <p>We though we would get more polarizing results...</p>
            <Link to="/sorter" role="button">Create my list</Link>
        </div>
    )
}

export default Content