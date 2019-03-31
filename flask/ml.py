from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
# app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)


import io
import random
from flask import Response, jsonify
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from kernel import gen_plt
import requests
import json


def ctf(f):
    return (f - 32)*(5/9)


@app.route('/<lon>/<lat>/<dbuid>/<unix>/')
# @cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def process(lat, lon, dbuid, unix):

    # get weather
    r = requests.get(
        'https://api.darksky.net/forecast/a7c0018cde969bbad1ec16d136307721/{},{},{}'.format(lat, lon, unix))
    json_data = json.loads(r.text)
    jd = json_data['daily']
    for i in jd['data']:
        tmin = float(i['temperatureMin'])
        tmax = float(i['temperatureMax'])
        t = (tmin + tmax)/2
        ct = ctf(t)

    # get crop yeild

    final_data = {}
    final_data['temp'] = ct

    print(final_data)

    response = jsonify(final_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)
