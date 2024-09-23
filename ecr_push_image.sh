aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin 863518452741.dkr.ecr.ap-south-1.amazonaws.com
sudo docker build -t er-images .
sudo docker tag er-images:latest 863518452741.dkr.ecr.ap-south-1.amazonaws.com/er-images:latest
sudo docker push 863518452741.dkr.ecr.ap-south-1.amazonaws.com/er-images:latest
