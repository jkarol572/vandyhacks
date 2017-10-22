from flask import Flask, request, Response
import random
import requests
import json
import urllib

app = Flask(__name__)

@app.route('/random', methods=['GET'])
def main():
	return str(random.uniform(0.0, 1.0))

@app.route('/analysis', methods=['GET'])
def analysis():
	values = request.args.to_dict()
	text = urllib.unquote_plus(values["text"])
	print text
	url = "http://text-processing.com/api/sentiment/"
	body = {}
	body["text"] = text
	r = requests.post(url, data=body).json()["label"]
	resp = Response(r)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.headers['Access-Control-Allow-Headers'] = 'Content-Type';
	resp.headers['Access-Control-Allow-Methods'] = 'GET';


	return resp


if __name__ == '__main__':
        app.run(host= '67.205.128.198', port=9000, debug=True)
