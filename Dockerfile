FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
#npm ci instead of npm install is to make the package lock versions are exactly the same
RUN npm ci
COPY . .
CMD ["npm", "start"]
