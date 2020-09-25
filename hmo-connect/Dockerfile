FROM node:12.2.0-alpine as build
 
#ADD yarn.lock /yarn.lock
ADD package.json /package.json
ADD config-overrides.js /config-overrides.js
 
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
 
WORKDIR /app
ADD . /app
 
#EXPOSE 3000
#EXPOSE 35729
# In order to run node alpine image avoiding Python error
RUN apk --no-cache add --virtual builds-deps build-base python
 
RUN npm install --silent 
#RUN npm install react-scripts@3.0.1 -g --silent
#ENTRYPOINT ["/bin/bash", "/app/run.sh"]
#COPY . /app
RUN npm run build
#CMD ["npm","start"]
 
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]