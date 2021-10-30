FROM node:14-alpine
ENV NODE_ENV=production
RUN yarn install
RUN yarn upgrade berry
WORKDIR /usr/src/app
RUN cd /usr/src/app
RUN yarn add -D @types/babel__core
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
