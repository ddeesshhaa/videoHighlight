import os
import sys

name = sys.argv[1]
tempPath = sys.argv[2]
clipPath = os.path.join(tempPath,"clips")+"/"
files = os.listdir(clipPath)
path = os.path.join(tempPath,"json")+"/"
filePath=os.path.join(path,"testlist.txt")
testFile = open(filePath,"w")
j=0
while(j<len(files)):
    for i in files:
        i = i.split(".")
        i = i[0]
        testFile.write(i+"\n")
        j+=1