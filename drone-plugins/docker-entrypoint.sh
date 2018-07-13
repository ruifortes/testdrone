#!/bin/sh
set -e
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
export IMAGE_REPO=$(jq -r '.config.imageRepo' < package.json)
export IMAGE_TAG=$(jq -r '.version' < package.json)
echo "pushing image ${IMAGE_REPO}:${IMAGE_TAG}"
docker build -t $IMAGE_REPO:$IMAGE_TAG .
docker tag $IMAGE_REPO:$IMAGE_TAG $IMAGE_REPO:latest
docker push $IMAGE_REPO:$IMAGE_TAG
docker push $IMAGE_REPO:latest
exec "$@"