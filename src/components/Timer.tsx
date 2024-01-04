import { useEffect, useState } from "react";
import { format } from "../App";
import { toast } from "wc-toast";


interface Props {
  time: {
    minutes: number
    seconds: number
  }
}


export function Timer({ time }: Props) {

  const [minutes, setMinutes] = useState(time.minutes);
  const [seconds, setSeconds] = useState(time.seconds);
  const [isStop, setStop] = useState(true);
  const [reset, setReset] = useState(false);

  const strInitial = `${format(minutes)}:${format(seconds)}`;
  const [timeString, setTimeString] = useState(strInitial)

  useEffect(() => {
    if (isStop) {
      return;
    }

    if (reset) {
      setMinutes(time.minutes);
      setSeconds(time.seconds);
      setReset(false);
      toast.success('Timer Reset');
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

      <section className="flex flex-row gap-3 justify-center m-2">

        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            setStop(!isStop)
          }}>
          {isStop ? 'Play' : 'Pause'}
        </button>

        <button type="button"

          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setReset(true)}
        >Reset</button>
      </section>


    </>


  )
}