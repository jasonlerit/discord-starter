#
# DEVELOPMENT
#

FROM node:20 as development
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

#
# PRODUCTION
#

FROM node:20 as production
WORKDIR /app
COPY package*.json .
COPY .env .env
RUN npm ci --omit=dev
COPY --from=development /app/dist ./dist
CMD ["node", "dist/index.js"]
