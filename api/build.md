docker build -t goquo/offer-worker .

docker tag goquo/offer-worker:latest 385620531892.dkr.ecr.ap-southeast-1.amazonaws.com/goquo/offer-worker:v1

docker push 385620531892.dkr.ecr.ap-southeast-1.amazonaws.com/goquo/offer-worker:v1