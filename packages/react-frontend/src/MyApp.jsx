// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor",
        },
        {
            name: "Mac",
            job: "Bouncer",
        },
        {
            name: "Dee",
            job: "Aspiring actress",
        },
        {
        name: "Dennis",
        job: "Bartender",
    },
]);

    function removeCharacter(index) {
        const newCharacters = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(newCharacters);
    }

return (
    <div className="container">
        <Table characterData={characters} removeCharacter={removeCharacter} />
    </div>
);
}

export default MyApp;