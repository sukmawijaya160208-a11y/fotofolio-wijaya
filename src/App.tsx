import { SectionNav } from "./components/scroll/SectionNav";
import { ScrollProgress } from "./components/scroll/ScrollProgress";
import { HeroSection } from "./components/hero/HeroSection";
import { IdentitySection } from "./components/identity/IdentitySection";
import { JourneySection } from "./components/journey/JourneySection";
import { SkillsSection } from "./components/skills/SkillsSection";
import { ExperienceSection } from "./components/experience/ExperienceSection";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { CaseStudySection } from "./components/case-study/CaseStudySection";
import { EducationSection } from "./components/education/EducationSection";
import { AchievementsSection } from "./components/achievements/AchievementsSection";
import { CreativeLabSection } from "./components/creative-lab/CreativeLabSection";
import { ManifestoSection } from "./components/manifesto/ManifestoSection";
import { ContactSection } from "./components/contact/ContactSection";
import { FinalSignature } from "./components/contact/FinalSignature";

export default function App() {
  return (
    <>
      <SectionNav />
      <ScrollProgress />
      <main>
        <HeroSection />
        <IdentitySection />
        <JourneySection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CaseStudySection />
        <EducationSection />
        <AchievementsSection />
        <CreativeLabSection />
        <ManifestoSection />
        <ContactSection />
      </main>
      <FinalSignature />
    </>
  );
}
