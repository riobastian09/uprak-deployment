'''
	Deloyment untuk Domain Data Science (DS)
	Kelompok 5 Eunoia
	2022
'''

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from joblib import load

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
model = load('model_heart_dt.model')

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]	
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():
	# Nilai default untuk variabel input atau features (X) ke model
	input_Age = 21
	input_Sex  = 0
	input_ChestPainType = 3
	input_RestingBP = 100
	input_Cholesterol = 180.9
	input_FastingBS  = 1
	input_RestingECG = 0
	input_MaxHR = 116.8
	input_ExerciseAngina = 1
	input_Oldpeak  = 0.92
	input_ST_Slope = 0
	
	if request.method=='POST':
		# Set nilai untuk variabel input atau features (X) berdasarkan input dari pengguna
		input_Age = float(request.form['i_Age'])
		input_Sex  = float(request.form['i_Sex'])
		input_ChestPainType = float(request.form['i_ChestPainType'])
		input_RestingBP = float(request.form['i_RestingBP'])
		input_Cholesterol = float(request.form['i_Cholesterol'])
		input_FastingBS  = float(request.form['i_FastingBS'])
		input_RestingECG = float(request.form['i_RestingECG'])
		input_MaxHR = float(request.form['i_MaxHR'])
		input_ExerciseAngina = float(request.form['i_ExerciseAngina'])
		input_Oldpeak  = float(request.form['i_Oldpeak'])
		input_ST_Slope = float(request.form['i_ST_Slope'])

		# Prediksi kelas atau spesies bunga iris berdasarkan data pengukuran yg diberikan pengguna
		df_test = pd.DataFrame(data={
			"Age" : [input_Age],
			"Sex"  : [input_Sex],
			"ChestPainType" : [input_ChestPainType],
			"RestingBP"  : [input_RestingBP],
			"Cholesterol" : [input_Cholesterol],
			"FastingBS"  : [input_FastingBS],
			"RestingECG" : [input_RestingECG],
			"MaxHR"  : [input_MaxHR],
			"ExerciseAngina" : [input_ExerciseAngina],
			"Oldpeak"  : [input_Oldpeak],
			"ST_Slope" : [input_ST_Slope]
		})

		hasil_prediksi = model.predict(df_test[0:1])[0]

		# Set Path untuk gambar hasil prediksi
		if hasil_prediksi == 'Normal':
			gambar_prediksi = '/static/images/normal_heart.png'
		elif hasil_prediksi == 'Heart-Disease':
			gambar_prediksi = '/static/images/heart_disease.png'
		
		# Return hasil prediksi dengan format JSON
		return jsonify({
			"prediksi": hasil_prediksi,
			"gambar_prediksi" : gambar_prediksi
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Load model yang telah ditraining
	# model = load('model_heart_dt.model')

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


