import { useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from "react-icons/bi";
import { RiTimerLine } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";
import { useEventListener } from './hooks/useEventListerner';
import "./styles/app.css";

export function App() {

  const ICON_PROPERTIES = { color: 'var(--primary-color)', size: "2rem" }
  const TIMEOUT_REFRESH_MILISECONDS = 35;

  const INITIAL_DATE = useRef(new Date().getTime());

  const [milisecondsDiference, setMilisecondsDiference] = useState<number | undefined>();
  const [stoped, setStoped] = useState(true);
  const [minutes, seconds, miliseconds] = calculateValues(milisecondsDiference);

  //Custom hook that handle eventListerner without losing state reference;
  useEventListener("keydown", "Space", handleButtonClick);

  function calculateValues(msDiference: number | undefined): [n1: number, n2: number, n3: number] {
    if (!msDiference) return [0, 0, 0];
    let minutes = Math.floor(msDiference / 60000);
    let seconds = Math.floor(msDiference / 1000) % 60;
    let miliseconds = Math.floor(msDiference % 1000);
    return [minutes, seconds, miliseconds];
  }

  useEffect(() => {
    !stoped && calculateMilisecondsDiference();
  }, [stoped])

  useEffect(() => {
    if (stoped) return;
    setTimeout(() => calculateMilisecondsDiference(), TIMEOUT_REFRESH_MILISECONDS);
  }, [milisecondsDiference])

  function calculateMilisecondsDiference() {
    const diference = (new Date().getTime() - INITIAL_DATE.current);
    setMilisecondsDiference(diference)
  }

  function handleButtonClick() {
    if (stoped)
      INITIAL_DATE.current = new Date().getTime();
    setStoped(prevState => !prevState);
  }

  return (
    <div className='container'>

      <div className='ball small'>
        <RiTimerLine {...ICON_PROPERTIES} />
      </div>

      <div className='ball large'>
        <h1>
          {String(minutes).padStart(2, "0")}
          :
          {String(seconds).padStart(2, "0")}
        </h1>
        <h2>
          {String(miliseconds).padStart(3, "0")}
        </h2>
        <span>USE SPACEBAR</span>
      </div>

      <button className='ball small' onClick={handleButtonClick} >
        {
          !milisecondsDiference ?
            <BiPlay {...ICON_PROPERTIES} />
            :
            !stoped ?
              <BiPause {...ICON_PROPERTIES} />
              :
              <VscDebugRestart {...ICON_PROPERTIES} />
        }
      </button>

    </div>
  )
}
