import os
from moviepy.editor import VideoFileClip
import sys
import imageio
import random


video_path = sys.argv[1]
video = VideoFileClip(video_path)

frames_directory = sys.argv[2]
os.makedirs(frames_directory, exist_ok=True)

frame_count = 11
total_duration = video.duration
timestamps = [i * total_duration / (frame_count + 1)
              for i in range(1, frame_count + 1)]
randomFrames = random.sample(range(1, int(total_duration)), 11)


for i, timestamp in enumerate(randomFrames):
    frame = video.get_frame(timestamp)
    frame_path = os.path.join(frames_directory, f"frame_{i+1}.jpg")
    imageio.imwrite(frame_path, frame)
