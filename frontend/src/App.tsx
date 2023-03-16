import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LandingPage from 'pages/LandingPage';
import GamePage from 'pages/GamePage';
import LevelPage from 'pages/LevelPage';
import ProfilePage from 'pages/ProfilePage';
import LayoutPage from 'pages/LayoutPage';
import SeungPage from 'pages/SeungPage';
import YuhaPage from 'pages/YuhaPage';
import JuPage from 'pages/JuPage';
import LearningPage from 'pages/LearningPage';
import GlobalStyle from 'GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'theme';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
              <Route path="/level" element={<LevelPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/learning" element={<LearningPage />} />
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
