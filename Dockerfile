FROM node:7

WORKDIR /var/www
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /var/www && cd /var/www && ln -s /tmp/node_modules

COPY . /var/www

EXPOSE 3000

CMD ["npm", "run", "server"]

#FROM node:7

#RUN apt-get update && apt-get install -y apt-transport-https
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#RUN apt-get update && apt-get install yarn

#ADD package.json yarn.lock /
#RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
#RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node
#RUN yarn
#RUN npm rebuild node-sass --force
#RUN mkdir -p /var/www && cd /var/www && ln -s node_modules
#WORKDIR /var/www

#COPY . /var/www

#EXPOSE 3000

#CMD ["npm", "run", "server"]
