FROM node:14
RUN apt-get update && mkdir /app && npm i -g typescript
WORKDIR /app
RUN npm install
# なぜかこれが動かない。
CMD [ "/usr/local/bin/tsc", "--watch", "/app/src/index.ts" ]
