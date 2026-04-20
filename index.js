window.onload = () => {
    const output = document.getElementById("output");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
        console.log("Listening...");
    };

    recognition.onerror = (e) => {
        console.log("Error:", e.error);
    };

    recognition.onresult = (event) => {
        let text = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
        }

        console.log("Heard:", text); // IMPORTANT DEBUG

        output.innerText = text;
    };

    recognition.start();
};
