FROM node:16.14.2-alpine
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/. ./
ENV REACT_APP_API_URL https://asw2-my-posts.herokuapp.com
RUN npm run build
WORKDIR /app
RUN mv /client/build ./
RUN rm -rf /client
COPY server/package*.json ./
RUN npm install
COPY server/. ./
ENV PRODUCTION true
CMD ["npm", "start"]
