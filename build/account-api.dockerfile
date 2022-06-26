FROM node:12.16.3-alpine3.9

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY /src/account/api/package.json ./

# Bundle app source
COPY /src/account/api/dist dist
COPY /src/account/api/src src

# TODO: can i remove expose & port number if i use deploy.yaml ?
EXPOSE 3000

RUN npm i -g pnpm

ENTRYPOINT npm run start