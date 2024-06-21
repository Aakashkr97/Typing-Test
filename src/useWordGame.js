
import { useState, useEffect, useRef } from "react";

function useWordGame(initialTime = 60) {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);
  const [display, setDisplay] = useState("");
  const [errors, setErrors] = useState(0);

  const textSamples = ["Life is a concept in biology, defining what distinguishes living organisms from inert matter Most life on Earth relies on solar energy, except for rare chemosynthetic bacteria found near hydrothermal vents on the ocean floor. All earthly life is carbon-based, centered around complex molecules like proteins and nucleic acids. These molecules are encapsulated within cellular membranes, vital for all life due to the presence of water.Whether these characteristics are universal to all forms of life in the cosmos remains uncertain. Nonetheless, they define life on Earth as we understand it today." ];

  function handleTextChange(event) {
    setText(event.target.value);
  }

  useEffect(() => {
    if (isCounting && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isCounting]);

  function countWords(text) {
    const wordsArray = text.trim().split(/\s+/);
    return wordsArray.filter((word) => word).length;
  }

  function checkErrors(inputText) {
    const sampleWords = display.split(" ");
    const inputWords = inputText.split(" ");
    let errorCount = 0;

    sampleWords.forEach((word, index) => {
      if (word !== inputWords[index]) {
        errorCount++;
      }
    });

    setErrors(errorCount);
  }

  function startGame() {
    setDisplay(textSamples[Math.floor(Math.random() * textSamples.length)]);
    setText("");
    setWordCount(0);
    setErrors(0);
    setTimeRemaining(initialTime);
    setIsCounting(true);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  function endGame() {
    setIsCounting(false);
    const words = countWords(text);
    setWordCount(words);
    checkErrors(text);
  }

  return {
    text,
    display,
    handleTextChange,
    timeRemaining,
    isCounting,
    startGame,
    inputRef,
    wordCount,
    errors
  };
}

export default useWordGame;
