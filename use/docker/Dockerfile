FROM node:lts
WORKDIR /app
COPY ./package*.json ./
RUN ["npm", "install", "--production"]
COPY ./main.js ./
CMD ["node", "/app/main.js"]
