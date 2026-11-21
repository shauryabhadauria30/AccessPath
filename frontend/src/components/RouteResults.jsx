// src/components/RouteResults.jsx
/**
 * Displays the result of a route request.
 */
export default function RouteResults({ locations, loading, error, route }) {
  if (loading) return <p className="status">Calculating…</p>;
  if (error) return <p className="status error">{error}</p>;

  if (!route) return null;

  const { pathNodes, pathEdges, totalDistance } = route;
  const locationMap = new Map(locations.map((l)=>[l.id,l]));
  const nodeNames = pathNodes.map((id)=>{
    const l=locationMap.get(id);
    return l?l.name:id;
  });

  return (
    <section className="route-results">
      <h3>Route Summary</h3>
      <p>Path: {nodeNames.join(' → ')}</p>
      <p>Edges: {pathEdges.join(', ')}</p>
      <p>Total distance: {totalDistance} m</p>
    </section>
  );
}
