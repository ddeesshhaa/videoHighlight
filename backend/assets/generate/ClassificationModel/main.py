import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tqdm import tqdm
from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
from pathlib import Path
import sys


def check():
    modelPath = os.path.abspath(os.path.join(
        "assets", "generate", "ClassificationModel", "vgg16_model.h5"))

    framesPath = sys.argv[1]

    loaded_model = load_model(modelPath)

    test_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
        directory=framesPath, target_size=(224, 224), batch_size=11, shuffle=False
    )
    preds = loaded_model.predict(test_batches)
    y_pred = np.argmax(preds, axis=1)
    # print(y_pred)

    x = sum(y_pred)

    if x < 9:
        return True
    else:
        return False


if check():
    sys.exit(0)
else:
    sys.exit(1)
