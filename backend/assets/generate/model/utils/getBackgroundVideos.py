from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from moviepy.editor import VideoFileClip
from time import sleep
from json import *
import os


def split():
    print(times1)
    print(times2)
    a = 0
    id = -1
    required_video_file = ""
    arr = os.listdir('.')
    print("-----------------------------------")
    z = "background"
    path = r"C:\Users\mosta\OneDrive\Desktop\Data\match1\1\\"
    noOfVideos = 0
    index = 0
    for i in halfs:
        if int(i) == 1:
            required_video_file = "Data\\"+j+"\\""1_224p.mkv"
        elif int(i) == 2:
            required_video_file = "Data\\"+j+"\\""2_224p.mkv"

        videoPath = os.path.join(required_video_file)
        video = VideoFileClip(videoPath)
        if noOfVideos == 0:
            for i in range(0, 25, 5):
                id += 1
                clip = VideoFileClip(videoPath).subclip(i, i+5)
                clip.to_videofile(path+str(names[a])+str(id)+".mkv", codec="libx264",
                                  temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
                noOfVideos = noOfVideos+1
                clip.close()
        elif times1[index+1]-times2[index] > 300 and halfs[index+1] == halfs[index]:
            for i in range(times2[index]+120, times2[index]+145, 5):
                id += 1
                clip = VideoFileClip(videoPath).subclip(i, i+5)
                clip.to_videofile(path+str(names[a])+str(id)+".mkv", codec="libx264",
                                  temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
                noOfVideos = noOfVideos+1
                id = id + 1

                clip.close()
            index = index + 1
        else:
            index = index+1
        print(index)

    if index >= len(times1):
        video.close()
        print("Done", noOfVideos)


files = os.listdir("Data")
for j in files:
    times1 = []
    times2 = []
    labels = []
    halfs = []
    names = []
    with open("Data\\"+j+'\Labels.json', 'r') as f:
        distros_dict = load(f)

    def checkLabel(x):
        if x == "soccer-ball":
            label1 = "g"
        elif x == "substitution-in" or x == "substitution-out":
            label1 = "s"
        else:
            label1 = "c"
        return label1

    for distro in distros_dict['annotations']:
        half = distro['gameTime'][0]
        time1 = distro['gameTime'][4:6]
        time2 = distro['gameTime'][7:9]
        time = int(time1)*60+int(time2)
        firstP = int(time)-3
        secondP = int(time)+2

        if firstP < 0:
            firstP = 0

        label2 = checkLabel(distro['label'])
        times1.append(firstP)
        times2.append(secondP)
        labels.append(label2)
        halfs.append(half)
        name = distros_dict['UrlLocal']
        name1 = ""
        for i in name:
            if i.isalnum():
                name1 += i
        name1 = name1+str(half)+"st"
        names.append(name1)

    split()
