# Part 1: Containers
```
docker version
docker info
docker <command> <sub-command> (options)
```
Starting an Nginx server
```
// Downloads an image from Docker Hub and start a container from that image:
docker container run --publish 80:80 nginx
```
### The command docker container run does the following:
1. Looks for the image locally in the image cache
2. If not found locally, it looks for the same in the remote image repository which defaults to Docker Hub and downloads the latest version
3. Creates a container based on that image and prepares to start
4. Gives the container a virtual IP on a private network inside the Docker engine
5. Opens up port 80 on the host and forwards all requests to port 80 in the container
6. Starts container by using the CMD instruction command in the image's Dockerfile

### 💡 Instruction commands

There are three types of instructions (commands) that we can use to build and run Dockerfiles:

1. RUN - Mainly used to build images and install applications and packages. Builds a new layer over an existing image by committing the results.

2. CMD - Sets default parameters that can be overridden from the Docker CLI when a container is running.

3. ENTRYPOINT - Default parameters that cannot be overridden when Docker Containers run with CLI parameters.

### Running container in the background:
```
docker container run --publish <port-host>:<port-container> --detach <image>

# Example
docker container run --publish 80:80 --detach nginx
```

### Give a name to the container:
```
docker container run -p 80:80 -d --name webhost nginx

// -p is short for --publish and -d is short for --detach
```

### List all containers:
```
docker container ls -a
docker ps -a // Short Version
```

### List only running containers:
```
docker container ls
docker ps  // Short version:
```

### Stop a container:
```
docker container stop <first-3-digits-container-id>
```

### Get logs for a running container:
```
docker container logs <container-name>
```

### Display the running processes of a container:
```
docker container top <container-name>
```
### Remove one or more containers:
```
docker container rm <space-separated-3-digit-container-ids>
```

### Force remove running containers:
```
docker container rm -f <space-separated-3-digit-container-ids>
```

### Show all running processes:
```
ps aux
```

### Use environment variables:
```
docker container run --publish 3307:3307 --detach --name database --env MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
```

### Get details of container config (metadata in JSON format):
```
docker container inspect <container-name>
```

### Get live performance stats for all containers:
```
docker container stats
```
### Get performance stats for a container:
```
docker container stats <container-name>

// TIP - To see all options for a command, do docker <command> <sub-command> --help
```

## Get a shell inside containers

### Start a new container interactively:
```
docker container run -it --name <container-name> <image> <cmd>
// Example
docker container run -it --name nginx nginx bash

// Default CMD for Ubuntu image is bash
docker container run -it --name ubuntu ubuntu
// -it is two different options:
// -t -> allocates Pseudo-TTY, simulates a real terminal
// -i -> keeps interactive session open to receive terminal input
```

### Start an existing container (stopped earlier) interactively:
```
docker container start -ai <container-name>
// -a -> attach
// -i -> interactive shell
```

### Run additional command in an existing running container:
```
docker container exec -it <container-name> <cmd>
```

### Download an image:
```
docker pull <image>
```
### List all images:
```
docker image ls
```

# Part 2: Networks

### Get port details for a container:
```
docker container port <container-name>

# 80/tcp -> 0.0.0.0:80
# 80/tcp -> :::80
```
### Get IP for container:
```
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost

// --format - option for formatting the output of commands using Go templates
```
### How networking happens with Docker containers?
- Virtual networks get created when we publish a container. For example, if we publish container C1 with 80:80,
- it means any traffic coming in at port 80 on the host will be forwarded to port 80 on container C1 via the virtual network. Creating another container C2 by default, will be put in the same virtual network, which means, C1 and C2 can communicate freely via this virtual network.

> NOTE: A host port can only be linked to one container.

> Bridge or Docker0 is the default virtual network mapped to the host IP.

## Docker Network CLI commands

