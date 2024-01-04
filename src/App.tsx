import './App.css'
import { useState, useEffect } from 'react'
import { Timer } from './components/Timer'

export const format = (time: number) => {
  if (time < 10) {
    return `0${time}`
  } else {
    return `${time}`
  }
}

const formatTime = (date: Date) => {
  return `${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`

}

function App() {

  const date = new Date()
  const initial = formatTime(date)

  const [time, setTime] = useState(initial)
  const [isStop, setStop] = useState(false)

  useEffect(() => {

    const interval = setInterval(() => {
      const time = formatTime(date)
      setTime(time)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  function handleStop() {
    setStop(!isStop)
  }

  return (
    <>
      <header className="flex justify-center align-middle">
        <img src="/tomato.png" className="logo" alt="" />
        <h1 className="text-5xl font-bold p-2">
          Focus Tom
        </h1>
      </header>

      <div className="p-4 m-4">
        <h3 className="text-2xl">
          <span className="font-bold">
            Time
          </span>
          : {time}
        </h3>
      </div>

      <Timer time={{ minutes: 25, seconds: 0 }}></Timer>
    </>
  )
}

export default App
