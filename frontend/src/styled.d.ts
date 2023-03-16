import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainColor: string;
    mainLightColor: string;
    mainDarkColor: string;
    pointColor: string;
    pointLightColor: string;
    // pointLigntColor 그라데이션
    pointLigntGrdColor1: string;
    pointLigntGrdColor2: string;
    pointLigntGrdColor3: string;
    pointLigntGrdColor4: string;
    pointLigntGrdColor5: string;
    pointLigntGrdColor6: string;
    pointLigntGrdColor7: string;
    pointLigntGrdColor8: string;
    bgColor: string;
    whiteColor: string;
    blackColor: string;
    redColor: string;
    shadowColor: string;
    kakaoColor: string;
    naverColor: string;
    landingWavseGrdColor: string;
    landingWaveColor: string;
    landingWaveLigntColor: string;
    landingCircleColor: string;
    learningBoxDefaultColor: string;
    learningBoxIncorrectColor: string;
    learningBoxCorrect: string;
    blackColorLight1: string;
    blackColorLight2: string;
  }
}
