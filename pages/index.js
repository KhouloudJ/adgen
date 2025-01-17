import Head from "next/head";
import Image from "next/image";
import adgenLogo from "../assets/adgen_logo.jpg";
import background from "../assets/background.jpg";

import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Image
        layout="fill"
        className="object-center object-cover pointer-events-none"
        src={background}
      />
      <Head>
        <title>Adgen</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Bio generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Add your description and generate a bio for your Twitter page with
              no hassle on your end.
            </h2>
          </div>

          <div className="prompt-container">
            <textarea
              className="prompt-box"
              placeholder="start typing here"
              value={userInput}
              onChange={onUserChangedText}
            />
          </div>
          <br />

          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Here is your bio !</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.twitter.com/khdjbn"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={adgenLogo} alt="Adgen logo" />
            <p>build with Adgen</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
