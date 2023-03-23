import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
// import LandingPage from 'pages/LandingPage';
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
import GlobalStyle from 'GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StillLearningPage from 'pages/StillLearningPage';
import SearchPage from 'pages/SearchPage';

function App() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider theme={!toggle ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutPage />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/level" element={<LevelPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/bookmark" element={<BookPage />} />
              <Route path="/still-learn" element={<StillLearningPage />} />
              <Route path="/search" element={<SearchPage />} />
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
