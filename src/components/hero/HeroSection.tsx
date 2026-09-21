import { HeroBackground } from "./HeroBackground";
import { IdentityBadge, VersionBadge } from "./IdentityBadge";
import { Slogan, SloganFlanks, WijayaTitle } from "./WijayaTitle";
import { SocialRail } from "./SocialRail";
import { FocusAudioCard } from "./FocusAudioCard";
import { ProfileCard } from "./ProfileCard";
import { FollowMe } from "./FollowMe";
import { KeepGoing } from "./KeepGoing";
import { MountainCard } from "./MountainCard";
import { HeroPerson } from "./HeroPerson";
import { ColorPicker } from "./ColorPicker";
import { IdentityDevice } from "./IdentityDevice";
import { DeviceCaption } from "./DeviceCaption";
import { TechMotto } from "./TechMotto";
import { AboutCard } from "./AboutCard";
import { TechnicalFooter } from "./TechnicalFooter";
import { BarcodeSignature } from "./BarcodeSignature";
import { Crosshair, DataPoint, HudLine } from "../shared/decorations";

function DesktopStage() {
  // Z-layers (PRD V5 §4.2): 0 background · 10 title · 15 slogan · 20 subject
  // · 30 floating UI · nav/critical controls live in <SectionNav />.
  // Subject stays centered at 50% — UI adapts to it, never the reverse.
  return (
    <div className="relative hidden h-[100svh] w-full min-h-[760px] min-[1280px]:block">
      <HeroBackground />
      <Crosshair className="left-[260px] top-[150px]" />
      <DataPoint className="left-[120px] top-[330px]" label="A-01" />
      <DataPoint className="right-[70px] bottom-[210px]" label="B-07" />
      <HudLine className="left-[35px] top-[128px] w-[110px]" />
      <HudLine vertical className="right-[64px] top-[165px] h-[150px]" />

      <div className="absolute left-[35px] top-[30px] z-30">
        <IdentityBadge />
      </div>
      <div className="absolute right-[35px] top-[32px] z-30">
        <VersionBadge />
      </div>

      <div className="absolute left-1/2 top-[56px] z-10 -translate-x-1/2">
        <WijayaTitle />
      </div>
      <div className="absolute inset-x-0 top-[196px] z-[15]">
        <SloganFlanks />
      </div>

      <HeroPerson className="absolute bottom-0 left-1/2 h-[min(800px,94svh)] w-auto -translate-x-1/2" />

      <div className="absolute left-[35px] top-[150px] z-30">
        <SocialRail />
      </div>
      <div className="absolute left-[72px] top-[344px] z-30">
        <FocusAudioCard />
      </div>

      <div className="absolute left-[72px] top-[424px] z-30">
        <ProfileCard />
      </div>
      <div className="absolute bottom-[24px] left-[72px] z-30">
        <FollowMe />
        <div className="mt-3">
          <TechnicalFooter />
        </div>
      </div>
      <div className="absolute bottom-[26px] left-[306px] z-30 w-[210px]">
        <MountainCard />
      </div>
      <div className="absolute left-[368px] top-[576px] z-30">
        <KeepGoing />
      </div>

      <div className="absolute right-[40px] top-[92px] z-30">
        <TechMotto />
      </div>
      <div className="absolute right-[440px] top-[280px] z-30 max-[1299px]:hidden max-[1535px]:right-[370px] max-[1535px]:top-[272px]">
        <ColorPicker />
      </div>
      <div className="absolute right-[40px] top-[220px] z-30">
        <IdentityDevice />
      </div>
      <div className="absolute right-[40px] top-[516px] z-30 max-[1535px]:right-[306px] max-[1535px]:top-[548px]">
        <DeviceCaption />
      </div>
      <div className="absolute bottom-[100px] right-[216px] z-30 max-[1535px]:bottom-auto max-[1535px]:right-[40px] max-[1535px]:top-[520px] max-[1535px]:max-w-[240px]">
        <AboutCard />
      </div>
      <div className="absolute bottom-[26px] right-[40px] z-30">
        <BarcodeSignature />
      </div>
    </div>
  );
}

function MobileStage() {
  return (
    <div className="relative flex flex-col items-center gap-8 px-5 pb-16 pt-24 min-[1280px]:hidden">
      <div className="flex w-full items-center justify-between">
        <IdentityBadge />
        <VersionBadge />
      </div>
      <div className="w-full text-center">
        <WijayaTitle />
      </div>
      <div className="-mt-2 self-center">
        <Slogan />
      </div>
      <HeroPerson className="relative h-[480px] w-auto" />
      <div className="w-full max-w-[400px]">
        <ProfileCard />
      </div>
      <div className="w-full max-w-[400px]">
        <AboutCard />
      </div>
      <div className="w-full max-w-[330px]">
        <IdentityDevice />
      </div>
      <div className="flex w-full max-w-[400px] items-start justify-between gap-4">
        <SocialRail />
        <FocusAudioCard />
      </div>
      <div className="flex w-full max-w-[420px] flex-col gap-4">
        <MountainCard />
        <KeepGoing />
        <FollowMe />
      </div>
      <div className="flex w-full max-w-[420px] items-center justify-between">
        <TechnicalFooter />
        <BarcodeSignature />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-bg"
      aria-label="Hero — Muhammad Sukma Wijaya"
    >
      <DesktopStage />
      <MobileStage />
    </section>
  );
}
