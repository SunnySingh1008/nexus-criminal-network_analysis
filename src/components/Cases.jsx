import { cases } from '../data/mockData.js';

const badgeClass = { active: 'status-active', review: 'status-review', new: 'status-new' };

export default function Cases({ onOpenAnalyzed, onOpenPending }) {
  const handleClick = (c) => (c.status === 'active' ? onOpenAnalyzed() : onOpenPending());

  return (
    <div className="screen">
      <div className="screen-pad">
        <div className="topbar">
          {/* No back target from cases in this flow; remove or wire to intro if needed */}
        </div>
        <div className="screen-title">Active cases</div>
        <div className="screen-sub">select a case file to continue investigation</div>
        <div style={{ height: 22 }}></div>

        {cases.map((c) => (
          <div className="case-card" key={c.id} onClick={() => handleClick(c)}>
            <div>
              <div className="cid mono">{c.id}</div>
              <div className="case-name">{c.name}</div>
              <div className="case-meta">{c.meta}</div>
            </div>
            <span className={`status-badge ${badgeClass[c.status]}`}>{c.label}</span>
          </div>
        ))}

        <button className="new-case-btn" onClick={onOpenPending}>+ START NEW CASE</button>
      </div>
    </div>
  );
}
