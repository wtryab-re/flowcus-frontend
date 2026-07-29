import About from "./homepage_components/About";
import Navbar from "./homepage_components/Navbar";
import Test from "./homepage_components/Test";
import ActualLanding from "./homepage_components/ActualLanding";
import Pricing from "./homepage_components/Pricing";
import Footer from "./homepage_components/Footer";
import Contact from "./homepage_components/Contact";

export default function Home() {
  //nav
  //about
  //live extension simulator
  //payment plans
  //privacy policy.... hMMMM
  //contact

  return (
    <div className="App min-h-screen bg-linear-to-br from-(--brand-color) to-(--gradient-color)">
      <Navbar />
      <ActualLanding />
      <About />
      <Test></Test>
      <Pricing></Pricing>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}
