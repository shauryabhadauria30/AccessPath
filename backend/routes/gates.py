from flask import Blueprint, jsonify
import datetime

bp = Blueprint('gates', __name__, url_prefix='/api')

# Mock gate notices – in a real system this would come from a DB or external service.
NOTICES = [
    {
        "id": "gate-1",
        "description": "Main Gate is open for all visitors.",
        "timestamp": datetime.datetime.utcnow().isoformat() + 'Z'
    },
    {
        "id": "gate-2",
        "description": "Back Entrance closed for maintenance until 5 PM.",
        "timestamp": datetime.datetime.utcnow().isoformat() + 'Z'
    }
]

@bp.route('/gates', methods=['GET'])
def get_gates():
    return jsonify(NOTICES)
