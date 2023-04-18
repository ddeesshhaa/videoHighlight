from json import *
import re
import os
import sys
from moviepy.video.io.VideoFileClip import VideoFileClip
from pathlib import Path


arg1 = sys.argv[1]
tempDir = sys.argv[2]
name = os.path.splitext(arg1)[0]
extension = os.path.splitext(arg1)[1]
parentPath=os.path.abspath(os.path.join('assets',"uploads","videos",name))+"/"
# clipPath = os.path.abspath('assets/uploads/generate/clips')+"/"
clipPath = os.path.join(tempDir,"clips")+"/"


def split():
    a=0
    videoPath = os.path.join(parentPath,arg1)
    video = VideoFileClip(videoPath)
    duration = video.duration
    for i in range(0, int(duration), 5):
        a+=1
        clip = VideoFileClip(videoPath).subclip(i, i+5)
        clip.to_videofile(clipPath+str(name)+str(a-1)+extension, codec="libx264", temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
        clip.close()
    video.close()
split()