# Drone.io test repo

yyyyy

## docker

  docker build -t testdrone .
  docker build -v npm-packages-offline-cache:.yarn-cache -t testdrone .
  docker run --rm -d -p 8080:8080 testdrone
  
  docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v /home/rsf/Documents/WEBDEV/tmp/testdrone/tools/jq-linux64:/usr/bin/jq node:10-alpine sh
  
## ArangoDB

docker run -p 8529:8529 -e ARANGO_ROOT_PASSWORD=openSesame arangodb/arangodb:3.3.10

docker run -d -p 8529:8529 -e ARANGO_ROOT_PASSWORD=password rsf71/arangodb


curl https://raw.githubusercontent.com/mledoze/countries/master/countries.json > countries.json

`docker run -d -p 8529:8529 -e ARANGO_ROOT_PASSWORD=password rsf71/arangodb`

`arangoimp --server.database test --file "countries.json" --collection countries --translate "cca3=_key" --create-collection true`

`arangodump --server.database test --output-directory dump`

`tar czf ../dump.tar.gz *`

