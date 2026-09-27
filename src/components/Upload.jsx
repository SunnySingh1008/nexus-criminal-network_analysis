import { useState } from 'react';
import { mockFiles } from '../data/mockData.js';

export default function Upload({ onBack, onRunAnalysis }) {
  const [files, setFiles] = useState([]);

  // Placeholder for a real upload. Wire this to an <input type="file"> or
  // drag-and-drop handler, then POST to your backend's ingest endpoint.
  const addMockFile = () => {
    if (files.length >= mockFiles.length) return;
    setFiles((f) => [...f, mockFiles[f.length]]);
  };

  return (
    <div className="screen">
      <div className="screen-pad">
        <div className="topbar">
          <button className="back-btn" onClick={onBack}>← back</button>
        </div>
        <div className="screen-title">Add case data</div>
        <div className="screen-sub">upload FIRs, CDRs, financial records or surveillance logs</div>
        <div style={{ height: 20 }}></div>

        <div className="dropzone" onClick={addMockFile}>
          <div className="icon">⌁</div>
          <div className="main">Drop files here or tap to browse</div>
          <div className="hint">PDF · CSV · JPG · scanned FIRs supported</div>
        </div>

        {files.map((f, i) => (
          <div className="file-row" key={i}>
            <span className="ftype">{f.t}</span>
            <span className="fname">{f.n}</span>
            <span className="fsize mono">{f.s}</span>
          </div>
        ))}

        <div className="action-row">
          <button className="btn-primary" style={{ flex: 1 }} onClick={onRunAnalysis}>
            RUN ANALYSIS →
          </button>
        </div>
      </div>
    </div>
  );
}
