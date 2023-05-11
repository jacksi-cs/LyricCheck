FROM node:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim

COPY . usr/src/frontend/

WORKDIR /usr/src/frontend

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
