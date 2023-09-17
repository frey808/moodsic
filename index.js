

async function query() {
    try {
        console.log("1")
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ song: document.getElementById("songInput").innerHTML }),
        });
        console.log("2")

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        console.log("3")

        document.getElementById("test").innerHTML = data.result
    } catch(error) {
        // Consider implementing your own error handling logic here
        console.log("error caught")
        console.error(error);
        alert(error.message);
    }
  }