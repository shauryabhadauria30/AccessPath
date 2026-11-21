from flask import Flask, jsonify
from flask_cors import CORS

# Import blueprints
from .routes.locations import bp as locations_bp
from .routes.navigation import bp as navigation_bp
from .routes.reports import bp as reports_bp
from .routes.gates import bp as gates_bp
from .routes.graph import bp as graph_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins – sufficient for a hackathon.

# Register blueprints
app.register_blueprint(locations_bp)
app.register_blueprint(navigation_bp)
app.register_blueprint(reports_bp)
app.register_blueprint(gates_bp)
app.register_blueprint(graph_bp)

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint. Returns 200 with a simple JSON."""
    return jsonify({"status": "ok", "message": "AccessPath backend is running"})

if __name__ == '__main__':
    # Development server – use the host and port from environment if set.
    app.run(host='0.0.0.0', port=5000, debug=True)
