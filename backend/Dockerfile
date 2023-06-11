FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

#COPY requirements.txt ./

RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg
RUN pip3 install --no-cache-dir -r python-install.txt

EXPOSE 8080

CMD [ "node", "app.js" ]
