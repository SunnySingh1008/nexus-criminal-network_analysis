import { useState } from 'react';
import GraphView from './GraphView.jsx';
import DetailPanel from './DetailPanel.jsx';
import { alertMsgs, typeColor } from '../data/mockData.js';

const ALL_TYPES = ['person', 'location', 'vehicle', 'phone', 'org'];
const initials = (label) => label.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const riskClass = (risk) => (risk >= 70 ? 'risk-high' : risk >= 45 ? 'risk-mid' : 'risk-low');

export default function Dashboard({ graph, loading, onBackToCases }) {
  const nodes = graph?.nodes || [];
  const edges = graph?.edges || [];
  const [cy, setCy] = useState(null);
  const [view, setView] = useState('graph'); // 'graph' | 'list'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTypes, setActiveTypes] = useState(ALL_TYPES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connections, setConnections] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const flaggedCount = nodes.filter((n) => n.risk >= 60).length;
  const edgeCount = cy ? cy.edges().length : 0;

  const selectNode = (ele) => {
    const data = ele.data();
    const conns = ele.connectedEdges().map((e) => {
      const other = e.source().id() === data.id ? e.target() : e.source();
      return { name: other.data('label'), rel: e.data('rel') };
    });
    setSelectedNode(data);
    setConnections(conns);
    setDetailOpen(true);
    setSidebarOpen(false);
  };

  const selectNodeById = (id) => cy && selectNode(cy.$id(id));

  const toggleType = (type) => {
    const next = activeTypes.includes(type) ? activeTypes.filter((t) => t !== type) : [...activeTypes, type];
    setActiveTypes(next);
    if (cy) cy.nodes().forEach((n) => n.style('display', next.includes(n.data('type')) ? 'element' : 'none'));
  };

  const setLayout = (name) => {
    if (cy) cy.layout({ name, animate: true, idealEdgeLength: 90, nodeRepulsion: 9000 }).run();
  };

  const onSearch = (q) => {
    const query = q.toLowerCase();
    if (cy) cy.nodes().forEach((n) => n.style('opacity', query === '' ? 1 : n.data('label').toLowerCase().includes(query) ? 1 : 0.12));
  };

  const revealAlerts = () => {
    alertMsgs.forEach((a, i) => setTimeout(() => setAlerts((prev) => [...prev, a]), i * 220));
  };

  return (
    <div className="screen">
      <div className="app-inner">
        <header>
          <button className="icon-btn menu-btn" onClick={() => setSidebarOpen((o) => !o)}>☰</button>
          <button className="icon-btn" onClick={onBackToCases}>← cases</button>
          <div className="logo"><span className="dot"></span>NEXUS</div>
          <div className="viewtoggle">
            <button className={view === 'graph' ? 'active' : ''} onClick={() => setView('graph')}>GRAPH</button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>LIST</button>
          </div>
          <div className="stats">
            <div className="stat-card"><b>{nodes.length}</b><span>Entities</span></div>
            <div className="stat-card"><b>{edgeCount}</b><span>Links</span></div>
            <div className="stat-card"><b>{flaggedCount}</b><span>Flagged</span></div>
          </div>
        </header>

        <div className="bodywrap">
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <input type="text" placeholder="search entity or number…" onChange={(e) => onSearch(e.target.value)} />
            <div className="filter-group">
              <h3>Entity types</h3>
              {ALL_TYPES.map((t) => (
                <label className="chip" key={t}>
                  <input type="checkbox" checked={activeTypes.includes(t)} onChange={() => toggleType(t)} />
                  <span className="swatch" style={{ background: typeColor[t] }}></span>
                  {t[0].toUpperCase() + t.slice(1)}{t !== 'person' ? '' : 's'}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h3>Layout</h3>
              <label className="chip"><input type="radio" name="layout" defaultChecked onChange={() => setLayout('cose')} />Force-directed</label>
              <label className="chip"><input type="radio" name="layout" onChange={() => setLayout('concentric')} />Concentric (influence)</label>
              <label className="chip"><input type="radio" name="layout" onChange={() => setLayout('breadthfirst')} />Hierarchical</label>
            </div>
          </div>

          <div className="main">
            {loading && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }} className="mono">Loading graph from backend…</div>}
            <GraphView
              nodes={nodes}
              edges={edges}
              visible={view === 'graph'}
              onReady={setCy}
              onSelectNode={selectNode}
              onRevealed={revealAlerts}
            />
            {view === 'list' && (
              <div className="list-view">
                <table>
                  <thead><tr><th>Entity</th><th>Type</th><th>Risk</th><th>Sources</th></tr></thead>
                  <tbody>
                    {nodes.map((n, i) => (
                      <tr key={n.id} style={{ animationDelay: `${i * 40}ms` }} onClick={() => selectNodeById(n.id)}>
                        <td>
                          <span className="tag">
                            <span className="avatar" style={{ background: typeColor[n.type], width: 28, height: 28, fontSize: 11 }}>{initials(n.label)}</span>
                            {n.label}
                          </span>
                        </td>
                        <td className="mono" style={{ color: 'var(--text-dim)' }}>{n.type}</td>
                        <td><span className={`risk-badge ${riskClass(n.risk)}`}>{n.risk}</span></td>
                        <td style={{ color: 'var(--text-dim)' }}>{n.sources}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {view === 'graph' && (
              <>
                <div className="alert-strip">
                  {alerts.map((a, i) => <div className="alert" key={i}>{a}</div>)}
                </div>
                <div className="legend">
                  {ALL_TYPES.map((t) => (
                    <span key={t}><span className="swatch" style={{ background: typeColor[t] }}></span>{t[0].toUpperCase() + t.slice(1)}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <DetailPanel node={selectedNode} connections={connections} open={detailOpen} onClose={() => setDetailOpen(false)} />
        </div>
      </div>
    </div>
  );
}
