import React from 'react'

const useTimer = ({totalTimer}: {totalTimer: number}) => {
    const [timer, setTimer] = React.useState(totalTimer);
    React.useEffect(() => {
      const interval = setInterval(() => {
        if (timer >= 1) {
            setTimer((prevTimer) => prevTimer - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [timer]);
    
    return timer
}

export default useTimer
