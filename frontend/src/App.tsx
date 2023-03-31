import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LandingPage from 'pages/LandingPageTest';
import GamePage from 'pages/GamePage';
import LevelPage from 'pages/LevelPage';
import ProfilePage from 'pages/ProfilePage';
import LayoutPage from 'pages/LayoutPage';
import BookPage from 'pages/BookPage';
import SeungPage from 'pages/SeungPage';
import YuhaPage from 'pages/YuhaPage';
import JuPage from 'pages/JuPage';
import LearningPage from 'pages/LearningPage';
import GameDetailPage from 'pages/GameDetailPage';
import GameCompletePage from 'pages/GameCompletePage';
import GlobalStyle from 'GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StillLearningPage from 'pages/StillLearningPage';
import SearchPage from 'pages/SearchPage';
import CrossWordPage from './pages/CrossWordPage';
import CrossWordCoverPage from './pages/CrossWordCoverPage';
import GameSelectPage from 'pages/GameSelectPage';

function App() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider theme={!toggle ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              element={<LayoutPage toggle={toggle} setToggle={setToggle} />}
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/game/select" element={<GameSelectPage />} />
              <Route path="/game/detail" element={<GameDetailPage />} />
              <Route path="/game/complete" element={<GameCompletePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/learning/:videoId" element={<LearningPage />} />
              <Route path="/bookmark" element={<BookPage />} />
              <Route path="/still-learn" element={<StillLearningPage />} />
              <Route path="/search/:content?" element={<SearchPage />} />
              <Route path="/cross-word" element={<CrossWordPage />} />
              <Route
                path="/cross-word/cover"
                element={<CrossWordCoverPage />}
              />
              <Route path="/level" element={<LevelPage />} />
            </Route>
            <Route path="/seung" element={<SeungPage />} />
            <Route path="/yuha" element={<YuhaPage />} />
            <Route path="/ju" element={<JuPage />} />
            <Route
              path="/"
              // element={<LandingPage toggle={toggle} setToggle={setToggle} />}
              element={<LandingPage toggle={toggle} setToggle={setToggle} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
