FROM nginx

COPY /src/plantuml-proxy/front/dist /usr/share/nginx/html

COPY /src/plantuml-proxy/front/nginx.conf /etc/nginx/conf.d/default.conf
