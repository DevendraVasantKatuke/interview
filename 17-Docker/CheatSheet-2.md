### Basic Docker Commands
|Command|Description|
|-|-|
|docker ps|List of started containers|
|docker ps-a|List of all containers|
|dockerinfo|Get config­uration from docker|
|docker version|Get docker version|
|docker build -t<im­age­>:<­tag> .|Builds a Docker image from a "­Doc­ker­fil­e" or a container|
|docker login<re­pos­ito­ry>|Connect to a remote repository|
|docker push<im­age­_na­me>­:<t­ag>|Push the image to the remote repository|
|docker pull<im­age­_na­me>­:<t­ag>|Pull image from remote repository|

### Container Orders
|Command|Description|
|-|-|
|docker inspect <Co­nta­ine­r>|Controls a container|
|docker stats <Co­nta­ine­r>|Displays the contai­ner's live data stream|
|docker logs <Co­nta­ine­r>|Fetch container logs|
|docker run <Co­nta­ine­r>|	Run the container|
|docker kill <Co­nta­ine­r>|Kill a running container|
|docker start <Co­nta­ine­r>|Start the container|
|docker stop <Co­ntainer>|Stop a running container|
|docker restart <Co­nta­ine­r>|Restart the container|
|docker rm <Co­nta­ine­r>|Delete the container|
|docker port <Co­nta­ine­r>|List container port mapping|
|docker break <Co­nta­ine­r>|Suspend all container processes|
|docker unpause <Co­nta­ine­r>|Unsuspend all container processes|

> <Co­nta­ine­r> can be replaced by theID or the NAME of the container.

### Network Commands
|Command|Description|
|-|-|
|docker network ls|	List of networks|
|docker network inspect <Ne­two­rk>|Check network inform­ation|
|docker network create <Ne­two­rk>|Create a network|
|docker network rm <Ne­two­rk>|Delete a network|
|docker network connect <Network> <Co­nta­ine­r>|Connects a container to the network|
|docker network connect --ip <IP> <Ne­two­rk> <Co­nta­ine­r>|Specifies the container interface IP address|
|docker network disconnect <Network_Name> <Co­nta­ine­r>|Discon­nects the container from the network|

> <Ne­two­rk> can be replaced by the network ID or NAME.

### Miscel­laneous Commands
|Command|Description|
|-|-|
|docker cp <Co­nta­ine­r>:­<so­urc­e_p­ath> <de­st_­pat­h>|Copy from container to host|
|docker cp <so­urc­e_p­ath> <Co­nta­ine­r>:­<de­st_­pat­h>|Copy from host to container|
|docker exec -ti <Co­nta­ine­r> <En­try­poi­nt>|Runs the terminal from a live container|

### Dockerfile
|Command|Description|
|-|-|
|FROM <im­age­>:<­tag>|Specifies the parent image|
|COPY <so­urc­e_p­ath> <de­sti­nat­ion­_pa­th>|Copies regular files and direct­ories.|
|ADD <so­urc­e_p­ath> <de­sti­nat­ion­_pa­th>|Same as COPY, but unpacks tarballs and accepts URLs|
|CMD [<c­omm­and> <pa­ram­ete­rs>]|Specifies the command to execute when initia­lizing the container with this image|
|ENTRYPOINT [<c­omm­and> <pa­ram­ete­rs>]|Similar to CMD but cannot be overwr­itten, it will always be executed and the container will run as an executable|
|LABEL <ke­y>=­<va­lue>|Adds metadata to the Docker image|
|ENV <ke­y>=­<va­lue>|Sets enviro­nment variables for the container|
|EXPOSE <po­rt_­num­ber­>/<­­pr­oto­col­_ty­pe>|Sets the ports that will be exposed by the container|
|RUN <co­mma­nds>|Runs commands in the container; usually used to install packages|
|WORKDIR <di­rec­tor­y_p­ath>|Specifies the working directory. Once the container is executed, this is the directory we will end up in when we access the container.|

### Option Keywords
|Command|Description|
|-|-|
|-p, --publish|Port mapping between host and container|
|--publ­ish-all|Publish all ports|
|--exposed|Exposes the port of the container|
|-d, --detach|Runs in the background|
|-e, --env|Sets enviro­nment variables|
|-v, --volume|Mount files or direct­ories|
|-i, --inte­ractive|Provides access to a command prompt in a running container|
|-t, --tty executive|Execute a new command in a container|
|pc|Copy data between container and host or vice versa|

> These option keywords can be added to most docker commands.

### Image Commands
|Command|Description|
|-|-|
|docker pictures|Lists locally available images|
|docker run <im­age>|Run the image|
|docker create<im­age­>:<­Tag>|Create an image|
|docker rmi<im­age>|Delete the image|
|docker save <im­age>|Save images to a tarball|
|docker search <im­age>|Docker image search|
|docker sweater <im­age>|Get a docker image|
|docker build -t <im­age­>:<­tag> <ru­n_d­ire­cto­ry> -f <do­cke­rfi­le>|Build an image from a "­doc­ker­fil­e"|
|plum image docker|Remove all unused docker images|

### Volume Commands
|Command|Description|
|-|-|
|docker volume ls|List the volumes|
|docker volume inspect <Vo­lum­e>|Control the volume|
|docker volume create <Vo­lum­e>|Create a volume|
|docker volume rm <Vo­lum­e>|Delete a volume|
|plum volume docker|Delete unused volumes|

> <Vo­lum­e> can be replaced by volume ID or NAME.

### Repair & Diagno­stics
|Command|Description|
|-|-|
|docker system df|Show disk space used by docker|
|docker system info|Displays Docker system inform­ation|
|docker diff <co­nta­ine­r>|Shows all files that have been modified since startup|
|docker top <co­nta­ine­r>|Show "­top­" command output of processes running in a container|
|docker stats|Show output of "­top­" command from all Docker containers|
|docker logs <co­nta­ine­r>|Show container logs|
|docker top <co­nta­ine­r>|Show the processes in container|
|docker diff <co­nta­ine­r>|Show all modified files in the container|
