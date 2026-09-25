import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import AboutCouple from './components/AboutCouple';
import RsvpSection from './components/RsvpSection';
import RsvpForm from './components/RsvpForm';
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
        <RsvpSection />
        <RsvpForm />
        <GiftSection />
        <OurStory />
        <Verse />
      </main>
      <Footer />
    </>
  );
}
