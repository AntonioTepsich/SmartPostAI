docker rm layer-container

docker build -t base-layer .

docker run --name layer-container base-layer

docker cp layer-container:layer.zip . && echo "Created layer .zip with updated base layer."
