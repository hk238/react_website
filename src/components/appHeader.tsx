import './appHeader.css';
import logo from './source/book-bookmark.png';


interface AppHeaderProps {
    scrolled: boolean;
    scrollDirection: 'up' | 'down' | null;
  }

export default function AppHeader({ scrolled, scrollDirection }: AppHeaderProps) {
    return (
        <header className={`app-header ${scrolled ? 'scrolled' : ''} ${scrollDirection || ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <nav>
            <ul className='app-header-list'>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }