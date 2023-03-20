import React from 'react'
import About from '../../Components/About'
import Contact from '../../Components/Contact'
import Experience from '../../Components/Experience'
import Footer from '../../Components/Footer'
import LatestWork from '../../Components/LatestWork'
import Navbar from "../../Components/Navbar"
import Personal from '../../Components/PersonalInfo'
import Services from '../../Components/Services'
import Skills from '../../Components/Skills'

import "./style.css"

export default function Home() {
  return (
    <div id='home'>
      <Navbar />
      <Personal />
      <About />
      <Services />
      <Experience />
      <Skills />
      <LatestWork />
      <Contact />
      <Footer />
    </div>
  )
}