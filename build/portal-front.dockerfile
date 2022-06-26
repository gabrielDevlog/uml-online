FROM nginx

COPY /src/portal/front/dist /usr/share/nginx/html

COPY /src/portal/front/nginx.conf /etc/nginx/conf.d/default.conf
