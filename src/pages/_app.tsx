import { ChallengeProvider } from '../contexts/ChallengeContext/index';
import '../styles/global.css';


function MyApp({ Component, pageProps }) {
  return (
    <ChallengeProvider >
      <Component {...pageProps} />
    </ChallengeProvider>
  )
}

export default MyApp
