from flask_cors import CORS
from website import create_app

app = create_app()
CORS(app)
if __name__ == '__app__':
    app.run(debug=True)




