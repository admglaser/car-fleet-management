FROM registry.access.redhat.com/ubi8:8.3

ARG SERVER_PORT
ARG CLOUDANT_URL
ARG IBM_CLOUD_API_KEY
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_CLIENT_SECRET

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
ENV SERVER_PORT=$SERVER_PORT
ENV CLOUDANT_URL=$CLOUDANT_URL
ENV IBM_CLOUD_API_KEY=$IBM_CLOUD_API_KEY
ENV FACEBOOK_CLIENT_ID=$FACEBOOK_CLIENT_ID
ENV FACEBOOK_CLIENT_SECRET=$FACEBOOK_CLIENT_SECRET
EXPOSE $SERVER_PORT

CMD ["npm", "start"]
