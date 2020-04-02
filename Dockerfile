# 1. Build TypeScript to JavaScript
FROM node:12.16.1-alpine3.9 as builder

WORKDIR /app

# production=false is important b/c it grabs the devDependencies
# like typescript that are only needed for step 1
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY ./ ./

RUN yarn build


# 2. Prune all non-production dependencies, thereby reducing
#    the size of the resulting image.
#    Explanation: https://medium.com/@ankit.wal/the-why-and-how-of-multi-stage-docker-build-with-typescript-example-bcadbce2686c
FROM node:12.16.1-alpine3.9 as final

WORKDIR /app

# set our node environment, either development or production (defaults to production)
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# copy only the built JavaScript files from step 1
COPY --from=builder app/build/ app/build/


# install only the production dependencies (thus reducing
# file size)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

EXPOSE 8080

# Set non-root user
USER node

CMD ['node', 'build/index.js']
