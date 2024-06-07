FROM node:20-alpine

# Install Angular CLI
RUN npm i -g @angular/cli

# Create app directory and set permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app


# Copy package.json files and install dependencies
COPY --chown=node:node package*.json ./
USER node
RUN npm install --force 


# Copy the rest of the application code
COPY --chown=node:node . .

# Modify angular.json file to remove CSS budget constraint
RUN sed -i '/"type": "anyComponentStyle",/,+2 d' angular.json

RUN ng build --configuration "production"

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
