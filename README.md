### 컨테이너 실행
> docker run -d -it --name node_app -v /mnt/c/Users/jinho/Documents/Projects/webDevelop/node-study:/app node:18.15.0

### 컨테이너 쉘 접속
> docker exec -it node_app /bin/bash