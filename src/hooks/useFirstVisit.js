import { useEffect, useState } from 'react';
import '../App.css';

function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return isFirstVisit;
}

export default useFirstVisit;
