import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import AboutCouple from './components/AboutCouple';
import MessageSection from './components/MessageSection';
import GiftSection from './components/GiftSection';
import OurStory from './components/OurStory';
import Verse from './components/Verse';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <AboutCouple />
        <MessageSection />
        <GiftSection />
        <OurStory />
        <Verse />
      </main>
      <Footer />
    </>
  );
}
