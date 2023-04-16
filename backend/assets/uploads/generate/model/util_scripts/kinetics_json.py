import argparse
import json
from pathlib import Path

import pandas as pd

def get_n_frames(video_path):
    return len([
        x for x in video_path.iterdir()
        if 'image' in x.name and x.name[0] != '.'
    ])


def get_n_frames_hdf5(video_path):
    with h5py.File(video_path, 'r') as f:
        video_data = f['video']
        return len(video_data)


def convert_csv_to_dict(csv_path, subset):
    data = pd.read_csv(csv_path)
    keys = []
    key_labels = []
    for i in range(data.shape[0]):
        row = data.iloc[i, :]
        basename = '%s_%s_%s' % (row['youtube_id'], '%06d' % row['time_start'],
                                 '%06d' % row['time_end'])
        keys.append(basename)
        if subset != 'testing':
            key_labels.append(row['label'])

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


"""def load_labels(train_csv_path):
    data = pd.read_csv(train_csv_path)
    return data['label'].unique().tolist()"""


def convert_kinetics_csv_to_json( test_csv_path,
                                 video_dir_path, video_type, dst_json_path):
    #labels = load_labels(train_csv_path)
    #train_database = convert_csv_to_dict(train_csv_path, 'training')
    #val_database = convert_csv_to_dict(val_csv_path, 'validation')

    test_database = convert_csv_to_dict(test_csv_path, 'testing')

    dst_data = {}
    #dst_data['labels'] = labels
    dst_data['database'] = {}
    #dst_data['database'].update(train_database)
    #dst_data['database'].update(val_database)
    if test_csv_path.exists():
        dst_data['database'].update(test_database)

    for k, v in dst_data['database'].items():
        if 'label' in v['annotations']:
            label = v['annotations']['label']
        else:
            label = 'test'

        if video_type == 'jpg':
            video_path = video_dir_path / label / k
            if video_path.exists():
                n_frames = get_n_frames(video_path)
                v['annotations']['segment'] = (1, n_frames + 1)
        else:
            video_path = video_dir_path / label / f'{k}.hdf5'
            if video_path.exists():
                n_frames = get_n_frames_hdf5(video_path)
                v['annotations']['segment'] = (0, n_frames)

    with dst_json_path.open('w') as dst_file:
        json.dump(dst_data, dst_file)


if __name__ == '__main__':

    video_path=Path(r"C:\Users\ALKODS\Downloads\SoccerShoubra")

    video_type='jpg'
    dst_path = Path(r"C:\Users\ALKODS\Downloads\json\soccerShoubra0.json")

    #train_csv_path = (args.dir_path /'kinetics-{}_train.csv'.format(args.n_classes))
    #val_csv_path = (args.dir_path /'kinetics-{}_val.csv'.format(args.n_classes))
    test_csv_path = Path(r"C:\Users\ALKODS\Downloads\json\testlist.txt")

    convert_kinetics_csv_to_json(test_csv_path,
                                 video_path, video_type,
                                 dst_path)
