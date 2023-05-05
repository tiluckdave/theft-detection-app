from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

apparentPower = 0.0
theft = False


@app.route('/send', methods=['POST'])
@cross_origin()
def send():
  global apparentPower
  data = request.get_json()
  voltage = float(data['voltage'])
  current = float(data['current'])
  apparentPower = float(data['apparentPower'])
  print("Voltage: {}V, Current: {}A, Apparent Power: {}W".format(
    voltage, current, apparentPower))
  return 'Success'


@app.route('/fetch', methods=['GET'])
@cross_origin()
def fetch():
  return str(apparentPower)


# create a route called theft which would return the theft variable in json form
@app.route('/theft', methods=['GET'])
@cross_origin()
def theft():
    return json.dumps({'theft': theft})

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)
