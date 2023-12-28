from flask import Flask, jsonify, request

import pickle
import os 
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
# from keras.layers import Dense, Dropout, Lambda, Embedding, Conv1D, LSTM, Input
# from tensorflow import keras
# from sklearn.metrics import accuracy_score
from gensim.models import Word2Vec

from sklearn.decomposition import TruncatedSVD
from sklearn import preprocessing
# from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB
# from sklearn.naive_bayes import BernoulliNB
from sklearn.model_selection import train_test_split
from flask_cors import CORS

import train_model



current_script_path = os.path.abspath(__file__)
current_directory = os.path.dirname(current_script_path)
resources_folder_path = os.path.join(current_directory, 'resources')

x_data_path = os.path.join(resources_folder_path, 'X_data.pkl')
y_data_path = os.path.join(resources_folder_path, 'y_data.pkl')
x_test_path = os.path.join(resources_folder_path, 'X_data_test.pkl')
y_test_path = os.path.join(resources_folder_path, 'y_data_test.pkl')

word2vec_model = Word2Vec.load( os.path.join(resources_folder_path, 'model','word2model.save'))

X_data = pickle.load(open(x_data_path, 'rb'))
y_data_ = pickle.load(open(y_data_path, 'rb'))
X_test = pickle.load(open(x_test_path, 'rb'))
y_test_ = pickle.load(open(y_test_path, 'rb'))


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def get_data():


    try:
        data = request.get_json()

        if 'input' in data:
            input_data = data['input']
            for i in input_data:
                X_test.append(i)
            count_vect = CountVectorizer(analyzer='word', token_pattern=r'\w{1,}')
            count_vect.fit(X_data)


            tfidf_vect = TfidfVectorizer(analyzer='word', max_features=30000)
            tfidf_vect.fit(X_data) # learn vocabulary and idf from training set
            X_data_tfidf =  tfidf_vect.transform(X_data)
            X_test_tfidf =  tfidf_vect.transform(X_test)


            svd = TruncatedSVD(n_components=300, random_state=42)
            svd.fit(X_data_tfidf)



            encoder = preprocessing.LabelEncoder()
            y_data = encoder.fit_transform(y_data_)
            y_test = encoder.fit_transform(y_test_)

            encoder.classes_
            res = train_model.train_model(MultinomialNB(), X_data_tfidf, y_data, X_test_tfidf, y_test, input_data, is_neuralnet=False)
            return jsonify({'result': res})
        else:
            return jsonify({'error': 'Input not found in request data'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/model', methods=['POST'])
def get_data1():


    try:
        data = request.get_json()

        if 'input' in data:
            input_data = data['input']
            print(input_data)
            res=word2vec_model.wv.most_similar(input_data)
            return jsonify({'result': res})
           
        else:
            return jsonify({'error': 'Input not found in request data'}), 400

    except Exception as e:
        # Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=False)
