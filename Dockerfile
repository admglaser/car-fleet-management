FROM registry.access.redhat.com/ubi8:8.3

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs

RUN mkdir /app
COPY . /app

WORKDIR /app/client
RUN npm ci

WORKDIR /app/server
RUN npm ci

WORKDIR /app
RUN npm run build

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "start"]
