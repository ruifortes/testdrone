###########################################
FROM node:10-alpine as install
###########################################

ARG HOME=${HOME:-/home/node}

RUN mkdir -p $HOME/app/npm-packages-offline-cache
WORKDIR $HOME/app
# RUN mkdir -p client server

# && chgrp -R 0 $HOME/app \
# && chmod -R g+rwX $HOME/app

COPY npm-packages-offline-cache npm-packages-offline-cache/
COPY package.json client/package.json server/package.json yarn.lock .yarnrc ./

RUN yarn install --prefer-offline
RUN rm -rf npm-packages-offline-cache

###########################################
FROM node:10-alpine as app
###########################################

ARG HOME=${HOME:-/home/node}

RUN mkdir -p $HOME/app
# && chgrp -R 0 $HOME/app \
# && chmod -R g+rwX $HOME/app

WORKDIR $HOME/app

# COPY --chown=0:0 --from=install $HOME/app ./
COPY --from=install $HOME/app ./

# RUN chgrp -R 0 $HOME/app/node_modules \
# && chmod -R g+rwX $HOME/app/node_modules

# COPY --chown=0:0 client/build ./client/build
# COPY --chown=0:0 server ./server

COPY client/build ./client/build
COPY server ./server

WORKDIR ./server

# VOLUME $HOME/app/cache
ENTRYPOINT ["yarn", "start"]

EXPOSE 8080
