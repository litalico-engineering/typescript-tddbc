ID=$(docker ps --format "{{.ID}}" --filter ancestor=typescript-tddbc:latest)
docker exec -it $ID /bin/bash
