FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:dev"]