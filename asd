docker rmi -f $(docker images -a -q)
docker rm -f $(docker ps -a -q)
docker builder prune