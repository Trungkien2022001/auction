from sklearn.model_selection import train_test_split
import pickle

labelText = [
    "Tiêu cực",
    "Trung tính",  
    "Tích cực"
]

def train_model(classifier, X_data, y_data, X_test, y_test, input_data, is_neuralnet=False, n_epochs=5):       
    X_train, X_val, y_train, y_val = train_test_split(X_data, y_data, test_size=0.1, random_state=42)
    
    if is_neuralnet:
        classifier.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=n_epochs, batch_size=256)
        
        val_predictions = classifier.predict(X_val)
        test_predictions = classifier.predict(X_test)
        val_predictions = val_predictions.argmax(axis=-1)
        test_predictions = test_predictions.argmax(axis=-1)
        filename = 'cnn.pkl'
        with open(filename, 'wb') as file:
            pickle.dump(classifier, file)
    else:
        classifier.fit(X_train, y_train)
        train_predictions = classifier.predict(X_train)
        val_predictions = classifier.predict(X_val)
        test_predictions = classifier.predict(X_test)
        filename = 'MultinomialNB.pkl'
        
        # with open(filename, 'wb') as file:
        #     pickle.dump(classifier, file)

        #     result_array = []

        for i in range(len(input_data)):
            result_dict = {
                'key': input_data[i],
                'label': str(labelText[test_predictions[len(test_predictions) - len(input_data) + i]])
            }
            result_array.append(result_dict)

        return result_array

