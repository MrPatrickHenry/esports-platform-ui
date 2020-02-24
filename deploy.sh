clear
# ng e2e
git add .
git commit -m "pushing ready to go to prod"
git push --all google
ng build --configuration=production --base-href 'https://www.valvr.com/' --output-hashing none --output-path ~/Dev/GCP/
mkdir ~/Dev/GCP/
cd ~/Dev/GCP/
gsutil -m cp -r *.* gs://www.valvr.com
cd ~/Dev/val/val-app-v2
ng serve
echo "DONE"
echo -en "\007"
