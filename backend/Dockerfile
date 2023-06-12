FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

#COPY requirements.txt ./

RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg curl wget
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1ZWN4zoJk9AiPCj4WzjLwdCgLeDcClLbi' -O /assets/generate/ClassificationModel/vgg16_model.h5
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=15VnQcPt6OOZ_jG2oc4X2Rgk0BjAQSrFs' -O /assets/generate/preTrained/opts.json
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1fFN5J2He6eTqMPRl_M9gFtFfpUmhtQc9' -O /assets/generate/preTrained/r3d34_K_200ep.pth
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1_8tz_fueuVUIx-4ixuC4qdiTnPjk9Yue' -O /assets/generate/preTrained/save_25.pth


RUN pip3 install --no-cache-dir -r python-install.txt

EXPOSE 8080

CMD [ "node", "app.js" ]
