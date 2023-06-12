#FROM node:slim AS app

#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

#RUN apt-get update && apt-get install curl gnupg -y \
#  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#  && apt-get update \
#  && apt-get install google-chrome-stable -y --no-install-recommends \
#  && rm -rf /var/lib/apt/lists/*
#FROM alpine
 
# Installs latest Chromium (100) package.
#RUN apk add --no-cache \
#      chromium \
#      nss \
#      freetype \
#      harfbuzz \
#      ca-certificates \
#      ttf-freefont \
#      nodejs \
#      yarn
 
# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
 
# Puppeteer v13.5.0 works with Chromium 100.
#RUN yarn add puppeteer@13.5.0
 
# Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#    && mkdir -p /home/pptruser/Downloads /app \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /app
 
# Run everything after as non-privileged user.
#USER pptruser
 
FROM node:18
#RUN NODE_OPTIONS=--max_old_space_size=128
#RUN npm install --max-old-space-size=128
WORKDIR /app
COPY . /app
RUN ./render-build.sh
RUN npm install
CMD ["npm", "start"]
