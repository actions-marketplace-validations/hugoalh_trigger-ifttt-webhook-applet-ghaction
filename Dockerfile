FROM node:lts
# WORKDIR /app
# COPY package*.json ./
COPY package*.json /
RUN ["npm", "install", "--production"]
# COPY main.js ./
# CMD ["node", "/app/main.js"]
COPY main.js /
CMD ["node", "/main.js"]
