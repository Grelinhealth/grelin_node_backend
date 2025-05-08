FROM node:18.16-slim

EXPOSE 8080

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /process

RUN mkdir /process/logs

RUN mkdir /process/uploadedDocuments

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY ./package.json /process/

RUN npm install

RUN npm uninstall upiqr

RUN npm install upiqr@1.0.32

COPY . .

CMD [ "node","app.js" ]