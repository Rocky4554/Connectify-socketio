#build stage building static files in ubuntu and giving conatiner a name as build 
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

RUN npm run build 

#production stage   

FROM node:22-alpine

WORKDIR /app

#installing serve package globally 
RUN npm i -g serve

ENV PATH="/usr/local/bin:$PATH"

COPY --from=build /app/dist ./dist
#serve run on port 3000
EXPOSE 3000

CMD ["serve","-s","dist","-l","3000"]






