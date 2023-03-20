import React from 'react'
import Personal from '../../Components/PersonalInfo'
import Services from '../../Components/Services'
import Skills from '../../Components/Skills'
import ExperienceDashboard from '../../Components/ExperienceDashboard'
import ProjectDashboard from '../../Components/ProjectDashboard'
import About from '../../Components/About'
import ContactDashboard from '../../Components/contactDashboard'

export default function Dashboard() {
    return (
        <div>
            <Personal isDashboard />
            <About />
            <Services isDashboard />
            <ExperienceDashboard isDashboard />
            <Skills isDashboard />
            <ProjectDashboard isDashboard />
            <ContactDashboard isDashboard />
        </div >

    )
}
