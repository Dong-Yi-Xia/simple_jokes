import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {
    const instance = axios.create({
        baseURL: "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes"
    })

    const [fetchURL, setFetchURL] = useState("/random/jokes")
    const [jokes, setJokes] = useState([])

    useEffect(()=> {
        async function fetchJokes(){
            try{
                const request = await instance.get(fetchURL)
                const response = request.data
                Array.isArray(response) ? setJokes(...response) : setJokes(response)
                // return response
            } catch(err){
                console.log(err)
            }
        }
        return fetchJokes()
    },[fetchURL])


    function addSelection(evt) {  
        let x = document.querySelectorAll(".jokeType");
        x.forEach(n => n.classList.remove("show"))
        let currentButton = evt.target
        currentButton.classList.add("show")
    }

    // console.log(jokes)
    return(
        <div className="simpleJoke">
            <h1 className="gameTitle">Simple Jokes</h1>
            <h3>Tell Me A Joke And Brighten My Day</h3>
            <div className="jokeSelection" onClick={addSelection}>
                <button className="jokeType show" onClick={ ()=> setFetchURL("/random/jokes") }> General </button>
                <button className="jokeType" onClick={ ()=> setFetchURL("/random/type/knock-knock") }> Knock Knock </button>
                <button className="jokeType" onClick={ ()=> setFetchURL("/random/type/programming") }> Programming </button>
            </div>
            <div className="jokeResponse">
                <h5 className="jokeTypeHeader">{jokes.type}</h5>
                <p className="question">{jokes.setup}</p>
                <p className="answer">{jokes.punchline}</p>
            </div>
        </div>
    )
}

export default App;
