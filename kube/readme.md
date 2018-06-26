`NAME=arango-db envsubst < kube-db.yml | kubectl create -f -`

`minikube service arango-db`

`kubectl delete pods,services -l name=arango-db`

`npm_package_version=1.0.24 ARANGO_ROOT_PASSWORD=password docker-compose up`

