import { useEffect, useState } from 'react';

const STEPS = [
  'Parsing documents (OCR)',
  'Extracting entities (NLP)',
  'Linking relationships',
  'Building network graph',
];

export default function Processing({ onDone }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [activeStep, onDone]);

  return (
    <div className="screen">
      <div className="screen-pad proc-wrap">
        <div className="proc-ring"></div>
        <div className="screen-title mono" style={{ fontSize: 15 }}>Analyzing case data…</div>
        <div className="proc-steps">
          {STEPS.map((label, i) => {
            const state = i < activeStep ? 'done' : i === activeStep ? 'active' : '';
            const mark = i < activeStep ? '✓' : i === activeStep ? '◐' : '○';
            return (
              <div className={`proc-step ${state}`} key={label}>
                <span className="mark">{mark}</span>{label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
