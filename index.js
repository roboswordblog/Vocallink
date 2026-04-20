const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.start();

let buffer = "";

recognition.onresult = (event) => {
    let text = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
    }

    buffer += " " + text;

    let words = buffer.trim().split(" ");

    if (words.length >= 20) {
        let chunk = words.slice(0, 20).join(" ");
        buffer = words.slice(20).join(" ");

        translateChunk(chunk);
    }
};async function translateChunk(chunk) {
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            q: chunk,
            source: "auto",
            target: "en",
            format: "text"
        })
    });

    const data = await res.json();

    document.getElementById("output").innerText +=
        data.translatedText + "\n";
}