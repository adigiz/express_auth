FROM node:16

WORKDIR /Users/gizwanda/Documents/Development/express-auth/

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]