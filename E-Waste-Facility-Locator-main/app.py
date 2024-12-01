import os,dotenv
from flask import Flask,request, jsonify
from flask_cors import CORS

from waitress import serve # Replace with your app's import




dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

import google.generativeai as genai


gem_api = os.getenv('gem_api')
genai.configure(api_key=gem_api)



model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="""you are an chatbot helper for an e waste focused on recycling website if relevant question is asked reply accordingly else ask to ask a relevent questions reply in english""",
)
@app.route('/chat', methods=['POST'])
def chat():
    print
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    response = model.generate_content(user_message)
    response = str(response.candidates[0].content.parts[0].text)
    print(response)
    return jsonify({'message': response})



serve(app, host='0.0.0.0', port=8080)