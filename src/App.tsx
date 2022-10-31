import { connect } from 'react-redux';
import { handleAddTodo, handleReceiveData } from './actions/Todos';
import { ConnectedTodo } from './components/Todos';
import darkModeIcon from './assets/icon-moon.svg';
import lightModeIcon from './assets/icon-sun.svg';
import { state } from './models/state';
import { setTheme } from './actions/theme';
import { useEffect } from 'react';

function App({
  theme,
  setTheme,
  handleReceiveData,
}: {
  theme: string;
  setTheme: Function;
  handleReceiveData: Function;
}) {
  const processClick = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        document.body.classList.toggle('dark');
        break;
      default:
        setTheme('light');
        document.body.classList.contains('dark') &&
          document.body.classList.toggle('dark');
    }
  };

  useEffect(() => {
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      setTheme('dark');
    window.matchMedia &&
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const requiredScheme = e.matches ? 'dark' : 'light';
          setTheme(requiredScheme);
          requiredScheme === 'light' &&
            document.body.classList.contains('dark') &&
            document.body.classList.toggle('dark');
        });
    handleReceiveData();
  }, [handleReceiveData, setTheme]);

  return (
    <div className="App">
      <header>
        <h1>TODO</h1>
        <img
          src={theme !== 'dark' ? darkModeIcon : lightModeIcon}
          alt={
            theme !== 'dark' ? 'Change to Dark Mode' : 'Change to Light Mode'
          }
          onClick={processClick}
        />
      </header>
      <main>
        <ConnectedTodo />
      </main>
    </div>
  );
}

export const ConnectedApp = connect(
  (state: state) => ({
    theme: state.theme,
  }),
  {
    handleAddTodo,
    setTheme,
    handleReceiveData,
  }
)(App);
