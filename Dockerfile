FROM node:14-alpine

WORKDIR /usr/src/botranger

COPY . .

RUN yarn
RUN yarn build

CMD [ "yarn", "start" ]


