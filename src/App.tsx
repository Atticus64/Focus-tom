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

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }


  useEffect(() => {

    const interval = setInterval(() => {
      const date = new Date()
      const time = formatTime(date)
      setTime(time)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="dark:text-white">
      <wc-toast></wc-toast>
      <header className="flex justify-center align-middle">
        <img src="/tomato.png" className="logo" alt="" />
        <h1 className="text-5xl font-bold p-2">
          Focus Tom
        </h1>
      </header>

      <main >
        <div className="p-4 m-4">
          <h3 className="text-2xl">
            <span className="font-bold">
              Time
            </span>
            : {time}
          </h3>
        </div>

        <Timer time={{ minutes: 25, seconds: 0 }}></Timer>
      </main>
    </div>
  )
}

export default App
