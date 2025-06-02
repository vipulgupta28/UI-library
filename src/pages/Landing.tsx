import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ComponentsPage from "../components/component";
import Footer from "../components/Footer";
import Docs from "../components/Doc";

const Landing = () =>{
    return(
        <>
        <Navbar/>
        <Hero/>
        <ComponentsPage/>
      
     <Docs/>
        <Footer/>

        </>
    )
}

export default Landing;