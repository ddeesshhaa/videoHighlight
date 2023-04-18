from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from moviepy.editor import *
from time import sleep
from json import *
import re
import sys

tempPath = sys.argv[1]
ext = sys.argv[2]

with open(os.path.join(tempPath,"result","test.json"), 'r') as f: #path of output json result
    distros_dict = load(f)


root = (os.path.join(tempPath,"clips"))+"/" #path of directory that contains videoclips
clips = []
for distro in distros_dict['results']:
    clip_name = distro
    label = distros_dict['results'][clip_name][0]['label']
    score = float(distros_dict['results'][clip_name][0]['score'])
    if score > 0.5 and label =="Goals":
        required_video_file = root + clip_name +"."+ ext
        clip = VideoFileClip(required_video_file)
        clips.append(clip)
    if score > 0.8 and label ==("Subs"):
        required_video_file = root + clip_name + "."+ ext

        clip = VideoFileClip(required_video_file)
        clips.append(clip)

    if score > 0.8 and label ==("Cards"):
        required_video_file = root + clip_name + "."+ ext

        clip = VideoFileClip(required_video_file)
        clips.append(clip)



highlight = concatenate_videoclips(clips)
highlight.write_videofile(tempPath+"/highlighted."+ext, codec="libx264", temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
