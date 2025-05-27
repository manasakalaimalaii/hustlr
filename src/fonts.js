import localFont from 'next/font/local';
import { Ovo } from 'next/font/google';

export const theSeasons = localFont({
  src: '../public/fonts/FONTSPRINGDEMO-TheSeasonsLightRegular.woff2',
  variable: '--font-the-seasons',
  display: 'swap',
  preload: true,
});

export const ovo = Ovo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ovo',
  display: 'swap',
}); 