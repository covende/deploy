FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]