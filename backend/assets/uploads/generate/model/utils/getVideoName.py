import os
import sys

name = sys.argv[1]
clipPath = parentPath=os.path.abspath("assets/uploads/generate/clips")+"/"+name+"/"
files = os.listdir(clipPath)
path = parentPath=os.path.abspath("assets/uploads/generate/json")+"/"
filePath=os.path.join(path,"testlist.txt")
testFile = open(filePath,"a")
j=0
while(j<len(files)):
    for i in files:
        i = i.split(".")
        i = i[0]
        testFile.write("/"+name+"/"+i+"\n")
        j+=1