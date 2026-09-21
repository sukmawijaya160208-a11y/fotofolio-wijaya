export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 28%, rgba(255,255,255,.96), transparent 44%), linear-gradient(135deg, #f5f8fa 0%, #e4ebef 48%, #d7e0e6 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(39,57,70,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(39,57,70,.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(48deg, rgba(39,57,70,.16) 0 1px, transparent 1px 46px), repeating-linear-gradient(-42deg, rgba(39,57,70,.10) 0 1px, transparent 1px 92px)",
        }}
      />
      <div
        className="absolute -right-[6%] top-1/2 h-[78%] w-[46%] -translate-y-1/2 opacity-[0.16]"
        style={{
          backgroundImage: "url(/assets/city-arch.svg)",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(1) blur(1.5px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 42% at 22% 74%, rgba(255,255,255,.72), transparent 70%), radial-gradient(46% 38% at 82% 34%, rgba(23,35,45,.06), transparent 72%)",
        }}
      />
      <div
        className="absolute left-[8%] top-[14%] h-[340px] w-[340px] opacity-30"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,.85), rgba(255,255,255,0))",
          clipPath: "polygon(0 0, 100% 0, 100% 62%, 62% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute bottom-[6%] right-[14%] h-[200px] w-[300px] opacity-20"
        style={{
          background: "rgba(255,255,255,.8)",
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 30%)",
        }}
      />
    </div>
  );
}
