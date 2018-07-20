## [drone helm plugin](https://akomljen.com/set-up-a-drone-ci-cd-pipeline-with-kubernetes/)

### usage
```
pipeline:
  kubectl:
    image: komljen/drone-kubectl-helm
    secrets: [kubernetes_server, kubernetes_token, kubernetes_cert]
    kubectl: "get nodes"
```
you need to createa a clusterrolebinding to default service acount
`kubectl create clusterrolebinding drone-cluster-admin --clusterrole=cluster-admin --serviceaccount=default:default`

### create drone secrets

These variables configure drone cli:  
`export DRONE_SERVER=http://rsf-drone.ddns.net`  
`export DRONE_TOKEN=paste-token-here`

get secret for default service account:

`SECRET_NAME=$(kubectl get secrets | grep default | cut -f1 -d ' ')`

or

`SECRET_NAME=$(kubectl get secrets --namespace drone| grep default | cut -f1 -d ' ')`

then

`KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'token:' | cut -f2 -d':' | tr -d ' ' | base64 -d)`
`KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o jsonpath={.data.token} | base64 -d)`
`KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'ca.crt:' | cut -f2 -d':' | tr -d ' ')`
`KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o jsonpath={.data."ca\.crt"})`

and  

`drone secret add ruifortes/testdrone kubernetes_server https://35.192.119.252`  
`drone secret add ruifortes/testdrone kubernetes_token $KUBERNETES_TOKEN`  
`drone secret add ruifortes/testdrone kubernetes_cert $KUBERNETES_CERT`  



docker run --rm \
--env KUBERNETES_SERVER=https://35.192.119.252 \
--env KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'token:' | cut -f2 -d':' | tr -d ' ' | base64 -d) \
--env KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'ca.crt:' | cut -f2 -d':' | tr -d ' ') \
--env PLUGIN_KUBECTL="get pods" \
komljen/drone-kubectl-helm

