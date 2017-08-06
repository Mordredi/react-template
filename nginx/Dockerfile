FROM nginx

RUN rm -v /etc/nginx/nginx.conf
COPY ./config/nginx.conf /etc/nginx/
COPY ./server.crt /etc/nginx/ssl/
COPY ./server.key /etc/nginx/ssl/
COPY ./dhparam.pem /etc/nginx/ssl/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD service nginx start
