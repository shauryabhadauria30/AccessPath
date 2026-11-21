from flask import Blueprint, request, jsonify, abort
import uuid
import datetime

bp = Blueprint('reports', __name__, url_prefix='/api')
# In-memory store
REPORTS = []

@bp.route('/reports', methods=['GET'])
def list_reports():
    return jsonify(REPORTS)

@bp.route('/reports', methods=['POST'])
def create_report():
    data = request.get_json(silent=True)
    if not data:
        abort(400, description="Invalid JSON payload")
    fr = data.get('from')
    to = data.get('to')
    desc = data.get('description', '')
    if not fr or not to:
        abort(400, description="'from' and 'to' are required fields")
    report = {
        "id": str(uuid.uuid4()),
        "from": fr,
        "to": to,
        "description": desc,
        "status": "pending",
        "timestamp": datetime.datetime.utcnow().isoformat() + 'Z'
    }
    REPORTS.append(report)
    return jsonify(report), 201
