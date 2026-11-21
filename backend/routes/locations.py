from flask import Blueprint, jsonify, abort
from ..routing import NODES

bp = Blueprint('locations', __name__, url_prefix='/api/locations')

@bp.route('/', methods=['GET'])
def list_locations():
    """Return all location nodes."""
    return jsonify(list(NODES.values()))

@bp.route('/<node_id>', methods=['GET'])
def get_location(node_id):
    node = NODES.get(node_id)
    if not node:
        abort(404, description=f"Node {node_id} not found")
    return jsonify(node)
