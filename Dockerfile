# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.7.1

FROM node:${NODE_VERSION}-alpine as base

ARG APP_ROOT_DIRECTORY=/app
WORKDIR ${APP_ROOT_DIRECTORY}
ENV APP_ROOT_DIRECTORY=${APP_ROOT_DIRECTORY}

RUN chown -R node:node /app

COPY package*.json .

RUN npm ci --include=dev

COPY . .
