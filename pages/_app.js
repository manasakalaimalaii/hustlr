import { theSeasons, ovo } from '../src/fonts';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${theSeasons.variable} ${ovo.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp; 