from flask import Blueprint, request, jsonify, abort
from ..routing import dijkstra

bp = Blueprint('navigation', __name__, url_prefix='/api/navigation')

@bp.route('/route', methods=['POST'])
def compute_route():
    data = request.get_json(silent=True)
    if not data:
        abort(400, description="Invalid JSON payload")
    start = data.get('startId')
    end = data.get('endId')
    step_free_only = bool(data.get('stepFreeOnly', False))
    if not start or not end:
        abort(400, description="'startId' and 'endId' are required")
    try:
        route = dijkstra(start, end, step_free_only=step_free_only)
    except KeyError as e:
        abort(404, description=str(e))
    except ValueError as e:
        abort(422, description=str(e))  # Unprocessable Entity for unreachable
    return jsonify(route), 200
