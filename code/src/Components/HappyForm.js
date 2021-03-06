import React, { useState } from "react";
import "./happyForm.css";

const url = "https://happy-thoughts-api-agnes.herokuapp.com/";

export const HappyForm = props => {
  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setMessage("");
        props.onFormSubmit(message);
      })
      .catch(err => console.log("error:", err));
  };

  return (
    <form className="happy-form">
      <h3>What's making you happy right now?</h3>
      <textarea
        rows="3"
        value={message}
        onChange={event => setMessage(event.target.value)}
      ></textarea>
      <div className="happy-footer">
        <button
          className="submit-button"
          type="submit"
          onClick={handleSubmit}
          disabled={message.length < 6 || message.length > 140 ? true : false}
        >
          ❤️ Send Happy Thought ❤️
        </button>
        <p>{message.length} / 140</p>
      </div>
    </form>
  );
};
