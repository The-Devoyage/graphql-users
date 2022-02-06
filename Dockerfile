FROM node:16.13.0
ARG GITHUB_TOKEN
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm install
RUN chmod -R 777 node_modules
COPY . .
EXPOSE 5000
VOLUME /app/public
RUN npx tsc
CMD [ "npm", "run", "dev" ]
