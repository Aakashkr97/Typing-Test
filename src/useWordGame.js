import {useState, useEffect, useRef} from "react";

function useWordGame(TIME = 15){
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(TIME)
  const [countDown, setCountDown] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const inputRef = useRef(null)
  const [display, setDisplay] = useState("")
  const arrayList = ["He loved his job. Driving a train had been his dream ever since he was a child. He loved to make the train go as fast as possible. Unfortunately, one day he was a little too reckless and caused a crash. He made it out, but a single person died. Well, needless to say, he went to court over this incident. He was found guilty, and was sentenced to death by electrocution. When the day of the execution came, he requested a single banana as his last meal. After eating the banana, he was strapped into the electric chair. The switch was flown, sparks flew, and smoke filled the air - but nothing happened. The man was perfectly fine. Well, at the time, there was an old Bulgarian law that said a failed execution was a sign of divine intervention, so the man was allowed to go free. Somehow, he managed to get his old job back driving the train. Having not learned his lesson at all, he went right back to driving the train with reckless abandon. Once again, he caused a train to crash, this time killing two people. The trial went much the same as the first, resulting in a sentence of execution. For his final meal, the man requested two bananas. After eating the bananas, he was strapped into the electric chair. The switch was thrown, sparks flew, smoke filled the room - and the man was once again unharmed."]
  const [errors, setErrors] = useState(0)

  function handleText(event){
    setText(event.target.value)
  }

  useEffect(() =>
    {if(timeRemaining > 0 && countDown === true) {setTimeout(function(){setTimeRemaining(time => time-1)}, 1000)}
     else if (timeRemaining === 0) {
        endGame()
     }},
    [timeRemaining, countDown])

  function checkErrors(arrText){
    console.log(arrText);
    var arrDisplay = display.split(' ')
    var i = 0
    while(i < arrText.length && i < arrDisplay.length){
      if(arrText[i] !== arrDisplay[i]){
        setErrors(error => error + 1)
      }
      i = i + 1
    }
  }
  function countWords(str){
    if(str !== ""){
      str = str.replace(/(^\s*)|(\s*$)/gi,"")
      str = str.replace(/[ ]{2,}/gi," ")
      str = str.replace(/\n /,"\n")
      var strArray = str.split(' ')
      checkErrors(strArray)
      var length = strArray.length
    }
    else{
      length = 0
    }
    return length
  }

  function startGame(){
    setDisplay(arrayList[Math.floor(Math.random()*(arrayList.length))])
    setWordCount(0)
    setText("")
    setCountDown(true)
    setTimeRemaining(TIME)
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame(){
    setCountDown(false)
    setWordCount(countWords(text))
  }

  return {errors, display, inputRef, handleText, text, countDown, timeRemaining, startGame, wordCount}
}

export default useWordGame;