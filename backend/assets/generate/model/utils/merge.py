from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from moviepy.editor import *
from time import sleep
from json import *
import re
import sys

tempPath = sys.argv[1]
videoName = sys.argv[2]
ext = sys.argv[3]
watermark_image_path = sys.argv[4]


with open(os.path.join(tempPath, "result", "test.json"), 'r') as f:  # path of output json result
    distros_dict = load(f)


# path of directory that contains videoclips
root = (os.path.join(tempPath, "clips"))+"/"
clips = []
for distro in distros_dict['results']:
    clip_name = distro
    label = distros_dict['results'][clip_name][0]['label']
    score = float(distros_dict['results'][clip_name][0]['score'])
    if score > 0.7 and label == "Goals":
        required_video_file = root + clip_name + "." + ext
        clip = VideoFileClip(required_video_file)
        watermark = ImageClip(watermark_image_path).set_duration(
            clip.duration).resize(height=0.1*clip.h)
        watermark = watermark.set_position(
            ("right", "bottom")).set_opacity(0.7)
        clipWithWatermark = CompositeVideoClip([clip, watermark])
        clips.append(clipWithWatermark)
        # clips.append(clip)

    if score > 0.7 and label == ("Subs"):
        required_video_file = root + clip_name + "." + ext

        clip = VideoFileClip(required_video_file)
        watermark = ImageClip(watermark_image_path).set_duration(
            clip.duration).resize(height=0.1*clip.h)
        watermark = watermark.set_position(
            ("right", "bottom")).set_opacity(0.7)
        clipWithWatermark = CompositeVideoClip([clip, watermark])
        clips.append(clipWithWatermark)

        # clips.append(clip)

    if score > 0.9 and label == ("Cards"):
        required_video_file = root + clip_name + "." + ext

        clip = VideoFileClip(required_video_file)
        watermark = ImageClip(watermark_image_path).set_duration(
            clip.duration).resize(height=0.1*clip.h)
        watermark = watermark.set_position(
            ("right", "bottom")).set_opacity(0.7)
        clipWithWatermark = CompositeVideoClip([clip, watermark])
        clips.append(clipWithWatermark)
        # clips.append(clip)


highlight = concatenate_videoclips(clips)


# watermark = ImageClip(watermark_image_path).set_duration(
#     highlight.duration).resize(height=0.8*highlight.h)
# watermark = watermark.set_position(("right", "bottom")).set_opacity(0.7)
# video_with_watermark = CompositeVideoClip([highlight, watermark])


highlight.write_videofile(tempPath+"\\"+videoName+"-Highlight."+ext, codec="libx264",
                          temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
