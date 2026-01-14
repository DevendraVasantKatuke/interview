1. `docker run`: Runs a container from an image.
2. `docker start`: Starts a container that has been stopped.
3. `docker stop`: Stops a running container.
4. `docker restart`: Restarts a running container.
5. `docker rm`: Removes a container.
6. `docker rmi`: Removes an image.
7. `docker ps`: Lists all running containers.
8. `docker images`: Lists all images on the system.
9. `docker exec`: Runs a command in a running container.
10. `docker build`: Builds an image from a Dockerfile.
11. `docker pull`: Pulls an image from a registry
12. `docker push`: Pushes an image to a registry.
13. `docker login`: Logs in to a registry.
14. `docker logout`: Logs out of a registry.
15. `docker cp`: Copies files or directories between a container and the host machine.
16. `docker volume`: Manages volumes for containers.
17. `docker network`: Manages networks for containers.

```
# Run a container from the image "myimage"
docker run -it myimage

# Start a container named "mycontainer"
docker start mycontainer

# Stop a container named "mycontainer"
docker stop mycontainer

# Remove a container named "mycontainer"
docker rm mycontainer

# Remove an image named "myimage"
docker rmi myimage

# List all running containers
docker ps

# Build an image from the Dockerfile in the current directory
docker build -t myimage .

# Pull an image named "myimage" from the "myregistry" registry
docker pull myregistry/myimage

# Push an image named "myimage" to the "myregistry" registry
docker push myregistry/myimage
```
> (Almost) Always use --rm option while running the container to remove the container automatically when it exits.

### For a temporary shell in a new container (exploring an image):
docker run -it –rm /bin/sh (or /bin/bash)

### For a shell in an already running container:
docker exec -it /bin/sh (or /bin/bash)

### Container Inspection & Interaction¶
1. `docker logs <container_id_or_name>`: Fetches the logs of a container.
	- Often used with `-f` or `--follow` to stream logs live: `docker logs -f mycontainer`
2. `docker inspect <container_id_or_name | image_id_or_name | volume_name | network_name>`: Returns low-level information on Docker objects (containers, images, volumes, networks) in JSON format. Very useful for debugging.
3. `docker ps -a` (or `docker container ls -a`): Lists all containers, including stopped ones (your sheet mentions docker ps for running ones, but `-a` is crucial).
4. `docker top <container_id_or_name>`: Displays the running processes inside a container.
5. `docker port <container_id_or_name>`: Lists the port mappings for a container.
6. `docker attach <container_id_or_name>: Attaches your terminal’s standard input, output, and error (or any combination) to a running container. (Often `exec` is preferred for new commands, but attach can re-attach to the main process).
7. `docker kill <container_id_or_name>`: Sends a SIGKILL signal to a container (force stop). `docker stop` sends SIGTERM first, then SIGKILL after a grace period.

### Image Management¶
1. `docker tag <source_image[:tag]> <target_image[:tag]>`: Creates a tag target_image that refers to source_image. Essential for versioning and pushing to different repositories/tags.
Example: `docker tag myimage myregistry/myusername/myimage:v1.0`
2. `docker history <image_id_or_name>`: Shows the history of an image (the layers and commands used to build it).
3. `docker save -o <path_to_tar_file> <image_name>`: Saves one or more images to a tar archive (streamed to STDOUT by default).
4. `docker load -i <path_to_tar_file>`: Loads an image from a tar archive or STDIN.

### System & Cleanup
1. `docker system prune`: Removes unused data:
	1. Stopped containers
	2. Dangling images (those without a tag and not referenced by any container)
	3. Unused networks
	4. Unused build cache
	5. Often used with `-a` to remove all unused images (not just dangling ones) and `--volumes` to also prune unused volumes. Use with caution, especially `--volumes`!
2. `docker info`: Displays system-wide information about the Docker installation.
3. `docker version`: Shows the Docker version information (client and server).
4. `docker stats <container_id_or_name...>`: Displays a live stream of container(s) resource usage statistics (CPU, memory, network I/O, block I/O).

### Volume Management¶
1. `docker volume ls`: Lists volumes.
2. `docker volume create <volume_name>`: Creates a volume.
3. `docker volume inspect <volume_name>`: Displays detailed information on one or more volumes.
4. `docker volume rm <volume_name>`: Removes one or more volumes.

### Network Management¶
1. `docker network ls`: Lists networks.
2. `docker network create <network_name>`: Creates a network.
3. `docker network inspect <network_name>`: Displays detailed information on one or more networks.
4. `docker network rm <network_name>`: Removes one or more networks.
5. `docker network connect <network_name> <container_name>`: Connects a container to a network.
6. `docker network disconnect <network_name> <container_name>`: Disconnects a container from a network.

### Important docker run Flags
1. `-d` or `--detach`: Run container in background and print container ID.
2. `-p <host_port>:<container_port>` (e.g., `-p 8080:80`): Publish a container’s port(s) to the host.
3. `-v <host_path_or_volume_name>:<container_path>` (e.g., `-v mydata:/data` or `-v /path/on/host:/path/in/container`): Mount a volume or bind mount a host directory.
4. `--name <container_name>`: Assign a name to the container.
`-e <VAR_NAME>=<value>` (e.g., `-e "NODE_ENV=production"`): Set environment variables.
5. `--restart <policy>` (e.g., `--restart always`, `--restart on-failure`): Restart policy to apply when a container exits.
6. `--network <network_name>`: Connect a container to a specific network.

# Docker Compose
```
docker-compose up [-d]
docker-compose down [-v --rmi all]
docker-compose ps
docker-compose logs [-f]
docker-compose build
docker-compose exec <service_name> <command>
```

## Dockerfile
1. `FROM`: Specifies the base image to use for the build.
2. `RUN`: Runs a command during the build process.
3. `COPY`: Copies files or directories from the host machine to the container.
4. `ENV`: Sets an environment variable in the container.
5. `EXPOSE`: Exposes a port or ports to be used by the container.
6. `ENTRYPOINT`: Specifies the command to run when the container starts.
7. `CMD`: Specifies default arguments for the ENTRYPOINT command.
8. `USER`: Sets the user and group to run the container as.
9. `WORKDIR`: Sets the working directory for commands run in the container.
10. `VOLUME`: Creates a mount point for a volume in the container.

Example:
```
FROM alpine
RUN apk update && apk add python3
COPY myfile.txt /app
ENV MY_ENV_VAR=value
EXPOSE 8080
ENTRYPOINT ["python3"]
CMD ["app.py"]
USER 1001
WORKDIR /app
VOLUME /data
```
> Always try to use specific version of base images and package to avoid any unexpected behaviour.