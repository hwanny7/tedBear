const size = {
  //   mobileS: '320px',
  //   mobileM: '375px',
  mobile: '500px',
  tablet: '500px',
  laptop: '800px',
  //   laptopL: '1440px',
  desktop: '1024px',
};

export const device = {
  //   mobileS: `(min-width: ${size.mobileS})`,
  //   mobileM: `(min-width: ${size.mobileM})`,
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  //   laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  //   desktopL: `(min-width: ${size.desktop})`,
};

// 출처 : https://jsramblings.com/how-to-use-media-queries-with-styled-components/
