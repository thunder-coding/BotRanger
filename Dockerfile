FROM node:14.15.4-alpine

WORKDIR /usr/src/botranger

COPY . .

RUN yarn
RUN yarn build

CMD [ "yarn", "start" ]


