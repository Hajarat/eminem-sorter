import React, { useState, useEffect, useReducer, useContext } from "react"
import { Link } from "react-router-dom"

import Axios from 'axios'

import SetStateContext from '../SetStateContext'

import Node from './Node'
import BinaryChoiceTree from './BinaryChoiceTree'

function Form() {
    const setState = useContext(SetStateContext)
    
    const [loading, setLoading] = useState(true)
    const [songs, setSongs] = useState()
    const [increment, setIncrement] = useState(1)
    const [currentInsertionPoint, setCurrentInsertionPoint] = useState(null)
    const [finalList, setFinalList] = useState({items: []})

    // Complex Data Structure
    function reducer(state, action) {
        switch (action.type) {
            case "init":
                if (action.value === songs[0].name) {
                    state.tree.insertRoot(songs[0].name, songs[1].name)
                } else {
                    state.tree.insertRoot(songs[1].name, songs[0].name)
                }
                setCurrentInsertionPoint(state.tree.root)
                setIncrement((increment) => {return increment+1})
                return state
            case "insertright":
                currentInsertionPoint.insertRight(songs[increment].name)
                setCurrentInsertionPoint(state.tree.root)
                setIncrement((increment) => {return increment+1})
                return state
            case "insertleft":
                currentInsertionPoint.insertLeft(songs[increment].name)
                setCurrentInsertionPoint(state.tree.root)
                setIncrement((increment) => {return increment+1})
                return state
            case "moveright":
                setCurrentInsertionPoint(currentInsertionPoint.right)
                return state
            case "moveleft":
                setCurrentInsertionPoint(currentInsertionPoint.left)
                return state
            case "tolist":
                console.log("Converting to list")
                var templist = []
                function inorder(node) {
                    if(node !== null) {
                        inorder(node.left)
                        templist.push(node)
                        inorder(node.right)
                    }
                }
                inorder(state.tree.root)
                setFinalList((finalList) => {
                    return {items: templist}
                })
                setIncrement((increment) => {return 100})
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, {tree: new BinaryChoiceTree()})
    // End of Complex Data Structure

    useEffect(() => {
        getSongs();
    }, [])

    useEffect(() => {
        if(increment == 30) {
            dispatch({type:"tolist"})
        }
    })

    async function getSongs() {
        // We want to contact the backend to fetch the song list from the database
        const {data: response} = await Axios.get('http://3.138.163.87:8888/songs')
        setSongs(response)
        setLoading(false)
    }

    function submitFirstChoice(e) {
        e.preventDefault()
        dispatch({type: "init", value: e.target.value})
    }

    function submitChoice(e) {
        e.preventDefault()
        // Here the first option is a song already inserted into the tree and the second option is the insertion song so:
        //  1- If the first option is chosen (prefered) and it contains no children in the tree, we insert the insertion song to the right of the first option, which as a node that we are already keeping track of.
        //  2- If the insertion song is chosen (prefered) and the first option contains no children in the tree, we insert the insertion song to the left of the first option.
        //  3- If the first option is chosen (prefered) and it contains a right child, we repeat the steps on the right child and the insertion song.
        //  4- If the insertion song is chosen (prefered) and the first option contains a left child, we repeat the steps on the left child and the insertion song
        if(e.target.value == currentInsertionPoint.data) {
            if (currentInsertionPoint.right == null) { // 1
                dispatch({type:"insertright"})
            } else { // 3
                dispatch({type: "moveright"})
            }
        } else {
            if (currentInsertionPoint.left == null) { // 2
                dispatch({type:"insertleft"})
            } else { // 4
                dispatch({type: "moveleft"})
            }
        }
    }

    // Render Section Below
    if (loading) return <h2>Loading...</h2>

    if (increment == 1) return ( // Starting point
        <div className="centered">
            <h1>MTBMB Sorter</h1>
            <form className="main-form">
                <div className="form-wrap">
                    <input key={songs[0].name} onClick={submitFirstChoice} className="form-input" type="button" name="1" value={songs[0].name} />
                    <input key={songs[1].name} onClick={submitFirstChoice} className="form-input" type="button" name="2" value={songs[1].name} />
                </div>
                <br/>
            </form>
            <Link to="/">&lt;&lt; Back to main</Link>
        </div>
    )

    else if (increment < 30) return (
        <div className="centered">
            <h1>MTBMB Sorter</h1>
            <form className="main-form">
                <div className="form-wrap">
                    <input key={currentInsertionPoint.data} onClick={submitChoice} className="form-input" type="button" name="1" value={currentInsertionPoint.data} />
                    <input key={songs[increment].name} onClick={submitChoice} className="form-input" type="button" name="2" value={songs[increment].name} />
                </div>
                <br/>
            </form>
            <Link to="/">&lt;&lt; Back to main</Link>
        </div>
    )

    else return (
        <div className="centered">
            <h1>MTBMB Sorter</h1>
            <br/>
            <ol>
            {finalList.items.map(song => {
                return (<li key={song.data}>{song.data}</li>)
            })}
            </ol>
            <Link to="/">&lt;&lt; Back to main</Link>
        </div>
    )
}

export default Form