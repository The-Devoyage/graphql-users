FROM node:16.13.0
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm install
COPY . .
EXPOSE 5002
VOLUME /app/public
CMD [ "npm", "run", "dev" ]
