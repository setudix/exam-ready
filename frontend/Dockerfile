FROM node:20.16.0-alpine

WORKDIR /next

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]