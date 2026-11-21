// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';

export async function getLocations() {
  const res = await fetch(`${API_BASE_URL}/api/locations`);
  if (!res.ok) throw new Error('Failed to load locations');
  return await res.json();
}

export async function findRoute(start, end, stepFreeOnly) {
  const body = { startId: start, endId: end, stepFreeOnly };
  const res = await fetch(`${API_BASE_URL}/api/navigation/route`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Error ${res.status}`);
  }
  return await res.json();
}

export async function getGraph() {
  const res = await fetch(`${API_BASE_URL}/api/graph`);
  if (!res.ok) throw new Error('Failed to load graph');
  return await res.json();
}

export async function postReport(report) {
  const res = await fetch(`${API_BASE_URL}/api/reports`, {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(report),
  });
  if (!res.ok){
    const errText=await res.text();
    throw new Error(errText||`Error ${res.status}`);
  }
  return await res.json();
}

export async function getGates(){
  const res=await fetch(`${API_BASE_URL}/api/gates`);
  if(!res.ok)throw new Error('Failed to load gates');
  return await res.json();
}
