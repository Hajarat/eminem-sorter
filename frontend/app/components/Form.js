import React, { useState, useEffect, useReducer, useContext } from "react"

import Axios from 'axios'

import SetStateContext from '../SetStateContext'

import BinaryChoiceTree from './BinaryChoiceTree'
import PlaylistGenerator from './PlaylistGenerator'

function Form() {
    const setState = useContext(SetStateContext)
    
    const [loading, setLoading] = useState(true)
    const [songs, setSongs] = useState()
    const [radioIndex, setRadioIndex] = useState(0) // Controlled radio input
    const [choice, setChoice] = useState()
    const [increment, setIncrement] = useState(1)
    const [currentInsertionPoint, setCurrentInsertionPoint] = useState(null)

    // Complex Data Structure
    //const orderedList = new BinaryChoiceTree()
    function reducer(state, action) {
        switch (action.type) {
            case "init":
                if (choice === songs[0].name) {
                    state.tree.insertRoot(songs[0].name, songs[1].name)
                } else {
                    state.tree.insertRoot(songs[1].name, songs[0].name)
                }
                setCurrentInsertionPoint(state.tree.root)
                nextInsertion()
                return state
            case "insertright":
                currentInsertionPoint.insertRight(songs[increment].name)
                setCurrentInsertionPoint(state.tree.root)
                nextInsertion()
                return state
            case "insertleft":
                currentInsertionPoint.insertLeft(songs[increment].name)
                setCurrentInsertionPoint(state.tree.root)
                 nextInsertion()
                return state
            case "moveright":
                setCurrentInsertionPoint(currentInsertionPoint.right)
                nextLevel()
                return state
            case "moveleft":
                setCurrentInsertionPoint(currentInsertionPoint.left)
                nextLevel()
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, {tree: new BinaryChoiceTree()})
    // End of Complex Data Structure

    useEffect(() => {
        getSongs();
    }, [])

    async function getSongs() {
        // We want to contact the backend to fetch the song list from the database
        const {data: response} = await Axios.get('/api/songs')
        setSongs(response)
        setLoading(false)
    }

    function handleChoice(e) {
        setChoice(e.target.value)
        if(e.target.name == "1") setRadioIndex(1)
        if(e.target.name == "2") setRadioIndex(2)
    }

    function submitFirstChoice(e) {
        e.preventDefault()
        setState(null)
        if (choice == null) {
            setState("Please make a choice")
        } else {
            dispatch({type: "init"})
        }
    }

    function submitChoice(e) {
        e.preventDefault()
        setState(null)
        if (choice == null) {
            setState("Please make a choice")
        } else {
            // Here the first option is a song already inserted into the tree and the second option is the insertion song so:
            //  1- If the first option is chosen (prefered) and it contains no children in the tree, we insert the insertion song to the right of the first option, which as a node that we are already keeping track of.
            //  2- If the insertion song is chosen (prefered) and the first option contains no children in the tree, we insert the insertion song to the left of the first option.
            //  3- If the first option is chosen (prefered) and it contains a right child, we repeat the steps on the right child and the insertion song.
            //  4- If the insertion song is chosen (prefered) and the first option contains a left child, we repeat the steps on the left child and the insertion song
            if(choice == currentInsertionPoint.data) { // 1 or 3
                if (currentInsertionPoint.right == null) { // 1
                    dispatch({type:"insertright"})
                } else { // 3
                    dispatch({type: "moveright"})
                }
            } else { // 2 or 4
                if (currentInsertionPoint.left == null) { // 2
                    dispatch({type:"insertleft"})
                } else { // 4
                    dispatch({type: "moveleft"})
                }
            }
        }
    }

    // After a successful insertion, we reset the choice and radio index variables, the initial insertion point back to root, then increment
    function nextInsertion() {
        setChoice(null)
        setRadioIndex(0)
        setIncrement(increment+1)
    }

    // After one step of binary choice insertion, we only need to reset the choice and radio index
    function nextLevel() {
        setChoice(null)
        setRadioIndex(0)
    }

    // This function is used to iterate the sorted list from most liked to least liked songs
    function checkList() {
        inorder(state.tree.root)
    }
    function inorder(node) {
        if(node !== null) {
            inorder(node.left);
            console.log(node.data);
            inorder(node.right);
        }
    }

    // Render Section Below
    if (loading) return <h2>Loading...</h2>

    if (increment == 1) return ( // Starting point
        <>
        <form onSubmit={submitFirstChoice}>
            <input key={songs[0].name} onChange={handleChoice} type="radio" name="1" value={songs[0].name} checked={radioIndex == 1} />
            <label>{ songs[0].name }</label><br/>
            <input key={songs[1].name} onChange={handleChoice} type="radio" name="2" value={songs[1].name} checked={radioIndex == 2} />
            <label>{ songs[1].name }</label>
            <br/>
            <button>Next</button>
        </form>
        <PlaylistGenerator />
        </>
    )

    else if (increment < 3) return (
        <form onSubmit={submitChoice}>
            <input key={currentInsertionPoint.data} onChange={handleChoice} type="radio" name="1" value={currentInsertionPoint.data} checked={radioIndex == 1} />
            <label>{ currentInsertionPoint.data }</label><br/>
            <input key={songs[increment].name} onChange={handleChoice} type="radio" name="2" value={songs[increment].name} checked={radioIndex == 2} />
            <label>{ songs[increment].name }</label>
            <br/>
            <button>Next</button>
        </form>
    )

    else return (
        <div>
            Here is the final list:<br/>
            <button className="space-right" onClick={checkList}> Check!</button>
        </div>
    )
}

export default Form