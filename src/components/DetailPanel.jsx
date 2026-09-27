import { typeColor } from '../data/mockData.js';

const initials = (label) => label.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const riskClass = (risk) => (risk >= 70 ? 'risk-high' : risk >= 45 ? 'risk-mid' : 'risk-low');

export default function DetailPanel({ node, connections, open, onClose }) {
  return (
    <div className={`detail ${open ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>✕</button>
      {!node ? (
        <div className="detail-empty">SELECT A NODE<br />to view entity profile &amp; links</div>
      ) : (
        <>
          <div className="avatar avatar-lg" style={{ background: typeColor[node.type] }}>{initials(node.label)}</div>
          <div className="entity-name">{node.label}</div>
          <div className="entity-type" style={{ color: typeColor[node.type] }}>{node.type}</div>

          <div className="detail-row">
            <div className="label">Risk score</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
              <span className={`risk-badge ${riskClass(node.risk)}`}>{node.risk} / 100</span>
            </div>
            <div className="risk-bar"><div className="risk-fill" style={{ width: `${node.risk}%` }} /></div>
          </div>
          <div className="detail-row"><div className="label">Aliases / notes</div><div className="val">{node.aliases}</div></div>
          <div className="detail-row"><div className="label">Source records</div><div className="val">{node.sources}</div></div>
          <div className="detail-row"><div className="label">Last activity</div><div className="val">{node.lastSeen}</div></div>
          <div className="detail-row" style={{ borderBottom: 'none' }}>
            <div className="label">Connections ({connections.length})</div>
            {connections.map((c, i) => (
              <div className="conn-item" key={i}>
                <span>{c.name}</span><span className="rel">{c.rel}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
