FROM nginx

COPY /src/account/front/dist /usr/share/nginx/html

COPY /src/account/front/nginx.conf /etc/nginx/conf.d/default.conf
