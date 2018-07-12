FROM node:8
# Create app directory
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
RUN npm -g config set user root
RUN npm i
RUN npm install -g @angular/cli@1.7.1
ENTRYPOINT [ "ng", "serve", "--host", "0.0.0.0" ]
