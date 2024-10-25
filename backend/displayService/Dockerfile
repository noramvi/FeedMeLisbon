FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

ENV DB_HOST=mysql            
ENV DB_USER=feedme_user       
ENV DB_PASS=feedmelisbon       

CMD ["node", "server.js"]  