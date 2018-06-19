# Drone.io test repo


## docker

  ~~docker build -t yarncache -f ./Dockerfile.cache ~/.cache/yarn~~

  docker build -t testdrone .
  docker build -v npm-packages-offline-cache:.yarn-cache -t testdrone .
  docker run --rm -d -p 8080:8080 testdrone

