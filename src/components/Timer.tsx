import { useEffect, useState } from "react";
import { format } from "../App";

interface Props {
  time: {
    minutes: number
    seconds: number
  }
}


export function Timer({ time }: Props) {

  const [minutes, setMinutes] = useState(time.minutes);
  const [seconds, setSeconds] = useState(time.seconds);
  const [isStop, setStop] = useState(false);

  const strInitial = `${format(minutes)}:${format(seconds)}`;
  const [timeString, setTimeString] = useState(strInitial)

  useEffect(() => {
    if (isStop) {
      return;
    }

    if (seconds === 0) {
      setMinutes(Number(minutes) - 1);
      setSeconds(59);
      return
    }

    const interval = setInterval(() => {
      setSeconds(Number(seconds) - 1);
      const timeString = `${format(minutes)}:${format(seconds)}`;
      setTimeString(timeString)
    }, 1000)


    return () => {
      clearInterval(interval)
    }

  })

  return (
    <>
      <div className="text-3xl">
        {timeString}
      </div>
      <button onClick={() => {
        setStop(!isStop)
      }}>
        {isStop ? 'Play' : 'Pause'}
      </button>
    </>


  )
}