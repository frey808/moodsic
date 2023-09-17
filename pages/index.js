import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [songInput, setSongInput] = useState("");
  const [result, setResult] = useState("");
  const [songKey, setSongKey] = useState(0);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ song: songInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult((data.result + ".mp3").trim());
      setSongInput("");
      setSongKey(songKey + 1);
      console.log(result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Moodsic</title>
      </Head>

      <main className={styles.main}>
        <img src="/mood.png" className={styles.icon} />
        <h3>Moodsic</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="song"
            placeholder="What are you working on?"
            value={songInput}
            onChange={(e) => setSongInput(e.target.value)}
          />
          <input type="submit" value="Generate Songs" />
        </form>
        <div className={styles.result}>{result}</div>
        <audio controls key={songKey}>
          <source src={"/songs/" + result} type="audio/mpeg"></source>
          Your browser does not support this audio
        </audio>
      </main>
    </div>
  );
}
