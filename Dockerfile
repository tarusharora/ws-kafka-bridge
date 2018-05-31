FROM node:8-alpine
ENV SOCKET_SERVER_URL $SOCKET_SERVER_URL
ENV KAFKA_URL $KAFKA_URL
ENV KAFKA_TOPIC_NAME $KAFKA_TOPIC_NAME
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5002
CMD [ "node", "app.js" ]