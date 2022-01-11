import { useEffect,useRef } from 'react'
export const sortList = (list) => {
    let sortedList = list.sort(function(a,b) {
        if(a.balance == b.balance)
        {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
        }
        else
        {
            return (a.balance < b.balance) ? 1 : -1;
        }
    })
    return sortedList
}


export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },[]);
  }
  