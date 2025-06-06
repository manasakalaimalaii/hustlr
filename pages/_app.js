import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="font-heading">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp; 