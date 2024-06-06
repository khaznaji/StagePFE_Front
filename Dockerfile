FROM node:20-alpine
RUN npm i -g @angular/cli
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . . 
RUN ng build --configuration "production"
ENTRYPOINT ["ng","serve","--host","0.0.0.0","--port","4200"]