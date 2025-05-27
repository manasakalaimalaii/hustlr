import localFont from 'next/font/local';

export const theSeasons = localFont({
  src: '../public/fonts/FONTSPRINGDEMO-TheSeasonsLightRegular.woff2',
  variable: '--font-the-seasons',
  display: 'swap',
  preload: true,
});

export const ovo = localFont({
  src: [
    {
      path: '../public/fonts/Ovo-Regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-ovo',
  display: 'swap',
  preload: true,
}); 