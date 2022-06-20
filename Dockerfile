FROM nginxinc/nginx-unprivileged:1.18.0-alpine

COPY --chown=101:0 ./build /var/www
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080/tcp
