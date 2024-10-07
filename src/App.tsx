import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './components/redux/goalStore';
import './App.css';
import AppHeader from './components/appHeader';
import TrackerBox from './components/trackerBox';
import SummaryBox from './components/summaryBox';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else if (currentScrollTop < lastScrollTop) {
        setScrollDirection('up');
      }
      
      if (currentScrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);





  
  return (
    <Provider store={store}>
      <div className="App">
        <AppHeader scrolled={scrolled} scrollDirection={scrollDirection} />
        <div style={{ paddingTop: '8vh' }}>
          <div className="container">
            <div className="tracker-box">
              <TrackerBox />
            </div>
            <div className="summary-box">
              <SummaryBox />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;

