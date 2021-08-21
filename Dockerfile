FROM node:lts
COPY package*.json /
RUN ["npm", "install", "--production"]
COPY main.js /
CMD ["node", "/main.js"]
