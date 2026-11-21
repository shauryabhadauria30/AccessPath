# Test suite for routing algorithm
import unittest

# Import the module under test
from backend import routing

class TestRouting(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Store original status of edge-1 to restore after tests that modify it
        cls.original_status_edge1 = routing.EDGES.get('edge-1', {}).get('status')

    def tearDown(self):
        # Ensure any modifications are reverted
        if 'edge-1' in routing.EDGES:
            routing.EDGES['edge-1']['status'] = self.original_status_edge1

    def test_normal_route_buildA_to_room101(self):
        result = routing.dijkstra('buildA-1', 'room101-1')
        expected_nodes = ['buildA-1', 'corr1-1', 'room101-1']
        expected_edges = ['edge-1', 'edge-2']
        self.assertEqual(result['pathNodes'], expected_nodes)
        self.assertEqual(result['pathEdges'], expected_edges)
        self.assertAlmostEqual(result['totalDistance'], 35.0, places=2)

    def test_step_free_route_buildA_to_corr1_success(self):
        result = routing.dijkstra('buildA-1', 'corr1-1', step_free_only=True)
        expected_nodes = ['buildA-1', 'corr1-1']
        expected_edges = ['edge-1']
        self.assertEqual(result['pathNodes'], expected_nodes)
        self.assertEqual(result['pathEdges'], expected_edges)

    def test_step_free_route_buildA_to_room101_no_path(self):
        with self.assertRaises(ValueError) as cm:
            routing.dijkstra('buildA-1', 'room101-1', step_free_only=True)
        self.assertIn("No route found", str(cm.exception))

    def test_unreachable_destination(self):
        # No path from room101 to lift1 in the mock graph
        with self.assertRaises(ValueError) as cm:
            routing.dijkstra('room101-1', 'lift1-1')
        self.assertIn("No route found", str(cm.exception))

    def test_invalid_node_id(self):
        with self.assertRaises(KeyError):
            routing.dijkstra('invalid-node', 'buildA-1')
        with self.assertRaises(KeyError):
            routing.dijkstra('buildA-1', 'invalid-node')

    def test_blocked_edge_excluded(self):
        # Temporarily block edge-1 which is part of the normal shortest path
        routing.EDGES['edge-1']['status'] = 'blocked'
        with self.assertRaises(ValueError) as cm:
            routing.dijkstra('buildA-1', 'room101-1')
        self.assertIn("No route found", str(cm.exception))

if __name__ == '__main__':
    unittest.main()
