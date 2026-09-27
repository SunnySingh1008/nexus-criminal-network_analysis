export const typeColor = {
  person: '#5b9dff', location: '#35e0c4', vehicle: '#ffb347', phone: '#b985ff', org: '#ff6b5b',
};

export const cases = [
  { id: 'CASE #1104', name: 'Narela Theft Ring', meta: '14 entities · updated 2h ago', status: 'active', label: 'ANALYZED' },
  { id: 'CASE #1098', name: 'Rohini Extortion Case', meta: '3 files uploaded · pending analysis', status: 'review', label: 'PENDING' },
  { id: 'CASE #1112', name: 'Karol Bagh Financial Fraud', meta: 'no files yet', status: 'new', label: 'NEW' },
];

export const mockFiles = [
  { n: 'FIR_2026_0847.pdf', t: 'FIR', s: '1.2 MB' },
  { n: 'CDR_export_sep.csv', t: 'CDR', s: '340 KB' },
  { n: 'financial_stmt.pdf', t: 'FIN', s: '890 KB' },
];

export const nodes = [
  { id: 'p1', label: 'Rakesh Malhotra', type: 'person', risk: 82, aliases: '"RK"', sources: '3 FIRs, 2 CDRs', lastSeen: '12 Sep 2026 · Sector 21' },
  { id: 'p2', label: 'Vikram Saini', type: 'person', risk: 64, aliases: '—', sources: '1 FIR, 4 CDRs', lastSeen: '18 Sep 2026 · Rohini' },
  { id: 'p3', label: 'Anjali Kapoor', type: 'person', risk: 29, aliases: '—', sources: '1 CDR', lastSeen: '02 Sep 2026 · Dwarka' },
  { id: 'p4', label: 'Suresh Yadav', type: 'person', risk: 71, aliases: '"Bantu"', sources: '2 FIRs, 1 financial', lastSeen: '20 Sep 2026 · Nangloi' },
  { id: 'o1', label: 'Shree Traders Pvt Ltd', type: 'org', risk: 58, aliases: 'shell entity (suspected)', sources: 'Financial records', lastSeen: 'Registered Karol Bagh' },
  { id: 'l1', label: 'Warehouse, Narela', type: 'location', risk: 45, aliases: '—', sources: 'Surveillance log', lastSeen: 'Frequent visits, odd hours' },
  { id: 'l2', label: 'Sector 21 Flat 4B', type: 'location', risk: 38, aliases: '—', sources: 'FIR address', lastSeen: '—' },
  { id: 'v1', label: 'DL 3C AB 4521', type: 'vehicle', risk: 52, aliases: 'White Innova', sources: 'Surveillance, FIR', lastSeen: 'Seen near warehouse ×6' },
  { id: 'ph1', label: '+91 98XXX 22104', type: 'phone', risk: 70, aliases: 'Registered: Rakesh M.', sources: 'CDR', lastSeen: '47 calls / 5 days' },
  { id: 'ph2', label: '+91 87XXX 90031', type: 'phone', risk: 33, aliases: 'Unregistered SIM', sources: 'CDR', lastSeen: 'Burner pattern' },
];

export const edges = [
  { source: 'p1', target: 'ph1', rel: 'owns' },
  { source: 'p1', target: 'p2', rel: '23 calls/5d' },
  { source: 'p2', target: 'ph2', rel: 'owns' },
  { source: 'p1', target: 'o1', rel: 'director' },
  { source: 'o1', target: 'l1', rel: 'registered at' },
  { source: 'p4', target: 'l1', rel: 'visited ×6' },
  { source: 'v1', target: 'l1', rel: 'seen at' },
  { source: 'p4', target: 'v1', rel: 'owner' },
  { source: 'p2', target: 'l2', rel: 'resident' },
  { source: 'p1', target: 'l2', rel: 'co-accused' },
  { source: 'p3', target: 'ph1', rel: '2 calls' },
  { source: 'p4', target: 'o1', rel: 'fund transfer' },
];

export const alertMsgs = [
  'Call spike: Rakesh Malhotra ↔ Vikram Saini (23 calls / 48h)',
  'Odd-hour warehouse visits — Suresh Yadav, ×4 this week',
  'Suspected shell entity flagged: Shree Traders Pvt Ltd',
];
