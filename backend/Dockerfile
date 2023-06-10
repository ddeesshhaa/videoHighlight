FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

COPY requirements.txt ./

#linux 
# RUN apt-get update && apt-get install -y python3 python3-pip
# RUN pip3 install --no-cache-dir -r requirements.txt

#Windows
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD [ "node", "app.js" ]
