FROM node:18

WORKDIR /app

COPY . .
RUN npm install
USER node
EXPOSE 3000
CMD ["npm", "start"]