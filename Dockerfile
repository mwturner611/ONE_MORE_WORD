FROM node:14

WORKDIR C:/Users/Mwturner/Documents/Class/ONE_MORE_WORD

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]