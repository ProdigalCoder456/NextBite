import { useState } from "react";
import "./chatbot.css";

// Simple ChatInput component
function ChatInput({ onSendMessage }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
}

function Chatbot() {
    const [messages, setMessages] = useState([]);

    // Send user message to the AI model via nextbite_notebook.py backend
    const handleSendMessage = async (message) => {
        const userMessage = { text: message, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await fetch("/api/nextbite_notebook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            // Use the AI model's response
            const aiMessage = { text: data.reply, sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            const errorMessage = { text: "Sorry, there was an error.", sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    return (
        <div className="chatbot">
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatbot-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default Chatbot;