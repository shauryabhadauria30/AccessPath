from flask import Blueprint, jsonify
import json
import os

bp = Blueprint('graph', __name__, url_prefix='/api')

# Load the graph data once at module import
GRAPH_PATH = os.path.join(os.path.dirname(__file__), '..', 'graph.json')
with open(GRAPH_PATH, 'r') as f:
    GRAPH_DATA = json.load(f)

@bp.route('/graph', methods=['GET'])
def get_graph():
    return jsonify(GRAPH_DATA), 200
