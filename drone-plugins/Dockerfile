FROM docker

COPY ./jq-linux64 /usr/bin/jq
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["sh"]

# ENTRYPOINT ["docker login $DOCKER_HOST -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"]


