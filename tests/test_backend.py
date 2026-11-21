import unittest
from backend.routing import dijkstra, EDGES
from backend.app import app

class TestRouting(unittest.TestCase):
    def test_normal_route(self):
        result = dijkstra('buildA-1', 'room101-1', step_free_only=False)
        self.assertEqual(result['pathNodes'], ['buildA-1', 'corr1-1', 'room101-1'])
        self.assertAlmostEqual(result['totalDistance'], 35.0)

    def test_stepfree_no_route(self):
        with self.assertRaises(ValueError) as cm:
            dijkstra('buildA-1', 'room101-1', step_free_only=True)
        self.assertIn("No route found", str(cm.exception))

    def test_stepfree_partial_route(self):
        result = dijkstra('buildA-1', 'corr1-1', step_free_only=True)
        self.assertEqual(result['pathNodes'], ['buildA-1', 'corr1-1'])
        self.assertAlmostEqual(result['totalDistance'], 15.0)

    def test_blocked_edge_excluded(self):
        # Temporarily block edge-1
        original_status = EDGES['edge-1']['status']
        EDGES['edge-1']['status'] = 'blocked'
        try:
            with self.assertRaises(ValueError):
                dijkstra('buildA-1', 'corr1-1', step_free_only=False)
        finally:
            EDGES['edge-1']['status'] = original_status

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        resp = self.client.get('/api/health')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIn('status', data)

    def test_normal_route_api(self):
        payload = {"startId": "buildA-1", "endId": "room101-1"}
        resp = self.client.post('/api/navigation/route', json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data['pathNodes'], ['buildA-1', 'corr1-1', 'room101-1'])

    def test_stepfree_no_route_api(self):
        payload = {"startId": "buildA-1", "endId": "room101-1", "stepFreeOnly": True}
        resp = self.client.post('/api/navigation/route', json=payload)
        self.assertEqual(resp.status_code, 422)

    def test_stepfree_partial_route_api(self):
        payload = {"startId": "buildA-1", "endId": "corr1-1", "stepFreeOnly": True}
        resp = self.client.post('/api/navigation/route', json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data['pathNodes'], ['buildA-1', 'corr1-1'])

    def test_report_submission(self):
        payload = {"from": "corr1-1", "to": "room101-1", "description": "Test report"}
        resp = self.client.post('/api/reports', json=payload)
        self.assertEqual(resp.status_code, 201)
        data = resp.get_json()
        self.assertIn('id', data)
        self.assertEqual(data['status'], 'pending')

    def test_get_reports(self):
        # Ensure list is accessible
        resp = self.client.get('/api/reports')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIsInstance(data, list)

if __name__ == '__main__':
    unittest.main()
