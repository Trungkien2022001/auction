import React from 'react'

import Countdown, { zeroPad } from 'react-countdown'
export const Test = () => {
  const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
      {zeroPad(hours)}day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
    </span>
  );;
  const handleStop = () =>{
    console.log('Hello')
  }
  return (
    <div>
        <Countdown 
        onComplete={()=>handleStop()}
          // onStop={()=>handleStop()}
           date={Date.now() + 3000}
          renderer={renderer}
        />
    </div>
  )
}