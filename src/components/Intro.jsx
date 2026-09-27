export default function Intro({ onEnter }) {
  return (
    <div className="screen" id="intro">
      <div className="grid-bg"></div>
      <div className="scanline"></div>
      <div className="intro-tag mono">SIH26189 · CASE ANALYSIS TERMINAL</div>
      <h1 className="intro-title">NEXUS</h1>
      <p className="intro-sub">
        AI-powered network intelligence — mapping people, places and patterns
        hidden across FIRs, CDRs and financial records.
      </p>
      <button className="btn-primary" onClick={onEnter}>ENTER TERMINAL</button>
      <div className="intro-meta">
        <span>STATUS: 3 SOURCES LINKED</span>
        <span>CLEARANCE: INVESTIGATOR</span>
      </div>
    </div>
  );
}
