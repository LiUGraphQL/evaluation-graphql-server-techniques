FROM node:12-alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock  .
RUN yarn

# Bundle app source
COPY . .

EXPOSE 4000 9229
CMD ["yarn", "run", "prod"]

