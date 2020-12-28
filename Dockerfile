FROM node:10

# Install Chrome

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-stable

ENV CHROME_BIN /usr/bin/google-chrome

# Log versions

RUN set -x \
    && node -v \
    && npm -v \
    && google-chrome --version


RUN npm i -g npm@6.4.1

WORKDIR /bivcore

# Add source
COPY lerna.json ./
COPY package*.json ./

COPY  ./packages/bitcore-lib/package.json ./packages/bitcore-lib/package.json
COPY  ./packages/bitcore-lib/package-lock.json ./packages/bitcore-lib/package-lock.json

COPY  ./packages/bitcore-lib-value/package.json ./packages/bitcore-lib-value/package.json
COPY  ./packages/bitcore-lib-value/package-lock.json ./packages/bitcore-lib-value/package-lock.json

COPY  ./packages/bitcore-node/package.json ./packages/bitcore-node/package.json
COPY  ./packages/bitcore-node/package-lock.json ./packages/bitcore-node/package-lock.json

COPY  ./packages/bitcore-p2p/package.json ./packages/bitcore-p2p/package.json
COPY  ./packages/bitcore-p2p/package-lock.json ./packages/bitcore-p2p/package-lock.json

COPY  ./packages/bitcore-p2p-value/package.json ./packages/bitcore-p2p-value/package.json
COPY  ./packages/bitcore-p2p-value/package-lock.json ./packages/bitcore-p2p-value/package-lock.json

COPY  ./packages/insight/package.json ./packages/insight/package.json
COPY  ./packages/insight/package-lock.json ./packages/insight/package-lock.json

RUN npm install
RUN npm run bootstrap
ADD . .
RUN npm run compile
