import link from "next/link"
import Navbar from "./components/navbar"
import Header from "./components/header"
import About from "./components/about"
import Accordion from "./components/accordion"
import Footer from "./components/footer"
export default function Home(){
  return(
    <>
    <Navbar/>
    <Header/>
    <About/>
    <Accordion/>
    <Footer/>
    
    </>
  )
}

