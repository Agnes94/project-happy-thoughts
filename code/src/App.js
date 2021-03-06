import React, { useEffect, useState } from "react";
import { HappyThought } from "./Components/HappyThought";
import { HappyForm } from "./Components/HappyForm";

//const url = "https://technigo-thoughts.herokuapp.com/";//
const url = "https://happy-thoughts-api-agnes.herokuapp.com/"

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [postedMessage, setPostedMessage] = useState("");

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setThoughts(json));
  }, [postedMessage]);

  /* const onFormSubmit = message => {
     setPostedMessage(message);
   }*/

  const onFormSubmit = message => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-type": "application/json" }
    })
      .then(() => setPostedMessage(message))
  }

  const onLiked = thoughtId => {
    const newThought = thoughts.map(thought => {
      if (thought._id === thoughtId) {
        thought.hearts += 1;
      }
      return thought;
    });
    setThoughts(newThought);
  };

  return (
    <article>
      <HappyForm onFormSubmit={onFormSubmit} />
      {thoughts.map(thought => (
        <HappyThought key={thought._id} thought={thought} onLiked={onLiked} />
      ))}
    </article>
  );
};
