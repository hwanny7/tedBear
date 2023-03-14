import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LandingPage from 'pages/LandingPage';
import GamePage from 'pages/GamePage';
import PuzzlePage from 'pages/PuzzlePage';
import ProfilePage from 'pages/ProfilePage';
import LayoutPage from 'pages/LayoutPage';
import SeungPage from 'pages/SeungPage';
import YuhaPage from 'pages/YuhaPage';
import JuPage from 'pages/JuPage';
import GlobalStyle from 'GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'theme';

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutPage />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/puzzle" element={<PuzzlePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/seung" element={<SeungPage />} />
            <Route path="/yuha" element={<YuhaPage />} />
            <Route path="/ju" element={<JuPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
