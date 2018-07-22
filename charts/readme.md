`helm install --namespace test -n testdrone testdrone`

`helm upgrade --install --namespace test -f !secrets.yaml testdrone testdrone --debug --dry-run`