## [drone helm plugin](https://akomljen.com/set-up-a-drone-ci-cd-pipeline-with-kubernetes/)

### usage
```
pipeline:
  kubectl:
    image: komljen/drone-kubectl-helm
    secrets: [kubernetes_server, kubernetes_token, kubernetes_cert]
    kubectl: "get nodes"
```

### get kubernetes info

`SECRET_NAME=$(kubectl get secrets | grep default | cut -f1 -d ' ')`
`KUBERNETES_TOKEN=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'token:' | cut -f2 -d':' | tr -d ' ')`
`KUBERNETES_CERT=$(kubectl get secret $SECRET_NAME -o yaml | grep -E 'ca.crt:' | cut -f2 -d':' | tr -d ' ')`


### create drone secrets
`export DRONE_SERVER=http://rsf-drone.ddns.net`
`export DRONE_TOKEN=paste-token-here`
`drone secret add ruifortes/testdrone kubernetes_server https://35.192.119.252`
`drone secret add ruifortes/testdrone kubernetes_token $KUBERNETES_TOKEN`
`drone secret add ruifortes/testdrone kubernetes_cert $KUBERNETES_CERT`

     
gcloud container clusters get-credentials cluster-1 -z us-central1-a

### get kubernetes cluster token.

