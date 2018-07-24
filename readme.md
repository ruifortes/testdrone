# Drone.io test repo [![](http://rsf-drone.ddns.net/api/badges/ruifortes/testdrone/status.svg?branch=master)](http://rsf-drone.ddns.net/ruifortes/testdrone)

## Install Drone and activate repo
  Refer to my drone helm chart
  Activate this repo in drone interface set it to "trusted"

  These variables configure drone cli:  
  `export DRONE_SERVER=http://rsfdrone-github.ddns.net`  
  `export DRONE_TOKEN=paste-token-here`
  
## Create drone pipeline (.drone.yml)  

### Building  

  The app images (db and server) are built in two drone steps using [docker plugin](http://plugins.drone.io/drone-plugins/drone-docker/) and sent to docker hub.
  
  create secrets
  `drone secret add ruifortes/testdrone docker_username ...` 
  `drone secret add ruifortes/testdrone docker_password ...` 
  
### Deployment

  Use [drone helm plugin](https://akomljen.com/set-up-a-drone-ci-cd-pipeline-with-kubernetes/) to deploy app to kubernetes cluster (gke)
  
  usage is:  
  
  ```
  pipeline:
  kubectl:
  image: komljen/drone-kubectl-helm
  secrets: [kubernetes_server, kubernetes_token, kubernetes_cert]
  kubectl: "get nodes"
  ```

  Create necessary secrets in this drone repo to avoid sending secrets data.
  
  Login in kubect then get secret for default service account:

  you need to createa a clusterrolebinding to default service acount (the type kubernetes.io/service-account-token secret in default namespace)
  `kubectl create clusterrolebinding drone-cluster-admin --clusterrole=cluster-admin --serviceaccount=default:default`


  get secret of default service account:

  `export SECRET_NAME=$(kubectl get secrets --namespace default | grep default | cut -f1 -d ' ')`

  then

  `KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'token:' | cut -f2 -d':' | tr -d ' ' | base64 -d)`
  `KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o jsonpath={.data.token} | base64 -d)`
  `KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'ca.crt:' | cut -f2 -d':' | tr -d ' ')`
  `KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o jsonpath={.data."ca\.crt"})`

  and  

  `drone secret add ruifortes/testdrone kubernetes_server https://35.192.119.252`  
  `drone secret add ruifortes/testdrone kubernetes_token $KUBERNETES_TOKEN`  
  `drone secret add ruifortes/testdrone kubernetes_cert $KUBERNETES_CERT`  

### Add secrets to kubernetes namespace

  `kubectl create secret generic app-secret --namespace test --from-literal=arango-root-password=...`
  
  `drone deploy ruifortes/testdrone <build> production`



## docker

  docker build -t testdrone .
  docker build -v npm-packages-offline-cache:.yarn-cache -t testdrone .
  docker run --rm -d -p 8080:8080 testdrone
  
  docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v /home/rsf/Documents/WEBDEV/tmp/testdrone/tools/jq-linux64:/usr/bin/jq node:10-alpine sh
  
## ArangoDB

`kubectl port-forward --namespace test $(kubectl get pods --namespace test | grep testdrone-db | awk '{print $1}') 8529`

docker run -p 8529:8529 -e ARANGO_ROOT_PASSWORD=... arangodb/arangodb:3.3.10

docker run -d -p 8529:8529 -e ARANGO_ROOT_PASSWORD=... rsf71/arangodb


curl https://raw.githubusercontent.com/mledoze/countries/master/countries.json > countries.json

`docker run -d -p 8529:8529 -e ARANGO_ROOT_PASSWORD=$ARANGO_ROOT_PASSWORD rsf71/dronetest-db`

`arangoimp --server.database test --file "countries.json" --collection countries --translate "cca3=_key" --create-collection true`

`arangodump --server.database test --output-directory dump`

`tar czf ../dump.tar.gz *`

## deployment using drone and helm

