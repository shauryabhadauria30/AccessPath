import json
import heapq
from typing import Dict, List, Tuple, Optional

# Load graph data once at module import
import os
# Load graph data relative to this file's directory
GRAPH_PATH = os.path.join(os.path.dirname(__file__), 'graph.json')
with open(GRAPH_PATH, 'r') as f:
    GRAPH_DATA = json.load(f)

NODES = {node['id']: node for node in GRAPH_DATA.get('nodes', [])}
EDGES = {edge['id']: edge for edge in GRAPH_DATA.get('edges', [])}

# Build adjacency list for active edges
ADJ: Dict[str, List[Tuple[str, float, str]]] = {}
for edge_id, edge in EDGES.items():
    if edge.get('status') != 'active':
        continue  # skip blocked
    frm = edge['from']
    to = edge['to']
    dist = edge.get('distance', 0.0)
    ADJ.setdefault(frm, []).append((to, dist, edge_id))
    ADJ.setdefault(to, []).append((frm, dist, edge_id))  # assume undirected


def _build_adj(step_free_only: bool) -> Dict[str, List[Tuple[str, float, str]]]:
    """Return adjacency list respecting step‑free flag."""
    adj: Dict[str, List[Tuple[str, float, str]]] = {}
    for edge_id, edge in EDGES.items():
        if edge.get('status') != 'active':
            continue
        if step_free_only and not edge.get('stepFreeVerified', False):
            continue
        frm, to = edge['from'], edge['to']
        dist = edge.get('distance', 0.0)
        adj.setdefault(frm, []).append((to, dist, edge_id))
        adj.setdefault(to, []).append((frm, dist, edge_id))
    return adj


def dijkstra(start: str, end: str, step_free_only: bool = False) -> Dict:
    """
    Compute the shortest path (by distance) between start and end node IDs.

    Parameters
    ----------
    start : str
        Node ID of the starting point.
    end : str
        Node ID of the destination.
    step_free_only : bool, optional
        If True, edges that are not verified as step‑free (e.g., unverified ramps or lifts) are ignored.

    Returns
    -------
    dict
        ``{"pathNodes": [...], "pathEdges": [...], "totalDistance": float,
        "estimatedTimeMinutes": float}``

    Raises
    ------
    KeyError
        If start or end node ID is not in the graph.
    ValueError
        If there is no path between start and end.
    """
    if start not in NODES:
        raise KeyError(f"Start node '{start}' does not exist")
    if end not in NODES:
        raise KeyError(f"End node '{end}' does not exist")

    adj = _build_adj(step_free_only)

    # Priority queue: (cumulative_distance, current_node, prev_edge_id, path_nodes, path_edges)
    pq = [(0.0, start, None, [start], [])]
    visited: Dict[str, float] = {}

    while pq:
        dist, node, via_edge, path_nodes, path_edges = heapq.heappop(pq)
        if node in visited and visited[node] <= dist:
            continue
        visited[node] = dist
        if node == end:
            # Build result
            return {
                "pathNodes": path_nodes,
                "pathEdges": path_edges,
                "totalDistance": round(dist, 2),
                # Estimate: assume 1 meter ~ 0.02 minutes (30 m per minute walking speed)
                "estimatedTimeMinutes": round(dist * 0.02, 2),
            }
        for neighbor, w, edge_id in adj.get(node, []):
            if visited.get(neighbor) is not None and visited[neighbor] <= dist + w:
                continue
            heapq.heappush(pq, (dist + w, neighbor, edge_id, path_nodes + [neighbor], path_edges + [edge_id]))
    raise ValueError(f"No route found from '{start}' to '{end}'.")
