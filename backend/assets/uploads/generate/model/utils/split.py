from json import *
import re
import os
import sys
from moviepy.video.io.VideoFileClip import VideoFileClip
from pathlib import Path


arg1 = sys.argv[1]
name = os.path.splitext(arg1)[0]
extension = os.path.splitext(arg1)[1]
parentPath=os.path.abspath("assets/uploads/videos")+"/"
clipPath = os.path.abspath('assets/uploads/generate/clips')+"/"


def split():
    a=0
    print(name)
    os.mkdir(os.path.join(clipPath,name))
    videoPath = os.path.join(parentPath,arg1)
    video = VideoFileClip(videoPath)
    duration = video.duration
    for i in range(0, int(duration), 5):
        a+=1
        clip = VideoFileClip(videoPath).subclip(i, i+5)
        clip.to_videofile(clipPath+str(name)+"/"+str(name)+str(a-1)+extension, codec="libx264", temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
        clip.close()
    video.close()
split()