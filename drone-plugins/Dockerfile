FROM docker:17.12.0-ce-dind

COPY ./jq-linux64 /usr/bin/jq
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

