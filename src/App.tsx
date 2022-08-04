import { useEffect, useState } from 'react';

const INITIAL_DATE = new Date().getTime();

export function App() {

  const [milisecondsDiference, setMilisecondsDiference] = useState(0);

  const [minutes, seconds, miliseconds] = calculateValues();

  function calculateValues() {
    let minutes = Math.floor(milisecondsDiference / 60000);
    let seconds = Math.floor(milisecondsDiference / 1000) % 60;
    let miliseconds = Math.floor(milisecondsDiference % 1000);
    return [minutes, seconds, miliseconds];
  }

  useEffect(() => {
    setTimeout(() => {
      setMilisecondsDiference((new Date().getTime() - INITIAL_DATE))
    }, 35);
  }, [miliseconds])

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h1>
        {String(minutes).padStart(2, "0")}
        :
        {String(seconds).padStart(2, "0")}
        :
        {String(miliseconds).padStart(3, "0")}
      </h1>
    </div>
  )
}
