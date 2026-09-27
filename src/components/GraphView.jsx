import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { typeColor } from '../data/mockData.js';

// Wraps Cytoscape (a non-React library that draws directly into a DOM node)
// in a ref + useEffect, which is the standard pattern for using imperative
// libraries inside React. cyRef is exposed to the parent via onReady so
// Dashboard.jsx can drive filters/layout/selection from the sidebar.
// nodes/edges now come from the backend via props (Dashboard -> App -> fetch),
// instead of being imported directly from the mock data file.
export default function GraphView({ nodes, edges, visible, onReady, onSelectNode, onRevealed }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!nodes.length) return; // nothing to draw yet (still loading from backend)

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...nodes.map((n) => ({ data: { id: n.id, label: n.label, type: n.type, risk: n.risk, ...n } })),
        ...edges.map((e, i) => ({ data: { id: 'e' + i, source: e.source, target: e.target, rel: e.rel } })),
      ],
      style: [
        { selector: 'node', style: {
          'background-color': (ele) => typeColor[ele.data('type')],
          label: 'data(label)', color: '#e4ecf2', 'font-size': 10, 'font-family': 'Manrope',
          'text-valign': 'bottom', 'text-margin-y': 7,
          width: (ele) => 26 + ele.data('risk') / 4, height: (ele) => 26 + ele.data('risk') / 4,
          'border-width': 2, 'border-color': '#070b10', opacity: 0,
        } },
        { selector: 'node[risk >= 70]', style: { 'border-width': 3, 'border-color': '#ff4757' } },
        { selector: 'node:selected', style: { 'border-width': 3, 'border-color': '#35e0c4' } },
        { selector: 'edge', style: { width: 1.6, 'line-color': '#26384a', 'curve-style': 'bezier', opacity: 0 } },
        { selector: 'edge:selected', style: { 'line-color': '#35e0c4', width: 2.5, opacity: 1 } },
      ],
      layout: { name: 'cose', animate: false, idealEdgeLength: 90, nodeRepulsion: 9000 },
    });

    cy.on('tap', 'node', (e) => onSelectNode(e.target));
    cyRef.current = cy;
    onReady(cy);

    // Staggered "coming online" reveal animation
    cy.nodes().forEach((n, i) => setTimeout(() => n.animate({ style: { opacity: 1 } }, { duration: 280 }), i * 70));
    cy.edges().forEach((e, i) => setTimeout(() => e.animate({ style: { opacity: 0.7 } }, { duration: 280 }), 500 + i * 45));
    setTimeout(() => onRevealed(), 900);

    return () => cy.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  return <div id="cy" ref={containerRef} style={{ display: visible ? 'block' : 'none' }} />;
}
