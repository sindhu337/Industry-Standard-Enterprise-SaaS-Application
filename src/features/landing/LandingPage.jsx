import LandingNavbar from './LandingNavbar'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import WorkflowSection from './WorkflowSection'
import RolesSection from './RolesSection'
import StatisticsSection from './StatisticsSection'
import AboutSection from './AboutSection'
import Footer from './Footer'

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main className="d-flex flex-column align-items-center w-100">
        <div className="container">
          <HeroSection />
          <FeaturesSection />
          <WorkflowSection />
          <RolesSection />
          <StatisticsSection />
          <AboutSection />
          <Footer />
        </div>
      </main>
    </>
  )
}
