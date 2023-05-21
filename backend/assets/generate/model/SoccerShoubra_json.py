import json
from pathlib import Path

import pandas as pd



def get_n_frames(video_path):
    return len([
        x for x in video_path.iterdir()
        if 'image' in x.name and x.name[0] != '.'
    ])

def convert_csv_to_dict(csv_path, subset):
    data = pd.read_csv(csv_path, delimiter=' ', header=None, on_bad_lines='skip')

    keys = []
    key_labels = []
    for i in range(data.shape[0]):
        row = data.iloc[i, :]
        slash_rows = data.iloc[i, 0].split('/')
        if subset != 'testing':
            class_name = slash_rows[0]
            basename = slash_rows[1].split('.')[0]
        else:
            basename = slash_rows[0]

        keys.append(basename)
        if subset != 'testing':
            key_labels.append(class_name)

    database = {}
    for i in range(len(keys)):
        key = keys[i]
        database[key] = {}
        database[key]['subset'] = subset
        if subset != 'testing':
            label = key_labels[i]
            database[key]['annotations'] = {'label': label}
        else:
            database[key]['annotations'] = {}

    return database


def load_labels(label_csv_path):
    data = pd.read_csv(label_csv_path, delimiter=' ', header=None, on_bad_lines='skip')
    print("xx"*20)
    print(data)
    print("xx"*20)
    labels = []
    for i in range(data.shape[0]):
        labels.append(data.iloc[i, 1])
    return labels


def convert_ucf101_csv_to_json(label_csv_path, test_csv_path, video_dir_path, dst_json_path):
    labels = load_labels(label_csv_path)
    #train_database = convert_csv_to_dict(train_csv_path, 'training')
    #val_database = convert_csv_to_dict(val_csv_path, 'validation')
    test_database = convert_csv_to_dict(test_csv_path, 'testing')
    dst_data = {}
    dst_data['labels'] = labels
    dst_data['database'] = {}
    #dst_data['database'].update(train_database)
    #dst_data['database'].update(val_database)
    dst_data['database'].update(test_database)

    for k, v in dst_data['database'].items():
        if 'label' in v['annotations']:
            label = v['annotations']['label']
        else:
            label = ''

        video_path = video_dir_path / label / k
        n_frames = get_n_frames(video_path)
        v['annotations']['segment'] = (1, n_frames + 1)

    with dst_json_path.open('w') as dst_file:
        json.dump(dst_data, dst_file)


if __name__ == '__main__':

    label_csv_path = Path(r"C:\Users\marsellinomedhat10\Downloads\json\classInd.txt")
    #train_csv_path = Path(r"C:\Users\ALKODS\Downloads\json\trainlist0.txt")
    #val_csv_path = Path(r"C:\Users\ALKODS\Downloads\json\testlist0.txt")
    test_csv_path = Path(r"C:\Users\marsellinomedhat10\Downloads\json\test.txt")
    dst_json_path = Path(r"C:\Users\marsellinomedhat10\Downloads\json\SoccerShoubra_test.json")
    jpg_path = Path(r"C:\Users\marsellinomedhat10\Downloads\test")



    convert_ucf101_csv_to_json(label_csv_path, test_csv_path, jpg_path, dst_json_path)
