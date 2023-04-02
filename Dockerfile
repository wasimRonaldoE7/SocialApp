FROM node:latest
WORKDIR /socialApp
COPY package.json ./
RUN npm install
COPY target ./target
COPY .env ./.env
EXPOSE 3000  
RUN npm run build
CMD ["npm", "run", "prod"]