### Show all networks:
```
docker network ls
```
### Inspect a network:
```
docker network inspect <network-name>
```
### Create a virtual network:
```
docker network create <network-name>
// To use a custom bridge, we can use the --driver option.
```

### Attach a network to a container:
```
docker network connect <network-name> <container-name>
```

### Detach a network from a container:
```
docker network disconnect <network-name> <container-name>
```

### Connect to a network while running a container:
```
docker container run -d --name <container-name> --network <network-name> <image>
```

### Default network types
1. Bridge or Docker0 - the default virtual network mapped to the host IP. It allows containers to communicate with each other when running on the same docker host.

2. host - a special network that attaches the container directly to the host by skipping the virtual network.

3. none - Only localhost interface is available in container

Using Docker networks, we can ensure that:

1. related apps are on the same Docker network
2. Their inter-communication is restricted to the virtual network
3. Traffics can be forwarded from host to container only if we publish the container with --publish or -p

## DNS
Containers can communicate with other containers in the same virtual network with host names.

Docker defaults host name to container's name. However, we can also use aliases.

To provide network aliases for containers, we can do the following:
```
 docker container run --rm --network <network-name> --network-alias <container-network-alias> <image>
 ```
So, with this containers in the same virtual network can communicate with each other via aliases.

> The flag --rm makes sure the container is deleted permanently on exit.

# 3. Container Images
An image contains the application binaries, application dependencies, metadata about the image and how to run the image.

##### Images on Docker Hub
Official images on Docker Hub just have an <image-name> unlike others which follow the format <author-name>/<image-name>.

### Pull an image:
```
# Pulls the latest version
docker pull <image-name>
```

### Pull a specific version of the image:
```
docker pull <image-name>:<image-version>
```

### Pull a specific version and distribution of the image:
```
docker pull <image-name>:<image-version>-<dist>
```

### Push image changes
To upload changed layers to an image registry:
```
docker image push <image-name>
// NOTE: To perform push, we need to login with docker login.
```

### List all images:
```
docker image ls
```

### View image history
```
docker history <image-name>:image-version>
```

### Inspect image
```
// Get JSON metadata about the image
docker inspect <image-name>:<image-version>
```

### Tagging an image
```
docker image tag <source-image>:<source-tag> <target-image>:<target-tag>
// Tags will default to latest unless specified.

// latest is just a default tag that should be assigned to the newest stable version.
```

### Build an image
```
docker image build -t <image-name> .

// The . will search for the default Dockerfile.
// -t is a shorthand for tag.
```
```
docker image prune

// Clean up everything:
docker system prune

// Remove all unused images:
docker image prune -a

// View space usage:
docker system df
```
# 4. Container Lifetime and Persistent Data

Containers are immutable. We can only re-deploy containers but not change existing ones. This helps in retaining history changes.

Persisting data across containers
There are two options:

1. Bind mounts
2. Volumes

|Bind mount|Volume|
|-|-|
|When we use a bind mount, a file or directory on the host machine is mounted into a container. This file or directory is referenced by its absolute path on the host machine.|	When we use a volume, a new directory is created within Docker's storage directory on the host machine and it's contents are completely managed by Docker.|
||Volumes need manual deletion. They can't be cleaned up just by removing a container|

### To cleanup unused volumes:
```
docker volume prune
```

### List all volumes
```
docker volume ls
```

### Create a named volume
We can have a named volume with the -v flag.
```
docker container run -d --name mysql-container -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v <volume_name>:/var/lib/mysql mysql
```
The -v command allows us to do the following:

1. Create a new volume for a container
2. Create a named volume

### For bind mounts, instead of volume_name, we specify the absolute path of the file or folder in the host in the above command.
```
docker container run -d --name mysql-container -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v /<absolute_path_on_host>:/var/lib/mysql mysql
```
### Creating docker volumes manually
We can create docker volumes manually using `docker volume create`.

This is required when we want to use custom drivers and labels.

NOTE: We need to do this before `docker run`.