/ / PASTE YOUR API KEY HERE
const API_KEY = "PASTE_YOUR_GEMINI_KEY_HERE";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function askAI() {
    const message = userInput.value;
    if (!message) return;

    // Show user message
    addMessage(message, "user");
    userInput.value = "";

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
        })
    });

    const data = await response.json();
    const aiReply = data.candidates[0].content.parts[0].text;
    
    // Show AI reply
    addMessage(aiReply, "ai");
}

function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send on Enter key
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") askAI();
});
