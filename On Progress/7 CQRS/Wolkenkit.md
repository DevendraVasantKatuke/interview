# Why wolkenkit?

Software development is not an end in itself. Instead, software gets written to solve actual real-world problems. Unfortunately, this fails regularly for various reasons. That's why we have built wolkenkit, a semantic JavaScript backend that addresses three important aspects of software development, and that empowers you to build better software faster.

## Empowering interdisciplinary teams

While trying to build software that solves real-world problems, more often than not issues arise. Important questions on the underlying business problems can't be answered, as the technical experts are missing the required domain knowledge. Since talking to the domain experts can feel intimidating, it becomes hard to answer these questions. Nevertheless this is the only viable way to grasp and understand the details of the domain.

Unfortunately, talking to people from other domains is rarely encouraged in education, and you are used to building teams and even organisations as clusters of similarly qualified people. As a result birds of a feather flock together.

We believe that having interdisciplinary teams with open discussions dramatically improves software development. But even within an interdisciplinary team one of the hardest things is finding consensus on what the actual underlying problem is that needs to be solved. What is the core domain? Which problem is the user going to solve, and how shall they do that?

It is incredibly hard to find answers to these questions. As developers we are so used to thinking in terms of CRUD, that *create*, *update*, and *delete* are the only verbs we know to map reality to. Yet the truth is that every non-trivial real-world problem is way more complex than those three words, and requires more expressive powers.

::: hint-wisdom
> **Domain-driven design**
>
> wolkenkit uses your domain language as code. This way it invites you to work in an interdisciplinary team as early as possible.
:::

With wolkenkit software development is different, as it builds on the principles of domain-driven design. Before writing any code, model, discuss, and shape your core domain on a whiteboard, together with the people that know it inside out. Then transform the result into JavaScript code, and run it with wolkenkit. We have carefully designed and developed wolkenkit to make this transformation as frictionless as possible.

## Learning from your past

For several decades developers have been getting used to store the current application state. Once you update it, any previous information gets lost. This leads to a number of questions that can't be answered easily. What was the previous state? What was the intention of updating? How did state evolve over time?

There are several workarounds for this problem, including history tables and audit logs. However, these solutions do not address the root cause of the problem, as they follow a data-driven approach, not a domain-driven one. They do not capture the users' intentions, only their results. Compare this to memorizing a fact, but immediately forgetting the events and experiences that have brought you there.

::: hint-wisdom
> **Event-sourcing**
>
> wolkenkit does not store the current application state, but the stream of events that led to it. This allows you to reinterpret your past.
:::

wolkenkit uses a different approach, as it builds upon the principles of event-sourcing. It uses an event store to record all of the events that happen within your application. The current state is the result of this event stream. Additionally, you can replay this stream to reinterpret events and learn from your past. We have carefully designed and developed wolkenkit to make this as simple and performant as possible.

## Scaling with confidence

The cloud's biggest benefit is its ability to scale elastically, according to your needs. Unfortunately, your application does not automatically benefit from this. Instead, your application's architecture needs to support this. This is hard to get right when building a CRUD monolith.

The biggest issue is the missing ability to optimize a CRUD application for reading and writing individually at the same time. You have to favor one side and either use a normalized or a denormalized model. The normalized model is great for consistent writes because there is no duplicated data. On the other hand it is hard to read since you need to rejoin the data. The denormalized model can be read efficiently, but it is hard to keep things consistent.

::: hint-wisdom
> **CQRS**
>
> wolkenkit separates reading data from writing them. This way you can optimize and scale them as needed.
:::

With wolkenkit scalability is different, as it builds upon the principles of CQRS. It separates reading data from writing them, so you can use an optimized model for either side. This way you can combine consistent writes with efficient reads. Since wolkenkit is a distributed application, it even runs dedicated processes for reading and writing. Anyway, this separation requires some synchronization. We have carefully designed and developed wolkenkit so that you do not have to care about this synchronization, and instead are able to focus on your domain.

# Use cases

If you consider using wolkenkit, there are scenarios that fit better and of course also a few that fit less well. In the following, a variety of scenarios is presented as examples, and evaluated how well they are suitable as use cases for wolkenkit. Naturally, there is no clear dividing line here. The mentioned examples serve rather as indicators, and require an individual interpretation from case to case.

If you have questions on whether your use case should be implemented with wolkenkit, feel free to [contact the native web](mailto:hello@thenativeweb.io) to discuss your ideas.

## Bad use cases

The following examples show use cases that are for various reasons less suitable for the use of wolkenkit. Please note that the individual reasons are more important than the specific examples.

### Data-driven applications

Data-driven applications are based on CRUD, i.e. they only use the four verbs *create*, *read*, *update* and *delete* for modeling and accessing data. This is adequate for simple use cases that actually only store and retrieve data without additional logic, such as forms over data or storing data from sensors.

In contrast, wolkenkit is based on the assumption that applications represent complex domains with extensive business logic, and hence uses [event-sourcing](../why-wolkenkit/#learning-from-your-past) rather than CRUD. To benefit from the advantages of event-sourcing, you first have to model your domain using domain-driven design. This may be too much effort for very simple domains.

### Hard real-time

Hard real-time applications require reliable and extremely accurate time management. Typical applications include audio sequencing and some robotics scenarios. Since wolkenkit is based on JavaScript and Node.js and these technologies do not offer real-time capabilities, wolkenkit is not real-time capable either.

### Hard consistency

Applications that require hard consistency typically prefer consistency to availability. In other words, for these applications it is better to go down than to display stale data. This is required, for example, by systems that are life-critical or otherwise affect the health or safety of humans and animals.

wolkenkit is based on eventual consistency, which means that data may only be updated after a short period of time. This gives up the hard consistency for better availability, and is fine for many applications such as typical business applications. Additionally, this approach is well-known and successfully used by various large-scale social media platforms, e.g. Facebook and Twitter.

### Single-process and embedded applications

Single-process and embedded applications typically run on very limited and constrained hardware. This is required, for example, by applications that act as machine controllers and are executed on a SoC or other limited environments such as Arduino and Raspberry Pi.

Since wolkenkit is designed as a distributed system and based on Docker, it is (at least right now) not suitable for these environments.

::: hint-tip
> **Lightweight runtime environment**
>
> While not currently available, a lightweight wolkenkit runtime environment could be done. If you are interested in this, please [contact the native web](mailto:hello@thenativeweb.io).
:::

## Good use cases

The following examples show use cases that are well suited for the use of wolkenkit. Please note that the individual reasons are more important than the specific examples.

### In-depth domain knowledge

In-depth domain knowledge and a sound understanding of the essential business processes are a valuable component of successful software development. This is especially true for [interdisciplinary teams](../why-wolkenkit/#empowering-interdisciplinary-teams), which is also the reason why the use of domain-driven design in such teams is particularly useful and helpful.

Since wolkenkit allows you to seamlessly transform domain knowledge into code while abstracting away the technical details, it leads to more readable and understandable code.

### Historical data

Historical data is a valuable asset in many applications, which can be used, for example, to generate reports or analyze data. Typically, the collection of historical data is not planned in many applications, which makes implementation time-consuming.

Since wolkenkit is based on [event-sourcing](../why-wolkenkit/#learning-from-your-past) and therefore stores all events that have happened in your domain, it provides historical data without further ado. This empowers you to learn from the past and get new insights into your domain, even back in time. This way you will get answers to questions of which you do not know today that you will ask them tomorrow.

### Soft real-time

Soft real-time is becoming increasingly important for applications, as digital collaboration becomes more and more popular. However, push notifications and live updates of already delivered data are quite difficult to implement, if you want to get the details right.

Fortunately, wolkenkit comes with built-in support for soft real-time. This makes wolkenkit an ideal platform for collaborative web applications in which different users manage a shared state, similar to what you may know from Trello or other collaboration tools.

### High availability

High availability and scalability are important factors for successful web and cloud applications. By using eventual consistency and preferring availability to hard consistency, wolkenkit enables your applications to [scale with confidence](../why-wolkenkit/#scaling-with-confidence). You can even scale the write and the read model of your application independent of each other, without having to care about the technical details in your code.

### API design and backend prototyping

From time to time there are specific ideas for domains that could be worth implementing. In the past, this was a time-consuming process, because in addition to the actual domain, the technical foundation always had to be developed, too.

With wolkenkit this additional effort is no longer necessary as it enables you to focus exclusively on the domain. This way, you can rapidly try out and evaluate ideas. In the end, wolkenkit allows you to build and maintain an API for your business efficiently.

# Core concepts

There are three important concepts that make up a wolkenkit application: The write model, the read model, and flows.

<div class="write-model">

## The write model

The write model is responsible for handling input from the client and storing the resulting events. It consists of several separate contexts, where each context has its own individual language.

A context consists of several aggregates. An aggregate is a piece of state inside your application and starts with an initial state. It receives commands that request changes to this state, and it publishes events when the state should actually be changed. In other words, the state will be transformed over time, and its current value results from the history of previously published events.

For more details, see the [write model overview](../../../reference/creating-the-write-model/overview/).

</div>

<div class="read-model">

## The read model

While the write model is a gate-keeper for changing the state of your application, the read model is about efficiently reading this state. For that, the read model transforms the stream of events into data structures that are optimized for reading.

In contrast to the paradigms you might be used to, the read model favors denormalized data structures, since they improve read performance: If all data is denormalized you do not need any joins which will effectively speed up reading data. Keep in mind that the read model is just a cached view of the events that were created within the write model. Hence, the data structures can be recreated at any time without further ado. This also allows to arbitrarily re-interpret events from the past.

For more details, see the [read model overview](../../../reference/creating-the-read-model/overview/).

</div>

<div class="flows">

## Flows

Flows are responsible for reacting to events and sending commands, e.g. to implement workflows. They do neither belong to the write nor to the read model. Instead, they exist on their own. Flows can be used to establish a connection between multiple aggregates, contexts, or applications.

The simplest form of a flow is stateless. It can be seen as a simple If-This-Then-That rule which is responding to events from the write model. E.g., it could send a text message, or simply send another command.

In contrast to these simple flows there is another type of flows, the so-called stateful flows. They can be used to create long-running processes that need to hold some state, e.g. an order process. Basically a stateful flow is a state machine that is able to react to events from the write model, and that can store and change its state. It can then act upon state transitions and create reactions to them just like simple flows do.

For more details, see the [stateless flows overview](../../../reference/creating-stateless-flows/overview/) and the [stateful flows overview](../../../reference/creating-stateful-flows/overview/).

</div>


# Data flow

In a wolkenkit application, you typically have a client with a task-based UI. This may be a static web site, a mobile application, or anything else. Everytime the user performs a task, the client sends one or more commands to the server.

The server acknowledges the commands' receipt. For now, the client is done. This means that the client does not know whether the command was handled successfully in the first place. Instead, it's fire-and-forget. The reason the client does not wait for a response is that the UI shall not block, and handling the command may take a while.

![Data flow](https://docs.wolkenkit.io/data-flow/data-flow.svg)

The server typically stores the command in a queue to decouple receiving commands from handling them. The queue allows the workers behind the queue to scale independently, as it acts as a buffer.

These workers are called *command handlers*. They decide which aggregate the command refers to, load and run the appropriate domain logic on it. This is where event-sourcing and domain-driven design come into play. We'll look at this in a minute.

The aggregate then decides whether to run the command. It may be that a command is not allowed in a certain state of the aggregate, e.g. the text of a message can only be edited if the message is not older than 24 hours. Anyway, the aggregate publishes events on what has happened. This way, you always get an event, even in case of an error.

Finally, the command handler forwards those events to anyone who is interested. This is done by storing them to a queue again.

To display results the client could subscribe and react to events. This enables live-updates, but makes it incredibly hard to get the initial view. For that, the events must be materialized into a snapshot the client can fetch at any point in time.

This is done using *event denormalizers*. They again are workers, but handle events instead of commands. In their most essential form they map events to CRUD. Each denormalizer is responsible for a table that backs a specific view in the client and updates it accordingly.

This way, each time an event is received by a denormalizer, the view gets updated. As you can easily run more than one instance of a denormalizer, scaling them is very easy.

So, the client fetches these tables. As there is a dedicated table for each of the client's views, a simple `SELECT * FROM table` is usually enough. This works because the denormalizers do not care about 3<sup>rd</sup> normal form but store data in a denormalized form perfectly suited for each view. Additionally, clients may subscribe to the events themselves, e.g. to display updates in real-time.

In summary, clients send commands to the domain which, as a reaction, publishes appropriate events. These events are then used to make up materialized views. All the events are stored within an event store.

# Architecture

As mentioned in [data flow](../data-flow/), in a wolkenkit application, you typically have a client with a task-based UI. This may be a static web site, a mobile application, or anything else. Everytime the user performs a task, the client sends one or more commands to wolkenkit.

In wolkenkit, there are multiple servers that make up an application. The public facing server is called *broker*, since it acts as the gateway to a wolkenkit application and handles commands, events and queries. This represents [CQRS](../why-wolkenkit/#scaling-with-confidence) which separates writing (sending commands) from reading (subscribing to events and querying read models):

![Architecture: From client to broker](https://docs.wolkenkit.io/architecture/architecture-from-client-to-broker.svg)

When the broker receives a command, it forwards the command to a message queue, the so-called *command bus*. Once this has been done, the broker acknowledges to the client that the command was received and accepted. Then another server, whose responsibility is the write model, fetches the previously accepted commands from the command bus to handle them. This server is called *core*.

To handle a command, the core replays the needed aggregate from the *event store*, and hands over the command as well as the replayed aggregate to the command handler you provided as part of your application's [write model](../../../reference/creating-the-write-model/overview/) that was modeled using [domain-driven design (DDD)](../why-wolkenkit/#empowering-interdisciplinary-teams). As a result of the command handler, one or more events get published.

These events are written to the *event store* using [event sourcing](../why-wolkenkit/#learning-from-your-past), and then sent back to the broker via another message queue called *event bus*. The broker updates any lists that are stored inside the *list store* using the projections you defined in your application's [read model](../../../reference/creating-the-read-model/overview/), and finally pushes the events to the client:

![Architecture: Client, broker and core](https://docs.wolkenkit.io/architecture/architecture-client-broker-and-core.svg)

Complementary to the basic processing of commands and events described so far, there are also additional services for advanced use cases, e.g. to run workflows, store large files and authenticate users.

To run workflows, the core not only sends published events to the broker, but also to another server called *flows*. For that, it uses a dedicated message queue called *flow bus*. Whenever the flow server receives an event, it runs reactions for that event based on your application's [stateless](../../../reference/creating-stateless-flows/overview/) and [stateful flows](../../../reference/creating-stateful-flows/overview/).

For storing large files, wolkenkit provides a file storage service called *depot*. It provides its own API and client SDK to [store and retrieve files](../../../reference/storing-large-files/accessing-file-storage/). Hence, it is independent of the broker and the core, and the client must address depot separately.

To [authenticate users](../../../reference/configuring-an-application/enabling-authentication/) wolkenkit uses OpenID Connect, which means that it relies on an external identity provider, such as [Auth0](https://auth0.com/) or [Keycloak](https://www.keycloak.org/).

All the aforementioned application servers (broker, core and flows) and infrastructure services (event store, list store, depot and the various message queues) run as individual processes, which makes any wolkenkit application a distributed system by default:

![Architecture: Distributed by default](https://docs.wolkenkit.io/architecture/architecture-distributed-by-default.svg)

## Running on Docker

For all processes of a wolkenkit application there are [Docker base images](https://hub.docker.com/r/thenativeweb/). When starting an application [using the CLI](../../../reference/using-the-cli/controlling-the-lifecycle/), these base images are taken as the foundation to build custom Docker images specific to your application. These application-specific images then contain your application's code and configuration.

Finally, the images are run as containers that get connected to each other by using a virtual network. Since the application containers (broker, core and flows) run your application's code, they may need a few npm modules. To avoid having to install them to every single application container, they are only installed once to a shared Docker container named *node-modules* that is then used as a volume by the other containers.

The publicly accessible ports of all the containers are exposed using a reverse proxy, which runs in a Docker container named *proxy*.

## Finding the code

The code for wolkenkit is located in repositories on [GitHub](https://github.com/thenativeweb). On [Docker Hub](https://hub.docker.com/r/thenativeweb/), there is an automated build for each repository that is responsible for building the respective Docker image:

| Component | Repository | Docker image |
|-|-|-|
| CLI | [wolkenkit](https://github.com/thenativeweb/wolkenkit) | n/a |
| Client SDK | [wolkenkit-client-js](https://github.com/thenativeweb/wolkenkit-client-js) | n/a |
| Depot client SDK | [wolkenkit-depot-client-js](https://github.com/thenativeweb/wolkenkit-depot-client-js) | n/a |
| Broker | [wolkenkit-broker](https://github.com/thenativeweb/wolkenkit-broker) | [wolkenkit-broker](https://hub.docker.com/r/thenativeweb/wolkenkit-broker/) |
| Core | [wolkenkit-core](https://github.com/thenativeweb/wolkenkit-core) | [wolkenkit-core](https://hub.docker.com/r/thenativeweb/wolkenkit-core/) |
| Flows | [wolkenkit-flows](https://github.com/thenativeweb/wolkenkit-flows) | [wolkenkit-flows](https://hub.docker.com/r/thenativeweb/wolkenkit-flows/) |
| Event store | [wolkenkit-box-postgres](https://github.com/thenativeweb/wolkenkit-box-postgres) | [wolkenkit-postgres](https://hub.docker.com/r/thenativeweb/wolkenkit-postgres/) |
| List store | [wolkenkit-box-mongodb](https://github.com/thenativeweb/wolkenkit-box-mongodb) | [wolkenkit-mongodb](https://hub.docker.com/r/thenativeweb/wolkenkit-mongodb/) |
| Depot | [wolkenkit-depot](https://github.com/thenativeweb/wolkenkit-depot) | [wolkenkit-depot](https://hub.docker.com/r/thenativeweb/wolkenkit-depot/) |
| Message queue | [wolkenkit-box-rabbitmq](https://github.com/thenativeweb/wolkenkit-box-rabbitmq) | [wolkenkit-rabbitmq](https://hub.docker.com/r/thenativeweb/wolkenkit-rabbitmq/) |
| Shared npm modules | [wolkenkit-box-node-modules](https://github.com/thenativeweb/wolkenkit-box-node-modules) | [wolkenkit-node-modules](https://hub.docker.com/r/thenativeweb/wolkenkit-node-modules/) |
| Proxy | [wolkenkit-proxy](https://github.com/thenativeweb/wolkenkit-proxy) | [wolkenkit-proxy](https://hub.docker.com/r/thenativeweb/wolkenkit-proxy/) |

# Installing on Linux

To run wolkenkit on Linux you need to setup a few things.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker on Linux, [follow the installation instructions](https://docs.docker.com/engine/installation/linux/) for the Linux distribution of your choice.

## Setting up Node.js

To run wolkenkit you need Node.js <%= current.versions.node %> or higher. We recommend installing Node.js using [nvm](https://github.com/creationix/nvm), which enables switching between different Node.js versions.

First, install nvm using this command:

```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

Then, restart your terminal and install Node.js using the following commands:

```shell
$ nvm install <%= current.versions.node %>
$ nvm alias default <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```

## Setting up wolkenkit

To download and install wolkenkit, run the following command:

```shell
$ npm install -g wolkenkit@<%= current.versions.cli %>
```

## Verifying the installation

Verify that wolkenkit is installed correctly by running the following command:

```shell
$ wolkenkit --version
```

:::hint-congrats
> **Yay, congratulations!**
>
> You have successfully installed wolkenkit!
:::

To learn how to build and run your first application, have a look at [creating your first application](../../creating-your-first-application/setting-the-objective/) 😊!

# Installing on Windows

To run wolkenkit on Windows you need to setup a few things.

## Preparing the system for Hyper-V

As wolkenkit uses Linux-based Docker images, you have to use Hyper-V to run wolkenkit. Currently, wolkenkit does not support native Windows images.

:::hint-warning
> **Hyper-V support is experimental**
>
> Running wolkenkit on Windows using Hyper-V is experimental, and not yet officially supported.
:::

### Using hardware

To run Windows directly on hardware, i.e. without any virtualization, you do not need to take any special steps.

:::hint-warning
> **Enable VT-x**
>
> You may have to enable VT-x support in your machine's BIOS for Docker to work.
:::

### Using VMware Fusion

To run Windows using VMware Fusion, you need to enable Hypervisor applications for your virtual machine. Shutdown the virtual machine and go to *Settings > System settings > Processors and RAM > Advanced options*. Ensure that *Enable Hypervisor applications in this virtual machine* is checked. Close the settings to save your changes.

Now locate the file that represents the virtual machine on your host computer. As this file is an archive, open it, and then open the included `.vmx` file. This file contains the settings for your virtual machine. If not yet present, add the following lines to the file:

```
hypervisor.cpuid.v0 = "FALSE"
vhv.enable = "TRUE"
```

After that, start your virtual machine and boot into Windows.

## Installing Hyper-V

To install Hyper-V run PowerShell using administrative privileges. Then run the following commands:

```shell
$ Enable-WindowsOptionalFeature -Online -FeatureName containers -All
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

:::hint-warning
> **Restart Windows**
>
> Don't forget to restart Windows once the commands have been completed.
:::

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker on Windows, [download and install Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

## Setting up Node.js

To run wolkenkit you need Node.js <%= current.versions.node %> or higher. We recommend to install Node.js using [nvm-windows](https://github.com/coreybutler/nvm-windows), which enables switching between different Node.js versions.

So, [download and install nvm-windows](https://github.com/coreybutler/nvm-windows#installation--upgrades).

Restart PowerShell and install Node.js using the following command:

```shell
$ nvm install <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```

## Setting up wolkenkit

To download and install wolkenkit, run the following command:

```shell
$ npm install -g wolkenkit@<%= current.versions.cli %>
```

## Verifying the installation

Verify that wolkenkit is installed correctly by running the following command:

```shell
$ wolkenkit --version
```

:::hint-congrats
> **Yay, congratulations!**
>
> You have successfully installed wolkenkit!
:::

To learn how to build and run your first application, have a look at [creating your first application](../../creating-your-first-application/setting-the-objective/) 😊!

# Installing using Docker Machine

To run wolkenkit using Docker Machine you need to setup a few things.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker using Docker Machine, [download and install Docker Toolbox](https://docs.docker.com/toolbox/overview/).

Additionally, setup a virtualization engine such as VMware Fusion or VirtualBox. You can find the complete list of supported virtualization engines in the [Docker documentation](https://docs.docker.com/machine/drivers/).

:::hint-warning
> **Enable VT-x**
>
> You may have to enable VT-x support in your machine's BIOS for Docker to work.
:::

### Using VMware Fusion

To create a virtual machine using VMware Fusion run the following command:

```shell
$ docker-machine create --driver vmwarefusion wolkenkit
```

### Using VirtualBox

To create a virtual machine using VirtualBox run the following command:

```shell
$ docker-machine create --driver virtualbox wolkenkit
```

:::hint-warning
> **VirtualBox and macOS**
>
> Currently there is a bug within VirtualBox on macOS that affects running DNS queries from within virtual machines. Hence, after having created the virtual machine you need to run the following command:
>
> `$ VBoxManage modifyvm wolkenkit --natdnsproxy1 off --natdnshostresolver1 off`
:::

### Setting up environment variables

Finally, you need to setup the environment variables `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH`. To make Docker do this for you, run the following command:

```shell
$ eval $(docker-machine env wolkenkit)
```

To have the environment variables set automatically each time you open a terminal, you need to add them to your `~/.profile` file. To do so, run:

```shell
$ docker-machine env wolkenkit >> ~/.profile
```

## Setting up Node.js

To run wolkenkit you need Node.js <%= current.versions.node %> or higher. We recommend installing Node.js using [nvm](https://github.com/creationix/nvm), which enables switching between different Node.js versions.

First, install nvm using this command:

```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

Then, restart your terminal and install Node.js using the following commands:

```shell
$ nvm install <%= current.versions.node %>
$ nvm alias default <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```

## Setting up wolkenkit

To download and install wolkenkit, run the following command:

```shell
$ npm install -g wolkenkit@<%= current.versions.cli %>
```

## Setting up local.wolkenkit.io

When developing wolkenkit applications you will usually run them on the domain `local.wolkenkit.io`. This means that you need to set up this domain inside your `/etc/hosts` file and make it point to the Docker server running on your previously created virtual machine. For that, run the following command:

```shell
$ sudo sh -c 'echo $(docker-machine ip wolkenkit)\\tlocal.wolkenkit.io >> /etc/hosts'
```

## Verifying the installation

Verify that wolkenkit is installed correctly by running the following command:

```shell
$ wolkenkit --version
```

:::hint-congrats
> **Yay, congratulations!**
>
> You have successfully installed wolkenkit!
:::

To learn how to build and run your first application, have a look at [creating your first application](../../creating-your-first-application/setting-the-objective/) 😊!


# Creating your first application: Setting the objective

In this guide you will create your first application. The objective is to get you started with initializing and running wolkenkit applications.

## Defining the application

Your first application will be a ready-made chat application that allows sending and receiving messages in order to talk to other users. Additionally, users are able to like messages.

![The chat application](https://docs.wolkenkit.io/3.1.0/getting-started/creating-your-first-application/setting-the-objective/chat.png)

So, let's get started with [creating the application](../creating-the-application/)!

# Creating the application

First, you need to create a new directory for your application. Call it `chat`:

```shell
$ mkdir chat
```

## Initializing the application

From inside this directory, run the following command to initialize a new wolkenkit application. When asked to select a template, choose `Chat (sample application)`:

```shell
$ wolkenkit init
```

## Running your application

Now run your application by using the following command, and wait for a success message:

```shell
$ wolkenkit start
```

## Running the client

To run the client for your application, you first have to set it up. Therefore, run the following commands to switch to the `client` directory and install the client's dependencies:

```shell
$ cd client
$ npm install
```

Once you have done that run the client using the following command from inside the `client` directory. This will automatically launch a browser and open the client:

```shell
$ npm run serve
```

## Lets's chat!

You are now able to chat. This even works with multiple browsers concurrently:

![The chat application](https://docs.wolkenkit.io/3.1.0/getting-started/creating-your-first-application/creating-the-application/chat.png)

:::hint-congrats
> **Yay, congratulations!**
>
> You have initialized and run your first wolkenkit application!
:::

All in all, this was pretty easy because you were able to use a template. If you want to learn to build a chat by yourself, have a look at [creating an application from scratch](../../../guides/creating-an-application-from-scratch/setting-the-objective/). For now, we wish you some happy chatting 😊!

# Updating the CLI

To update the wolkenkit CLI to the latest version run the following command:

```shell
$ npm install -g wolkenkit
```

:::hint-warning
> **Install the CLI locally**
>
> New versions of the CLI may drop support for previously supported wolkenkit runtime versions. To ensure that you have the right version of the CLI for a specific application, install the CLI into the local context of your application:
>
> ```shell
> $ npm install wolkenkit@<%= current.versions.cli %> --save-dev
> ```
>
> When installed locally, you can start the local version using [npx](https://www.npmjs.com/package/npx). This will always favor the local over the global installation.
:::

# Updating an application

To update an application to the current version of wolkenkit follow the steps given below.

## package.json, using local.wolkenkit.io

**Previous version (3.1.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "3.1.0"
  },
  "environments": {
    "default": {
      "api": {
        "address": {
          "host": "local.wolkenkit.io",
          "port": 3000          
        }
      }
    },
  },
  "...": "..."
}
```

**Current version (<%= current.version %>)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "<%= current.version %>"
  },
  "environments": {
    "default": {
      "api": {
        "port": 3000
      }
    }
  },
  "...": "..."
}
```

For details on how to configure the port, see [setting the port](../../../reference/configuring-an-application/setting-the-port).

## package.json, using a custom host

**Previous version (3.1.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "3.1.0"
  },
  "environments": {
    "default": {
      "api": {
        "address": {
          "host": "example.com",
          "port": 3000          
        },
        "certificate": "/server/keys/example.com"
      }
    },
  },
  "...": "..."
}
```

**Current version (<%= current.version %>)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "<%= current.version %>"
  },
  "environments": {
    "default": {
      "api": {
        "host": {
          "name": "example.com",
          "certificate": "/server/keys/example.com"
        },
        "port": 3000
      }
    }
  },
  "...": "..."
}
```

For details on how to configure a custom host, see [using a custom host](../../../reference/configuring-an-application/using-a-custom-host).

## package.json, using an identity provider

**Previous version (3.1.0)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "3.1.0"
  },
  "environments": {
    "default": {
      "identityProvider": {
        "name": "identityprovider.example.com",
        "certificate": "/server/keys/identityprovider.example.com"
      }
    },
  },
  "...": "..."
}
```

**Current version (<%= current.version %>)**

```json
"wolkenkit": {
  "application": "your-app",
  "runtime": {
    "version": "<%= current.version %>"
  },
  "environments": {
    "default": {
      "identityProviders": [
        {
          "issuer": "identityprovider.example.com",
          "certificate": "/server/keys/identityprovider.example.com"
        }
      ]
    }
  },
  "...": "..."
}
```

For details on how to configure the identity provider, see [enabling authentication](../../../reference/configuring-an-application/enabling-authentication).


# Creating an application from scratch: 
# Setting the objective

In this guide you will create an application from scratch. The objective is to introduce you to wolkenkit, its structure and mindset, so that you get a first impression of what software development with wolkenkit looks like.

## Defining the application

Your application will be a chat that allows sending and receiving messages in order to talk to other users. Additionally, users are able to like messages. In contrast to [creating your first application](../../../getting-started/creating-your-first-application/setting-the-objective/), you will now create the entire application from scratch by yourself.

![The chat application](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/setting-the-objective/chat.png)

## Defining the features

For this, you will implement the following features:

- Users can send messages.
- Users can like messages.
- Sent messages are visible to all users.
- When a user enters the chat they are shown the previously sent messages.
- When a user receives a message the UI is updated in real-time.
- Sending and receiving messages is possible using an API.
- Sending and receiving messages is encrypted.

## Limiting the scope

To avoid that developing your first application goes beyond the scope of this guide, there are a few constraints that limit its scope:

- There are no chat rooms.
- There are no private messages.
- There is no authentication.
- There is no authorization.

Now, let's get started and do some [modeling with your team](../modeling-with-your-team/)!

# Modeling with your team

You are probably tempted to start thinking about the technical parts of the application, such as encrypting messages, having an API, and so on.

Anyway, this is not the application's core domain. You don't create the application because you want to do encryption or build an API. You create the application because you want to enable people to talk to each other by sending and receiving messages. So, for now, let's focus on the actual domain.

:::hint-tip
> **Take your time to discuss**
>
> Although you probably read this guide alone, in reality software development is a team process. This means that you will discuss a lot about finding the right words and what their meanings are. Having these discussions right from the start makes a huge difference for the entire team. Take your time to discuss, play with variations, and do not stop before you have reached consensus.
:::

## Carve out commands

When modeling an application, the first thing to do is to identify the user actions that update the application state. For that have a look at the following image.

![The chat application](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/modeling-with-your-team/chat-commands.png)

As you can see, there are a text box with a *Send message* button, and below each message a button to like it. In wolkenkit, actions like these are called **commands**.

When the user wants to run a command, the application decides whether this is allowed. There may be various reasons why an application rejects a command, e.g. there may be the constraint that a given user can only send a limited number of messages within a specific range of time, or a message must not be empty.

Since a command is an instruction to the application, it is phrased using the imperative. Hence we choose *send message* and *like message*.

:::hint-tip
> **Different words have different meanings**
>
> It may be obvious to name the commands *send message* and *like message*, but there would have been alternatives. E.g., instead of *like* you might also have used *react*, *up-vote*, or *mark*. Each of these words comes with a different meaning, and you have to look for the word that best matches the intention of your core domain.
:::

Maybe you have come up with something that uses words such as *create* and *update*. Keep in mind that this usually is not the language of your users to describe their needs. Developers often tend to use technical terminology such as *create*, *read*, *update*, and *delete*. Avoid these words when discussing the domain language, as these words are very generic and do not carry much semantics. What you get from this is a better understanding of your core domain.

:::hint-warning
> **Commands will write**
>
> As commands are only about writing to the application, i.e. updating its state, there is no *receive message* command. Receiving messages means reading from the application, which does not change its state. We will take care of this later.
:::

## Carve out events

When the application allows the command to update the application state, it publishes an **event**. An event describes a fact that has happened and can not be undone. Hence they are phrased using past tense.

This way we come up with two events, *sent message* and *liked message*.

These events are what is actually stored in the event store, and what can be replayed eventually. The more specific your events are, the better you can reinterpret them when needed.

## Aggregating commands and events

When the user runs a command, there must be something that handles it and decides whether it is allowed to update the application state. For that, you need an **aggregate** that embraces commands and events, and that contains the state it needs to make decisions.

In our simple example there are now two options. You could model the entire chat as a single aggregate, or have an aggregate that represents a message. We decide to use an aggregate named *message*, since there are no domain constraints regarding the chat itself. Additionally, every message needs its individual state, e.g. to store the number of likes it has received.

Since the aggregate is now called *message*, there is no need to repeat the aggregate's name inside of every command and event. So, *send message*, *like message*, *sent message*, and *liked message* simply become *send*, *like*, *sent*, and *liked*. Now, your whiteboard might look similar to this:

![The message aggregate](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/modeling-with-your-team/aggregate-message.png)

## Defining the context

In more complex applications you will have multiple aggregates. While some of them will be closely related to each other, others will address completely different parts of your application. To group related aggregates use a **context**. Although currently we only have a single aggregate, we need to define a context. Let's call it *communication*.

That's it for the write model.

## Defining lists

If you now have another look at the image below, you will realize that the list of messages is still missing, which is another important part of the application:

![The chat application](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/modeling-with-your-team/chat-lists.png)

In contrast to aggregates, commands, and events, reading a list does not update the application state. Hence defining a list does not belong to the write model, but to the read model.

So, we define a list called *messages* with the following structure:

| id | timestamp     | text              | likes |
|----|---------------|-------------------|-------|
| …  | 1484145874599 | hey, how are you? |     0 |
| …  | 1484145883548 | i'm fine, thx     |     1 |

Now, let's start to code by [creating the write model](../creating-the-write-model/)!

# Creating the write model

First, you need to create a new directory for your application. Call it `chat`:

```shell
$ mkdir chat
```

Inside of this directory you will store the wolkenkit application as well as any related files, such as documentation, images, and so on. The actual wolkenkit code must be in a directory called `server`, so you need to create it as well:

```shell
$ mkdir chat/server
```

Finally, for the write model, you need to create another directory called `writeModel` inside of the `server` directory:

```shell
$ mkdir chat/server/writeModel
```

To have a valid directory structure, you also need to add three more directories that you are going to need later, `readModel`, `readModel/lists`, and `flows`:

```shell
$ mkdir chat/server/readModel
$ mkdir chat/server/readModel/lists
$ mkdir chat/server/flows
```

::: hint-question
> **What do write model, read model, and flows mean?**
>
> If you are unsure about what the write model, the read model, and flows are, have a look at the [core concepts](../../../getting-started/understanding-wolkenkit/core-concepts/).
:::

As a result, your directory structure should look like this:

```
chat
  server
    flows
    readModel
      lists
    writeModel
```

For more details, see [creating the directory structure](../../../reference/initializing-an-application/starting-from-scratch/#creating-the-directory-structure).

## Configuring the application

One thing every wolkenkit application needs is a `package.json` file within the application's directory. This file contains some configuration options that wolkenkit needs to start the application.

Create a `package.json` file within the `chat` directory:

```shell
$ touch chat/package.json
```

Then, open the file and add the following code:

```json
{
  "name": "chat",
  "version": "0.0.0",
  "wolkenkit": {
    "application": "chat",
    "runtime": {
      "version": "<%= current.version %>"
    },
    "environments": {
      "default": {
        "api": {
          "port": 3000,
          "allowAccessFrom": "*"
        },
        "fileStorage": {
          "allowAccessFrom": "*"
        },
        "node": {
          "environment": "development"
        }
      }
    }
  }
}
```

For more details, see [configuring an application](../../../reference/configuring-an-application/naming-an-application/).

## Creating the communication context

To create the *communication* context, create an appropriate directory within the `writeModel` directory:

```shell
$ mkdir chat/server/writeModel/communication
```

For more details, see [defining contexts](../../../reference/creating-the-write-model/defining-contexts/).

## Creating the message aggregate

To create the *message* aggregate, create a `message.js` file within the `communication` directory:

```shell
$ touch chat/server/writeModel/communication/message.js
```

Then, open the file and add the following base structure:

```javascript
'use strict';

const initialState = {
  isAuthorized: {
    commands: {},
    events: {}
  }
};

const commands = {};

const events = {};

module.exports = { initialState, commands, events };
```

For more details, see [defining aggregates](../../../reference/creating-the-write-model/defining-aggregates/).

## Initializing the state

As you have learned while modeling, a message has a `text` and a number of `likes`. For a new message it makes sense to initialize those values to an empty string, and the number `0` respectively. So, add the following two properties to the `initialState`:

```javascript
const initialState = {
  text: '',
  likes: 0,
  // ...
};
```

For more details, see [defining the initial state](../../../reference/creating-the-write-model/defining-the-initial-state/).

## Implementing the send command

Now let's create the *send* command by adding a `send` function to the `commands` object. It receives two parameters, the `message` itself and the actual `command`. For details on the structure of the `command` object, see the [data structure of commands](../../../reference/data-structures/commands/).

Inside of this function you need to figure out whether the command is valid, and if so, publish an event. In the simplest case your code looks like this:

```javascript
const commands = {
  send (message, command) {
    message.events.publish('sent', {
      text: command.data.text
    });
  }  
};
```

Please note that you need to add the text that is contained within the command to the event, because the event is responsible for updating the state. Additionally, this gets sent to the read model and to the client, and they both are probably interested in the message's text.

Although this is going to work, it has one major drawback. The code also publishes the `sent` event for empty messages, as there is no validation. To add this, check the command's `data` property and reject the command if the text is missing:

```javascript
send (message, command) {
  if (!command.data.text) {
    return command.reject('Text is missing.');
  }

  // ...
}
```

For more details, see [defining commands](../../../reference/creating-the-write-model/defining-commands/) and [using command middleware](../../../reference/creating-the-write-model/using-command-middleware/). For details on what's inside a command, see the [data structure of commands](../../../reference/data-structures/commands/).

## Implementing the sent event

To make things work, you also need to implement a handler that reacts to the *sent* event and updates the aggregate's state. For that add a `sent` function to the `events` object. It receives two parameters, the `message` itself, and the actual `event`.

Inside of this function you need to update the state of the message. To set the text to its new value, use the `setState` function of the message object:

```javascript
const events = {
  sent (message, event) {
    message.setState({
      text: event.data.text
    });
  }  
};
```

For more details, see [defining events](../../../reference/creating-the-write-model/defining-events/). For details on what's inside an event, see the [data structure of events](../../../reference/data-structures/events/).

## Implementing the like command

Implementing the *like* command is basically the same as implementing the *send* command. There is one exception, because *like* is self-sufficient and has no additional data. Hence the `like` command could look like this:

```javascript
const commands = {
  // ...
  like (message, command) {
    message.events.publish('liked');
  }  
};
```

Anyway, this raises the question how an event handler should figure out the new number of likes. This is especially true for a client that does not have the current state at hand, but might also be interested in the *liked* event. To fix this, calculate the new number of likes and add this information when publishing the *liked* event:

```javascript
// ...
message.events.publish('liked', {
  likes: message.state.likes + 1
});
// ...
```

## Implementing the liked event

Implementing the *liked* event is exactly the same as implementing the *sent* event. Hence, your code looks like this:

```javascript
const events = {
  // ...
  liked (message, event) {
    message.setState({
      likes: event.data.likes
    });
  }  
};
```

## Configuring the authorization

By default, you will not be able to run the new commands or receive any events for security reasons. As we are not going to implement authentication for this application, you need to allow access for public users. For that, add the following lines to the `isAuthorized` section of the `initialState`:

```javascript
const initialState = {
  // ...
  isAuthorized: {
    commands: {
      send: { forPublic: true },
      like: { forPublic: true }
    },
    events: {
      sent: { forPublic: true },
      liked: { forPublic: true }
    }
  }
};
```

For more details, see [configuring authorization](../../../reference/creating-the-write-model/configuring-authorization/).

## Safety check

Before you proceed, make sure that your aggregate looks like this:

```javascript
'use strict';

const initialState = {
  text: '',
  likes: 0,
  isAuthorized: {
    commands: {
      send: { forPublic: true },
      like: { forPublic: true }
    },
    events: {
      sent: { forPublic: true },
      liked: { forPublic: true }
    }
  }
};

const commands = {
  send (message, command) {
    if (!command.data.text) {
      return command.reject('Text is missing.');
    }

    message.events.publish('sent', {
      text: command.data.text
    });
  },

  like (message, command) {
    message.events.publish('liked', {
      likes: message.state.likes + 1
    });
  }
};

const events = {
  sent (message, event) {
    message.setState({
      text: event.data.text
    });
  },

  liked (message, event) {
    message.setState({
      likes: event.data.likes
    });
  }
};

module.exports = { initialState, commands, events };
```

## Test driving the write model

Now, start your application by running the following command from inside the `chat` directory, and wait until a success message is shown:

```shell
$ wolkenkit start
```

For more details, see [controlling the lifecycle](../../../reference/using-the-cli/controlling-the-lifecycle/).

:::hint-congrats
> **Yay, congratulations!**
>
> You have created your first write model, and you are now also running a cloud-native application that is powered by an HTTP API that streams events in real-time, all securely encrypted using TLS!
:::

Let's try it. First subscribe to the real-time events. Open a new terminal and run the following command:

```shell
$ curl -X POST https://local.wolkenkit.io:3000/v1/events
```

Now, open another terminal side-by-side, and send your first chat message. As soon as you send it, you can watch the events that are being published:

```shell
$ AGGREGATE_ID="$(uuidgen | tr '[:upper:]' '[:lower:]')"
$ TIMESTAMP="$(date +%s000)"
$ curl \
    -X POST \
    -H "content-type: application/json" \
    -d '{
          "context": {
            "name": "communication"
          },
          "aggregate": {
            "name": "message",
            "id": "'"$AGGREGATE_ID"'"
          },
          "name": "send",
          "id": "'"$AGGREGATE_ID"'",
          "data": {
            "text": "Hello wolkenkit!"
          },
          "custom": {},
          "user": null,
          "metadata": {
            "timestamp": '"$TIMESTAMP"',
            "causationId": "'"$AGGREGATE_ID"'",
            "correlationId": "'"$AGGREGATE_ID"'"
          }
        }' \
    https://local.wolkenkit.io:3000/v1/command
```

Before you proceed, cancel the running `curl` process, and stop your application by running the following command:

```shell
$ wolkenkit stop
```

For the client, we are now missing the list of messages, so let's go ahead and start [creating the read model](../creating-the-read-model/)!

# Creating the read model

To create the *messages* list, create a `messages.js` file within the `lists` directory:

```shell
$ touch chat/server/readModel/lists/messages.js
```
:::hint-question
> **Where is the context?**
>
> In contrast to the write model the read model does not use contexts. This is because a read model can handle events from multiple contexts, so it may not be possible to assign a read model to a specific context.
:::

Then, open the file and add the following base structure:

```javascript
'use strict';

const fields = {};

const projections = {};

module.exports = { fields, projections };
```

For more details, see [defining lists](../../../reference/creating-the-read-model/defining-lists/).

## Defining fields

As you have decided while modeling that each message in the list of messages should have a text, a number of likes, and a timestamp, you need to define the appropriate fields:

```javascript
const fields = {
  text: { initialState: '' },
  likes: { initialState: 0 },
  timestamp: { initialState: 0 }
};
```

Additionally, an `id` field is created automatically.

For more details, see [defining fields](../../../reference/creating-the-read-model/defining-fields/).

## Handling the sent event

The next question is how the list becomes filled with messages. For that you need to handle the events that have been published by the write model.

Whenever a message has been sent, add it to the list of messages, and set the text and timestamp to the data that are provided by the event. Add a `communication.message.sent` function to the `projections` object. It receives two parameters, the `messages` list itself and the actual `event`.

Add the message to the list by calling its `add` function. You do not need to set the `id` field, as it gets automatically populated using the aggregate's id that is given in the event:

```javascript
const projections = {
  'communication.message.sent' (messages, event) {
    messages.add({
      text: event.data.text,
      timestamp: event.metadata.timestamp
    });
  }
};
```

For more details, see [defining projections](../../../reference/creating-the-read-model/defining-projections/).

## Handling the liked event

Handling the *liked* event is basically the same as handling the *sent* event. The only difference is that now you need to update an existing message instead of adding a new one. Again, add an event handler, but this time call the list's `update` function:

```javascript
const projections = {
  // ...
  'communication.message.liked' (messages, event) {
    messages.update({
      where: { id: event.aggregate.id },
      set: {
        likes: event.data.likes
      }
    });
  }
};
```

## Safety check

Before you proceed, make sure that your list looks like this:

```javascript
'use strict';

const fields = {
  text: { initialState: '' },
  likes: { initialState: 0 },
  timestamp: { initialState: 0 }
};

const projections = {
  'communication.message.sent' (messages, event) {
    messages.add({
      text: event.data.text,
      timestamp: event.metadata.timestamp
    });
  },

  'communication.message.liked' (messages, event) {
    messages.update({
      where: { id: event.aggregate.id },
      set: {
        likes: event.data.likes
      }
    });
  }
};

module.exports = { fields, projections };
```

:::hint-congrats
> **Yay, congratulations!**
>
> You have created your first read model, and clients can read and observe it in real-time!
:::

Now we are ready for [creating the client](../creating-the-client/), so let's go ahead!

# Creating the client

As wolkenkit is a backend framework, you are completely free to create whatever client you want to, as long as it is able to do HTTP requests.

For JavaScript, there is a client SDK that internally uses this HTTP API, but adds a convenience layer that simplifies talking to your backend dramatically. You can use it inside the browser as well as on the server.

## Downloading the client blueprint

To make things easy we have prepared a sample client for you that you are going to extend. [Download the client](https://github.com/thenativeweb/wolkenkit-client-template-spa-vanilla-js/archive/<%= current.version === 'latest' ? 'master' : current.version %>.zip) into your `chat` directory and, from within this directory, run the following commands:

```shell
$ export CLIENT_TEMPLATE="wolkenkit-client-template-spa-vanilla-js-<%= current.version === 'latest' ? 'master' : current.version %>"
$ unzip ${CLIENT_TEMPLATE}.zip
$ rm ${CLIENT_TEMPLATE}.zip
$ mv ${CLIENT_TEMPLATE} client
```

As a result, your directory structure should look like this:

```
chat
  client
    package.json
    webpack.config.js
    src
      index.html
      index.js
    ...
  server
    ...
```

:::hint-congrats
> **Vanilla JavaScript**
>
> The client does not rely on a specific UI framework, so you do not need any special knowledge besides what you know about vanilla JavaScript anyway.
:::

## Installing the client's dependencies

Before you start to implement the client, you have to install its dependencies. Therefore, run the following commands to switch to the `client` directory and install the client's dependencies:

```shell
$ cd client
$ npm install
```

## Getting an overview

Now open the `src/index.js` file. As you can see, the wolkenkit SDK is already being loaded by the following line:

```javascript
const wolkenkit = require('wolkenkit-client');
```

Additionally, the file contains a ready-made `view` object which takes care of handling the UI. It provides a `render` function to update the UI as well as access to the list of messages (`messages`), the input field for new messages (`newMessage`), and the send message form (`sendMessageForm`).

Finally, it contains a `run` function which is the main entry point of your client. Inside of that function you will find a comment where to put your code:

```javascript
const run = async function () {
  try {

    // Add your code here...

  } catch (ex) {
    console.error(ex);
  }
};
```

## Connecting the client to the backend

Once you have an idea of how the file is organized, you can use the wolkenkit SDK to connect your client to the backend. So, replace the previously mentioned comment with the following lines:

```javascript
const chat = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });

console.log('Yay, you are connected!');
```

For more details, see [connecting to an application](../../../reference/building-a-client/connecting-to-an-application/).

## Test driving the connection

Now, start your wolkenkit backend by running the following command from inside the `chat` directory, and wait until a success message is shown:

```shell
$ wolkenkit start
```

wolkenkit only takes care of the server part of your application and does not automatically run the client for you. To do so, run the following command from inside the `client` directory. This will also launch a browser and open the client:

```shell
$ npm run serve
```

Have a look at the browser's development console to verify that you actually see the success message:

![Connected](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/creating-the-client/connected.png)

## Sending messages

To send a message, you must add an event handler to the `submit` event of the client's send message form. Inside of this handler, you can then run the `send` command of the `message` aggregate, that you can access using the `communication` context of the `chat` application:

```javascript
view.sendMessageForm.addEventListener('submit', event => {
  event.preventDefault();

  const text = view.newMessage.value;

  chat.communication.message().send({ text });
});
```

To get notified when something goes wrong, add the `failed` callback to the command. Also, it might be useful to reset and focus the text box, once the command has been delivered to the server. For that, add the `delivered` callback to the command:

```javascript
chat.communication.message().send({ text }).
  failed(err => console.error(err)).
  delivered(() => {
    view.newMessage.value = '';
    view.newMessage.focus();
  });
```

To ensure that the text box is automatically focused when the client is opened, add another line at the end:

```javascript
view.sendMessageForm.addEventListener('submit', event => {
  // ...
});

view.newMessage.focus();
```

For more details, see [sending commands](../../../reference/building-a-client/sending-commands/).

## Reading and observing messages

Although you are now able to send messages, your client will not receive any of them. To make things work, you need to read and observe the `messages` list and update the UI accordingly. For that, use the `started` and the `updated` callbacks. As before, you will also want to make sure that you get notified in case of errors:

```javascript
// ...

view.newMessage.focus();

chat.lists.messages.readAndObserve().
  failed(err => console.error(err)).
  started(view.render).
  updated(view.render);
```

In a chat it makes sense to have the newest messages at the top of the client, so we will order the messages reversed by their timestamp. Also, you probably do not want to receive all messages that have ever been written, so let's limit their number to `50`:

```javascript
chat.lists.messages.readAndObserve({
  orderBy: { timestamp: 'descending' },
  take: 50
}).
  failed(err => console.error(err)).
  started(view.render).
  updated(view.render);
```

You are now able to send and receive messages, so you already have a working chat.

For more details, see [reading lists](../../../reference/building-a-client/reading-lists/).

## Liking messages

What is still missing is the ability to *like* messages. As the client already provides buttons for this, we are going to handle their `click` events. For performance reasons this is done once for the list, not for each button individually. Of course, then you need to get the `id` of the message whose button was clicked.

Finally, you can run the `like` command for the message of your choice:

```javascript
chat.lists.messages.readAndObserve().
  // ...

view.messages.addEventListener('click', event => {
  if (!event.target.classList.contains('likes')) {
    return;
  }

  const messageId = event.target.getAttribute('data-message-id');

  chat.communication.message(messageId).like().
    failed(err => console.error(err));
});
```

## Lets's chat!

Once you reload your browser, you are now able to chat. This even works with multiple browsers concurrently:

![The chat application](https://docs.wolkenkit.io/3.1.0/guides/creating-an-application-from-scratch/creating-the-client/chat.png)

:::hint-congrats
> **Yay, congratulations!**
>
> You have created your first application from scratch, including a real-time client!
:::

Let's recap what you have achieved:

- Users can send messages.
- Users can like messages.
- Sent messages are visible to all users.
- When a user enters the chat they are shown the previously sent messages.
- When a user receives a message the UI is updated in real-time.
- Sending and receiving messages is possible using an API.
- Sending and receiving messages is encrypted.

We hope that you will have a great time with wolkenkit. For now, we wish you some happy chatting 😊!


#Using the latest runtime
# Overview

Basically there are two types of wolkenkit versions: On the one hand there are the stable versions, that have a version number such as `1.0.0`, `2.0.0` and so on, on the other hand there is the version `latest`.

The stable versions are intended for developers who build applications with wolkenkit, whereas `latest` is a continuously updated version which includes features that are not yet officially available. In most cases you should use a stable version and [pin the runtime](../../../reference/configuring-an-application/pinning-the-runtime/) in your application's `package.json` file. This way you ensure that your application can be run in a reproducible way.

:::hint-warning
> **Be careful with latest**
>
> Please note that the `latest` runtime is updated frequently and is therefore not guaranteed to work reliably at all times. This means that unexpected things may happen that could affect the stability and even the runability of your application. Use at your own risk.
:::

However, from time to time you may want to use the `latest` runtime of wolkenkit to evaluate new features that have not yet been officially released, but will be part of the next stable version. For this you can use `latest` as the runtime version.

This guide will walk you through the steps you need to do to use the `latest` runtime. First, let's start with [installing the latest runtime](../installing-the-latest-runtime/).

# Installing the latest runtime

If you had installed the `latest` runtime before, you have to remove it first. This is because `latest` is updated regularly, and the version already installed may not be the same as the current version. To uninstall an existing version, run the following command:

```shell
$ wolkenkit uninstall --version latest
```

After that you can now install the current `latest` runtime. To do so, run the following command:

```shell
$ wolkenkit install --version latest
```

Next, you also need to [install the latest CLI](../installing-the-latest-cli/).

:::hint-warning
> **Updating the latest runtime**
>
> You need to perform these steps each time you want to update your previously installed `latest` runtime to the current one, e.g. if you want to get early access to new features that you need to evaluate.
:::

# Installing the latest CLI

To be able to use the `latest` runtime, you must also use the latest development version of the CLI. Otherwise, the runtime and the CLI may not match. To install the latest development version of the CLI, you must clone the [thenativeweb/wolkenkit](https://github.com/thenativeweb/wolkenkit) repository. The following command creates a new directory called `wolkenkit`, and clones the repository into that directory:

```shell
$ git clone git@github.com:thenativeweb/wolkenkit.git
```

Then switch to the newly created directory and install the CLI's dependencies by running the following commands:

```shell
$ cd wolkenkit
$ npm install
```

You can now run the CLI as follows:

```shell
$ node ./src/bin/wolkenkit.js
```

Finally, you also need to [update your application](../updating-your-application).

## Updating the CLI

To update an already installed development version of the CLI, go to the previously created `wolkenkit` directory and execute the following commands:

```shell
$ git pull
$ npm install
```

:::hint-warning
> **Updates don't always work**
>
> From time to time, issues arise when updating the CLI. If either command fails, delete the `wolkenkit` directory and reinstall the CLI from scratch as described above.
:::

# Updating your application

To configure an application to use the `latest` runtime, open the application's `package.json` file and set the `wolkenkit/runtime/version` property to `latest`, similar to what you would do with a stable version.

Theoretically, you can now run the application by calling the CLI as described under [installing the latest CLI](../installing-the-latest-cli/). However, depending on the changes contained in the `latest` runtime, the application may require additional adjustments.

:::hint-warning
> **Use at your own risk**
>
> Please note that the latest runtime is not guaranteed to work reliably at all times. This means that unexpected things may happen that could affect the stability and even the runability of your application. Use at your own risk.
:::

# Reference
# Initializing an application
# Using a template

The simplest way to initialize a new application is to use a ready-made template as its base. If you need more control you may consider [starting from scratch](../starting-from-scratch/).

## Using a ready-made template

To initialize a new application based on a ready-made template run the following commands, and select a template when asked for:

```shell
$ mkdir <app>
$ cd <app>
$ wolkenkit init
```

This will download the selected template that you can then use as a starting point to build your own application.

## Using a custom template

If you create wolkenkit applications regularly you may want to create a custom template. For that, all you need to do is storing your custom template in a Git repository. Then, when Initializing a new application, you can use the `--template` flag to provide the repository:

```shell
$ mkdir <app>
$ cd <app>
$ wolkenkit init --template git@github.com:<org>/<repository>.git
```

Perhaps you need to refer to a specific branch or tag. For that, add the `#` character and the branch or tag to the Git path:

```shell
$ wolkenkit init --template git@github.com:<org>/<repository>.git#<branch-or-tag>
```

If you don't specify a branch or a tag explicitly, the CLI uses `master` as default.

## Overwriting existing files

By default, `wolkenkit init` will refuse to run in a non-empty directory, as this could lead to existing files being overwritten accidentally. However, sometimes it makes sense to disable this check and force the CLI to overwrite any existing files, e.g. when you have already created a repository.

To disable this check and overwrite any existing files, add the `--force` flag.

# Starting from scratch

If you need to control every aspect of an application, you may want to start from scratch. Otherwise, you may be fine by simply [using a template](../using-a-template/).

## Creating the directory structure

First, you need to create the basic directory structure. Use a dedicated root directory and create the following sub-directories:

```
<app>
  server
    flows
    readModel
    writeModel
```

Optionally, you may add a `server/shared` directory to store code that is being used across the various directories:

```
<app>
  server
    flows
    readModel
    shared
    writeModel
```

:::hint-tip
> **Additional files**
>
> Additionally, you are free to add arbitrary directories to the root directory itself, e.g. for private files, documentation, or anything else. Everything outside the `server` directory will be ignored by wolkenkit.
:::

## Creating the configuration

Inside of the application's root directory you need to add a `package.json` file that contains the configuration. For more details, see [configuring an application](../../configuring-an-application/naming-an-application/).

As default, use the following template:

```json
{
  "name": "<app>",
  "version": "<version>",
  "wolkenkit": {
    "application": "<app>",
    "runtime": {
      "version": "<%= current.version %>"
    },
    "environments": {
      "default": {
        "api": {
          "address": {
            "host": "local.wolkenkit.io",
            "port": 3000
          },
          "allowAccessFrom": "*"
        },
        "fileStorage": {
          "allowAccessFrom": "*"
        }
      }
    }
  }
}
```

:::hint-warning
> **Alphanumeric only**
>
>  The application name must only contain alphanumeric characters. Additionally, it is recommended to only use lowercase characters.
:::

# Creating the write model
# Overview

The write model is responsible for updating the application state. For that, it handles commands, publishes and stores events, and finally updates the state.

## Introducing commands and events

A *command* is a request to update the application state. They are typically caused by some user interaction, but they can also be caused programmatically. A command contains data as well as metadata. Its name is phrased using the imperative, as it represents an instruction given to the application.

When the application runs a command this results in one or more *events*. An event is a fact that has happened and that can not be undone. They also contain data and metadata. An event's name is phrased using past tense. Events are published by the write model, so that the read model as well as clients can react to them. Additionally, they are stored in the event store.

## Introducing aggregates

To decide whether running a command is allowed you need an *aggregate*. An aggregate embraces logically related commands and events. It contains the state that is necessary to decide whether to publish events, and thereby update the application state.

When an aggregate is initialized you need to set its *initial state*. It contains any values that make up the aggregate's state when no command has yet been run. By default, commands and events can only be run respectively received by the owner of their aggregate. You may want to change this by configuring authorization.

## Introducing contexts

In a complex application you will have many aggregates. Some of them will be closely related to each other, while others will address completely different parts of your application. To group related aggregates use a *context*.

# Defining contexts

To define a context, create a directory with the name of the context within the `server/writeModel` directory:

```shell
$ cd <app>
$ mkdir server/writeModel/<context>
```

:::hint-tip
> **Shared code**
>
> The `server/writeModel` directory must only contain contexts and aggregates. If you want to add a directory or a file that is shared across multiple aggregates, put it into the `server/shared` folder.
:::

E.g., if you want to define a context called `accounting`, use the following directory structure:

```
<app>
  server
    flows
    readModel
    shared
    writeModel
      accounting
```

:::hint-tip
> **Reserved context name**
>
> Do not name a context `lists`, since this is a reserved name.
:::

# Defining aggregates

To define an aggregate, create a `.js` file with the name of the aggregate within the appropriate context directory:

```shell
$ cd <app>
$ touch server/writeModel/<context>/<aggregate>.js
```

:::hint-tip
> **Shared code**
>
> The `server/writeModel` directory must only contain contexts and aggregates. If you want to add a directory or a file that is shared across multiple aggregates, put it into the `server/shared` folder.
:::

E.g., if you want to define an aggregate called `invoice` in the `accounting` context, use the following directory structure:

```
<app>
  server
    flows
    readModel
    shared
    writeModel
      accounting
        invoice.js
```

## Structuring the code

Every aggregate uses the same base structure. Hence, you can prepare an aggregate by simply copying and pasting the following template:

```javascript
'use strict';

const initialState = {
  isAuthorized: {
    commands: {},
    events: {}
  }
};

const commands = {};

const events = {};

module.exports = { initialState, commands, events };
```

# Defining the initial state

To define the initial state, assign the desired properties to the `initialState` object.

:::hint-warning
> **JSON only**
>
> You may use any JavaScript data type and value that is supported by JSON. This especially means that you are not allowed to use constructor functions here. Rely on object and array literals instead.
:::

E.g., if you want to add a field  of type string named `recipient`, you will end up with the following initial state:

```javascript
const initialState = {
  recipient: '',
  isAuthorized: {
    commands: {},
    events: {}
  }
};
```

:::hint-warning
> **Required property**
>
> Do not remove the `isAuthorized` property, since this is a reserved name.
:::

For more details on the `isAuthorized` property, see [configuring authorization](../configuring-authorization/).

# Defining commands

To define a command add an appropriately named function to the `commands` object of the aggregate the command refers to. This function receives two parameters, the aggregate instance and the command.

Inside of the function, add code that decides whether the command may be run. If you need to reject the command, call the `command.reject` function and provide a reason.

E.g., to issue an invoice, use the following code:

```javascript
const commands = {
  issue (invoice, command) {
    const canInvoiceBeIssued = // ...

    if (!canInvoiceBeIssued) {
      return command.reject('...');
    }

    // ...
  }
};
```

Some commands require asynchronous code. Therefore, you can use the keywords `async` and `await`. To be able do this, define the command using the `async` keyword:

```javascript
const commands = {
  async issue (invoice, command) {
    // ...

    const result = await validateInvoice();

    // ...
  }
};
```

For a detailed list of a command's properties, see the [data structure of commands](../../data-structures/commands/).

:::hint-warning
> **Reserved command names**
>
> Do not name a command `transferOwnership` or `authorize`, since these are reserved names.
:::

## Accessing the command data

To decide whether a command may be run you may need to access the command data. For that, use the `command.data` property.

E.g., to verify whether the amount that is given in the `issue` command is positive, use the following code:

```javascript
if (command.data.amount > 0) {
  // ...
}
```

:::hint-warning
> **File storage for large documents**
>
> Commands represent a user's request to the system. Although they contain data, they should not contain large documents such as PDFs, images or videos. If you want to store such documents, think about using [file storage](../../storing-large-files/accessing-file-storage/).
:::

## Accessing the aggregate state

To decide whether a command may be run you may need to access the aggregate state. For that, use the `state` property of the aggregate.

E.g., to verify whether an invoice was already issued, use the following code (assuming that the aggregate state contains a property `isIssued` set to `true`):

```javascript
if (invoice.state.isIssued) {
  // ...
}
```

To get the aggregate ID, access the property `id` of the aggregate directly, as the ID is not part of the state.

## Publishing events

Typically you need to publish events to let the world know about the outcome of the command. For that, call the `events.publish` function on the aggregate and provide the name and the data of the event.

E.g., to publish an `issued` event for an invoice, use the following code:

```javascript
invoice.events.publish('issued', {
  amount: command.data.amount
});
```

If an event does not have any data, you can omit the second parameter:

```javascript
invoice.events.publish('issued');
```

## Verifying whether an aggregate exists

Some commands are intended to initialize new aggregates. Other commands, though, are supposed to change the state of existing aggregates. To ensure that commands are only executed if they are to be executed, you may need to determine whether you are dealing with a new or an existing aggregate. That's what the `exists` function is for. Depending on the state of the aggregate, this function returns either `true` or `false`.

E.g., to verify whether an invoice aggregate already exists, use the following code:

```javascript
if (invoice.exists()) {
  // ...
}
```

:::hint-tip
> **Middlewares simplify things**
>
> Instead of calling the `exists` function manually, you can alternatively use a [middleware](../using-command-middleware/) such as [wolkenkit-command-tools](https://github.com/thenativeweb/wolkenkit-command-tools).
>
> The two functions [`only.ifExists`](../using-command-middleware/#onlyifexists) and [`only.ifNotExists`](../using-command-middleware/#onlyifnotexists) serve the same purpose, but can be integrated more elegantly.
:::

# Defining events

An event updates the state of the aggregate once it has been published. So, a function that is defined inside of the `events` object can be seen as an event handler that reacts to a particular event and updates the aggregate's state.

To define an event add an appropriately named function to the `events` object of the aggregate the event refers to. This function receives two parameters: the aggregate instance, and the event.

Inside of the function, add code that modifies the aggregate state. For that use the `setState` function of the aggregate.

:::hint-warning
> **Always handle events synchronously**
>
> You should be careful not to have any logic in an event, besides updating the state. That's why, unlike commands, events are always synchronous. Therefore, you must not use the `async` keyword here.
:::

E.g., to handle an `issued` event and set the `isIssued` property to `true`, use the following code:

```javascript
const events = {
  issued (invoice, event) {
    invoice.setState({
      isIssued: true
    });
  }
};
```

For a detailed list of an event's properties, see the [data structure of events](../../data-structures/events/).

:::hint-warning
> **Reserved event names**
>
> Do not name an event `transferredOwnership` or `authorized`, since these are reserved names.
:::

## Accessing the event data

To set the aggregate state you may need to access the event data. For that, use the `event.data` property.

E.g., to set the `requiresAttention` property depending on the amount that is given in the `issued` event, use the following code:

```javascript
invoice.setState({
  requiresAttention: event.data.amount > 2500
});
```

To get the aggregate ID, access the property `id` of the aggregate directly, as the ID is not part of the state.


# Using command middleware

From time to time you may want to extract recurring parts of commands into reusable functions. This can be done using middleware.

While [defining commands](../defining-commands/) introduced commands as functions, commands can actually also be arrays of functions. In this case, the array acts as a chain of responsibility, where each function decides whether to pass the command to the next element of the chain or whether to reject it.

All functions besides the actual command are so-called middleware functions. They receive the same parameters as the actual command. Just like commands, you can optionally mark them with the keyword `async`.

E.g., if you want to add a middleware function to the `issue` command, use the following code:

```javascript
const commands = {
  issue: [
    (invoice, command) => {
      // ...
    },

    (invoice, command) => {
      // ...
    }
  ]
};
```

If you call `command.reject` within a middleware, any further execution of the chain gets cancelled immediately.

## Using setup functions

To reuse middleware it is recommended to wrap it in a setup function. This way you can provide options to the middleware itself.

E.g., if you want to create a middleware for invoices that only passes the command to the next element of the chain if the amount that was sent within the command is above a given threshold, use the following code:

```javascript
const onlyIfAmountIsAbove = function (threshold) {
  return function (invoice, command) {
    if (command.data.amount > threshold) {
      return;
    }

    return command.reject('Amount is too low.');
  };
};
```

To use this middleware call the setup function before the actual command as part of the chain:

```javascript
const commands = {
  issue: [
    onlyIfAmountIsAbove(0),
    (invoice, command) => {
      // ...
    }
  ]
};
```


## Using ready-made middleware

Instead of manually creating middleware for common use-cases, you may also use modules such as [wolkenkit-command-tools](https://github.com/thenativeweb/wolkenkit-command-tools). It features a number of ready-made middlewares, such as `only.ifExists` and `only.ifValidatedBy`.

### only.ifExists

This middleware passes if the aggregate instance exists, otherwise it rejects the command.

E.g., to run the `issue` command only if the invoice already exists, use the following code:

```javascript
const commands = {
  issue: [
    only.ifExists(),
    (invoice, command) => {
      // ...
    }
  ]
};
```

### only.ifNotExists

This middleware passes if the aggregate instance does not exist, otherwise it rejects the command.

E.g., to run the `issue` command only if the invoice does not yet exist, use the following code:

```javascript
const commands = {
  issue: [
    only.ifNotExists(),
    (invoice, command) => {
      // ...
    }
  ]
};
```

### only.ifCommandValidatedBy

This middleware passes if the command data can be validated by the given JSON schema, otherwise it rejects the command. Internally, the `only.ifCommandValidatedBy` function uses [ajv](https://github.com/epoberezkin/ajv) to validate the given JSON schema. For details on the supported keywords see [its documentation](http://epoberezkin.github.io/ajv/#validation-keywords).

E.g., to run the `issue` command only if the command contains an `amount` property of type `number`, use the following code:

```javascript
const commands = {
  issue: [
    only.ifCommandValidatedBy({
      type: 'object',
      properties: {
        amount: { type: 'number' }
      },
      required: [ 'amount' ]
    }),
    (invoice, command) => {
      // ...
    }
  ]
};
```

#### Using a validation function

Alternatively, you may also provide a validation function. This function must return `true` if the validation was successful, otherwise `false`. The validation function is given the command data as parameter.

E.g., to manually verify whether the command contains an `amount` property of type `number`, use the following code:

```javascript
const commands = {
  issue: [
    only.ifCommandValidatedBy(data => {
      if (typeof data.amount !== 'number') {
        return false;
      }
      return true;
    }),
    (invoice, command) => {
      // ...
    }
  ]
};
```

### only.ifStateValidatedBy

This middleware passes if the aggregate's state can be validated by the given JSON schema, otherwise it rejects the command. Internally, the `only.ifStateValidatedBy` function uses [ajv](https://github.com/epoberezkin/ajv) to validate the given JSON schema. For details on the supported keywords see [its documentation](http://epoberezkin.github.io/ajv/#validation-keywords).

E.g., to run the `issue` command only if the aggregate's state contains an `amount` property of type `number`, use the following code:

```javascript
const commands = {
  issue: [
    only.ifStateValidatedBy({
      type: 'object',
      properties: {
        amount: { type: 'number' }
      },
      required: [ 'amount' ]
    }),
    (invoice, command) => {
      // ...
    }
  ]
};
```

#### Using a validation function

Alternatively, you may also provide a validation function. This function must return `true` if the validation was successful, otherwise `false`. The validation function is given the command data as parameter.

E.g., to manually verify whether the aggregate's state contains an `amount` property of type `number`, use the following code:

```javascript
const commands = {
  issue: [
    only.ifStateValidatedBy(data => {
      if (typeof data.amount !== 'number') {
        return false;
      }
      return true;
    }),
    (invoice, command) => {
      // ...
    }
  ]
};
```

# Using command services

To use services, add `services` as third parameter to your command or middleware function.

E.g., if you want to use services from within the `issue` command, use the following code:

```javascript
const commands = {
  issue (invoice, command, services) {
    // ...
  }
};
```

Since you do not usually need all services at the same time, it will make sense to request only the services you need. To do this, use destructuring to specify the services you need, e.g.:

```javascript
const commands = {
  issue (invoice, command, { app }) {
    // ...
  }
};
```

## Reading other aggregates

Sometimes you need to read another aggregate, e.g. to base your decision upon its state. For that use the `app` service, access the desired context and aggregate, and call the `read` function.

E.g., if you want to read another invoice from the `issue` command, use the following code:

```javascript
const commands = {
  async issue (invoice, command, { app }) {
    const otherInvoice = await app.accounting.invoice(otherInvoiceId).read();

    // ...
  }
};
```

## Writing log output

To write JSON-formatted log output use the `logger` service. Internally this service uses [flaschenpost](https://github.com/thenativeweb/flaschenpost). For details on how to use flaschenpost see its [documentation](https://github.com/thenativeweb/flaschenpost).

E.g., to log message from within the `issue` command, use the following code:

```javascript
const commands = {
  issue (invoice, command, { logger }) {
    logger.info('Issuing an invoice...');

    // ...
  }
};
```

# Collecting IoT events

If you are building an IoT application, you need to collect events that happen in the real-world, e.g. sensor data. It may feel difficult to map them to commands, since the events have already happened, and hence do not serve well as tasks.

## Defining physical events

In order to handle physical events you need to [define them](../defining-events/) in the same way as you define other events, too. If you need to, you may also update the aggregate state from the events. This allows you to access the data from previously recorded physical events when handling a command.

E.g., when you want to set the `sentAsLetterPost` property of the aggregate state to `true` once an invoice was sent as letter post, use the following code:

```javascript
const events = {
  sentAsLetterPost (invoice, event) {
    invoice.setState({
      sentAsLetterPost: true
    });
  };
};
```

## Recording physical events

To record physical events register a generic event-recording command such as `recordEvent` and use the `handle.physicalEvents` middleware from the [wolkenkit-command-tools](https://github.com/thenativeweb/wolkenkit-command-tools) module.

E.g., if you want to collect the information that an invoice was sent as letter post, use the following code:

```javascript
const formats = require('formats'),
      { handle, only } = require('wolkenkit-command-tools');

// ...

const commands = {
  recordEvent: [
    only.ifExists(),
    handle.physicalEvents({
      sentAsLetterPost: {
        recipient: formats.string({ minLength: 1 })
      }
    })
  ]
};
```

# Configuring authorization

In any decent application you do not want everybody to run any command or receive any event. Hence use authorization to configure what is granted to whom.

When a user creates an aggregate instance, this user becomes the aggregate's owner. By default, only the owner is allowed to run commands and receive events for a given aggregate instance. To grant this to other users as well, configure authorization for commands and events.

For that, add the command to the `initialState.isAuthorized.commands` property, or add the event to the `initialState.isAuthorized.events` property, and set their authorization options.

To grant access to any authenticated user set the `forAuthenticated` flag to `true`, to grant access to anyone set the `forPublic` flag to `true`. Not providing a flag is equivalent to setting it to `false` explicitly.

E.g., to grant running `issue` commands to authenticated users, and grant retrieving `issued` events to anyone, use the following code:

```javascript
const initialState = {
  isAuthorized: {
    commands: {
      issue: { forAuthenticated: true, forPublic: false }
    },
    events: {
      issued: { forAuthenticated: true, forPublic: true }
    }
  }
};
```

## Granting access from a command

Sometimes you need to grant or revoke access to commands and events at runtime. For that, use the `authorize` function of the aggregate instance within a command. This function requires you to provide the commands and events as well as the access rights that you want to change. To grant access set the appropriate value to `true`, to revoke access set it to `false`.

E.g., if you want to grant access to the `issue` command to anyone, and revoke access from the `issued` event for anyone, use the following code:

```javascript
invoice.authorize({
  commands: {
    issue: { forPublic: true }
  },
  events: {
    issued: { forPublic: false }
  }
});
```

## Transferring ownership from a command

To transfer ownership of a aggregate instance, use the `transferOwnership` function of the aggregate instance within a command. This function requires you to provide the id of the new owner using the `to` property.

E.g., to transfer ownership of an invoice to the user with the id `9d0ad83b-865c-4684-b420-41f630118f1b`, use the following code:

```javascript
invoice.transferOwnership({
  to: '9d0ad83b-865c-4684-b420-41f630118f1b'
});
```

:::hint-warning
> **Only known users**
>
> If you provide an id of a non-existent user, the ownership will be transferred anyway. You will not be able to return to the previous state.
:::

# Creating the read model
# Overview

The read model is responsible for efficiently reading the application state. For that, it transforms events into data structures that are optimized for reading.

## Introducing lists

A *list* is a collection of items, and each item contains *fields*. It is tailor-made for a specific view of the client and hence contains denormalized data, so there is never a need to join data.

Lists handle events that were published by the write model. As a result, they add, update, or remove items. By default, an item can be read by anybody who is allowed to receive the event that caused adding the item initially. You may want to change this by configuring authorization.

From time to time you may need to filter or modify items dynamically while reading them. This is possible using *transformations*.


# Defining lists

To define a list, create a `.js` file with the name of the list within the `server/readModel/lists` directory:

```shell
$ cd <app>
$ touch server/readModel/lists/<list>.js
```

:::hint-tip
> **Shared code**
>
> The `server/readModel/lists` directory must only contain lists. If you want to add a directory or a file that is shared across multiple lists, put it into the `server/shared` folder.
:::

E.g., if you want to define a list called `invoices`, use the following directory structure:

```
<app>
  server
    flows
    readModel
      lists
        invoices.js
    shared
    writeModel
```

:::hint-question
> **Where is the context?**
>
> In contrast to the write model the read model does not use contexts. This is because a read model can handle events from multiple contexts, so it may not be possible to assign a read model to a specific context.
:::

## Structuring the code

Every list uses the same base structure. Hence, you can prepare a list by simply copying and pasting the following template:

```javascript
'use strict';

const fields = {};

const projections = {};

module.exports = { fields, projections };
```

If you need to [define transformations](../defining-transformations/), you also have to add a `transformations` section. Since transformations are optional, you do not need to provide this section if you don't need it:

```javascript
'use strict';

const fields = {};

const projections = {};

const transformations = {};

module.exports = { fields, projections, transformations };
```

# Defining fields

To define the fields of a list add their names to the `fields` object and set their initial state.

E.g., to add the fields `amount` and `recipient` to a list of invoices, use the following code:

```javascript
const fields = {
  amount: { initialState: 0 },
  recipient: { initialState: '' }
};
```

## Speeding up reading lists

For fields that are queried often it may make sense to index them. To do so, add the `fastLookup` property to the field's definition and set it to `true`. Avoid applying this to every field, as this may actually degrade performance.

E.g., to add an index to the `recipient` field of the list of invoices, use the following code:

```javascript
const fields = {
  amount: { initialState: 0 },
  recipient: { initialState: '', fastLookup: true }
};
```

:::hint-tip
> **Fast ids by default**
>
> The `id` field of every list is indexed automatically.
:::

## Marking fields as unique

Optionally, you may mark fields to be unique. For that, add the `isUnique` property and set it to `true`.

:::hint-warning
> **Unique fields require fast lookup**
>
> This only works for fields that are indexed using the `fastLookup` property.
:::

E.g., to mark the `recipient` field of the list of invoices as unique, use the following code:

```javascript
const fields = {
  amount: { initialState: 0 },
  recipient: { initialState: '', fastLookup: true, isUnique: true }
};
```

:::hint-tip
> **Unique ids by default**
>
> The `id` field of every list is marked as unique automatically.
:::

# Defining projections

To handle an event, add the fully-qualified name of the event to the `projections` object and provide a function to handle the event. Like commands, this function takes two parameters, the list itself and the event.

Inside of the function, add code that updates the list according to the event.

E.g., to handle the `issued` event of an invoice, use the following code:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event) {
    // ...
  }
};
```

Some event handlers require asynchronous code. Therefore, you can use the keywords `async` and `await`. To be able do this, define the handler using the `async` keyword:

```javascript
const projections = {
  async 'accounting.invoice.issued' (invoices, event) {
    // ...
  }
};
```

## Adding items

To add an item to a list, call the list's `add` function and provide the item you want to add. You have access to all of the event's data, including its metadata such as the id of the aggregate the event refers to. If you do not provide an `id` explicitly, wolkenkit will automatically use the id of the aggregate the event refers to.

:::hint-tip
> **JSON only**
>
> You may use any JavaScript data type and value that is supported by JSON. This especially means that you are not allowed to use constructor functions here. Rely on object and array literals instead.
:::

E.g., to add an invoice to the list of invoices once an `issued` event is received, use the following code:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event) {
    invoices.add({
      amount: event.data.amount,
      participant: event.data.participant
    });
  }
};
```

## Updating items

To update an item, call the list's `update` function and provide a `where` clause as well as an update expression. Use the `where` clause to specify which items to update, and the update expression to specify how these items will be updated.

E.g., to update an invoice once a `sentAsLetterPost` event is received, use the following code:

```javascript
const projections = {
  'accounting.invoice.sentAsLetterPost' (invoices, event) {
    invoices.update({
      where: { id: event.aggregate.id },
      set: {
        sentAsLetterPost: true
      }
    });
  }
};
```

## Adding or updating items

From time to time it may be necessary to add or update an item, depending on whether it already exists or not. For these cases you may use the `orUpdate` extension of the `add` function, which acts as a combination of `add` and `update`:

```javascript
const projections = {
  'accounting.invoice.sentAsLetterPost' (invoices, event) {
    invoices.add({
      amount: event.data.amount,
      participant: event.data.participant,
      sentAsLetterPost: true
    }).orUpdate({
      where: { id: event.aggregate.id },
      set: {
        sentAsLetterPost: true
      }
    });
  }
};
```

First, this tries to `add` the given item. If adding the item was successful, everything is fine. If adding the item failed, the `orUpdate` part is run. This allows you to ensure that an item you want to update exists beforehand.

## Ensuring that items exist

Sometimes you may want to add an item if it does not exist yet, or do nothing otherwise. For these cases you may use the `orDiscard` extension of the `add` function, which acts as a combination of `add` and do nothing:

```javascript
const projections = {
  'accounting.invoice.sentAsLetterPost' (invoices, event) {
    invoices.add({
      amount: event.data.amount,
      participant: event.data.participant,
      sentAsLetterPost: true
    }).orDiscard();
  }
};
```

This first tries to `add` the item. If it worked, everything is fine. If the item had already existed, no error will be thrown, and nothing will happen.

## Removing items

Finally, to remove an item, call the list's `remove` function and provide a `where` clause to describe one or more items to be removed.

E.g., to remove an invoice from the list of invoices once a `paid` event is received, use the following code:

```javascript
const projections = {
  'accounting.invoice.paid' (invoices, event) {
    invoices.remove({
      where: { id: event.aggregate.id }
    });
  }
};
```

# Defining transformations

When reading items, by default all items are returned as they are. However, sometimes it may be needed to filter or modify items, e.g. to hide items based on the time of the day, or to dynamically add fields that contain calculated values. You can do this using the `filter` and `map` transformations.

To be able to use transformations, make sure that you have added a `transformations` section to your list definition as described in [defining lists](../defining-lists/#structuring-the-code).

## Filtering items

To filter which items are being returned when reading a list, provide a `filter` function in the `transformations` section. This function is then called for each item individually, and you are handed over the item as well as the query that was sent by the client.

The `filter` function has to return a boolean value. If it returns `true`, the appropriate item is included in the result; if it returns `false`, the item is excluded:

```javascript
const transformations = {
  filter (invoices, query) {
    // ...
  }
};
```

The `query` parameter not only allows to access the `where`, `orderBy`, `skip` and `limit` parts of the query, but also provides access to the user that runs the query, and to their token. This way, e.g. you can easily filter items based on specific claims in the user's token:

```javascript
const transformations = {
  filter (invoice, query) {
    if (!query.user.token.roles.includes('accountant')) {
      return false;
    }

    return true;
  }
};
```

## Mapping items

Besides filtering items, you may also want to modify them while reading. This can be reasonable to hide fields that contain sensitive data from specific users, or to dynamically add new fields that contain values that are calculated based on the other fields.

For this, provide a `map` function as part of the `transformations` section. This function is then called for each item individually, and you are handed over the item as well as the query that was sent by the client. The `map` function has to return the modified item (or the original one if you don't want to apply any modifications):

```javascript
const transformations = {
  map (invoice, query) {
    return {
      ...invoice,
      grossValue: invoice.netValue * invoice.salesTax
    };
  }
};
```

As with the `filter` function, the `query` parameter not only allows to access the `where`, `orderBy`, `skip` and `limit` parts of the query, but also provides access to the user that runs the query, and to their token. This way, e.g. you can easily map items based on specific claims in the user's token.

# Writing where clauses

To update or remove all items that match a given criteria, you may have to write more complex queries than simple comparisons for equality. For that, use query operators.

## Using query operators

The following query operators are available that match simple types:

Operator                | Description
------------------------|---------------------------------------------
`$greaterThan`          | Matches fields greater than the given value.
`$greaterThanOrEqualTo` | Matches fields greater than or equal to the given value.
`$lessThan`             | Matches fields less than the given value.
`$lessThanOrEqualTo`    | Matches fields less than or equal to the given value.
`$notEqualTo`           | Matches fields not equal to the given value.

E.g., to remove all invoices that have an amount less than `1000`, use the following code:

```javascript
invoices.remove({
  where: { amount: { $lessThan: 1000 }}
});
```

The following query operators are available that match arrays:

Operator          | Description
------------------|---------------------------------------------
`$contains`       | Matches arrays that contain the given value.
`$doesNotContain` | Matches arrays that do not contain the given value.

E.g., to remove all invoices that are tagged with the `private` tag, use the following code:

```javascript
invoices.remove({
  where: { tags: { $contains: 'private' }}
});
```

## Using logical operators

To combine multiple `where` clauses, use logical operators. The following logical operators are available:

Operator | Description
---------|---------------------------------------------
`$and`   | Matches items that match all conditions.
`$or`    | Matches items that match at least one condition.

E.g., to remove all invoices that have an amount less than `1000` or are tagged with the `private` tag, use the following code:

```javascript
invoices.remove({
  where: {
    $or: [
      { amount: { $lessThan: 1000 }},
      { tags: { $contains: 'private' }}
    ]    
  }
});
```

# Writing update statements

To update complex items, you may have to write more complex update expressions than just providing the new value. For that, use set operators.

## Using arithmetic set operators

The following arithmetic set operators are available:

Operator       | Description
---------------|---------------------------------------------
`$decrementBy` | Decreases the field by the given value.
`$divideBy`    | Divides the field by the given value.
`$incrementBy` | Increments the field by the given value.
`$multiplyBy`  | Multiplies the field by the given value.

E.g., to increase the `printCount` field of an invoice, use the following code:

```javascript
invoices.update({
  where: { id: event.aggregate.id },
  set: { printCount: { $incrementBy: 1 }}
});
```

## Using array set operators

The following array set operators are available:

Operator  | Description
----------|---------------------------------------------
`$add`    | Adds the given value to the array.
`$remove` | Removes the given value from the array.

E.g., to remove the tag `private` from all invoices that contain this tag, use the given code:

```javascript
invoices.update({
  where: { tags: { $contains: 'private' }},
  set: { tags: { $remove: 'private' }}
});
```

# Finding items

From time to time, before adding, updating or removing items, you may need to look up other items first. For this, use the list's `read` function, which returns an array of all items that match the given criteria.

E.g., to find all invoices with an amount less than `1000`, use the following code:

```javascript
const otherInvoices = await invoices.read({
  where: { amount: { $lessThan: 1000 }}
});
```

## Finding single items

To find a single item, use the list's `readOne` function, which returns the item itself.

E.g., to find an invoice by its id, use the following code:

```javascript
const otherInvoice = await invoices.readOne({
  where: { id: '13e86e54-406a-4790-b57b-37f854625215' }
});
```

# Using services

To use services, add `services` as third parameter to your event handler.

E.g., if you want to use services from within the `accounting.invoice.issued` event handler, use the following code:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event, services) {
    // ...
  }
};
```

Since you do not usually need all services at the same time, it will make sense to request only the services you need. To do this, use destructuring to specify the services you need, e.g.:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event, { app }) {
    // ...
  }
};
```

## Reading other lists

Sometimes you need to read another list, e.g. to decide what to update. For that use the `app` service, access the list, and call the `read` or `readOne` function.

E.g., if you want to read another invoice from the `accounting.invoice.issued` event handler, use the following code:

```javascript
const projections = {
  async 'accounting.invoice.issued' (invoices, event, { app }) {
    const otherInvoice = await app.lists.invoices.readOne({
      where: { id: '664745ac-808a-4c16-8420-f43d9deeee04' }
    });

    // ...
  }
};
```

## Writing log output

To write JSON-formatted log output use the `logger` service. Internally this service uses [flaschenpost](https://github.com/thenativeweb/flaschenpost). For details on how to use flaschenpost see its [documentation](https://github.com/thenativeweb/flaschenpost).

E.g., to log messages from within the `accounting.invoice.issued` event handler, use the following code:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event, { logger }) {
    logger.info('Handling an issued invoice...');

    // ...
  }
};
```

# Configuring authorization

When a list handles an event that results in adding a new item, this item inherits the authorization from the event. This ensures that the authorization is consistent across events and lists. Additionally, the user that caused the event becomes the owner of the list item.

E.g., configure the authorization of an invoice in a way that authenticated users can receive `issued` events, but public users can't:

```javascript
const initialState = {
  isAuthorized: {
    commands: {},
    events: {
      issued: { forAuthenticated: true, forPublic: false }
    }
  }
};
```

Now, make the list of invoices handle this event and add a new item:

```javascript
const projections = {
  'accounting.invoice.issued' (invoices, event) {
    invoices.add({
      amount: event.data.amount
    });
  }
};
```

Then, the new item will be readable by authenticated users, but not by public users. Additionally, the user who caused the `issued` event becomes the owner of this list item.

## Granting access at runtime

Sometimes you need to grant or revoke access to a list item at runtime. For that, use the `authorize` function. This function requires you to provide a `where` clause to select the desired items as well as the access rights that you want to change.

To grant access to any authenticated user set the `forAuthenticated` flag to `true`, to grant access to anyone set the `forPublic` flag to `true`. To revoke access use `false` instead. Not providing a flag at all is equivalent to not changing the current configuration.

E.g., to grant read access to all invoices that have an amount less than `1000` to all authenticated users, and revoke access for public users at the same time, use the following code:

```javascript
invoices.authorize({
  where: { amount: { $lessThan: 1000 }},
  forAuthenticated: true,
  forPublic: false
});
```

## Transferring ownership

To transfer ownership of a list item, use its `transferOwnership` function. This function requires you to provide the id of the new owner using the `to` property.

E.g., to transfer ownership of all invoices that have an amount less than `1000` to the user with the id `09ee43c9-5abc-4e9b-acc3-e8b75a3e4b98`, use the following code:

```javascript
invoices.transferOwnership({
  where: { amount: { $lessThan: 1000 }},
  to: '09ee43c9-5abc-4e9b-acc3-e8b75a3e4b98'
});
```

:::hint-warning
> **Only known users**
>
> If you provide an id of a non-existent user, the ownership will be transferred anyway. You will not be able to return to the previous state.
:::

# Creating stateless flows
# Overview

Stateless flows are responsible for implementing simple workflows. For that, they react to events by sending commands or running tasks.

You can compare a *stateless flow* to an *if this then that* rule that handles events. They are typically used to update the application state across multiple aggregates, e.g. to notify a user once an invoice has been issued, supposed that *user* and *invoice* are separate aggregates. You may also use them to interact with third-party applications, e.g. to send a text message or a mail.

# Defining flows

To define a stateless flow, create a `.js` file with the name of the flow within the `server/flows` directory:

```shell
$ cd <app>
$ touch server/flows/<flow>.js
```

:::hint-tip
> **Shared code**
>
> The `server/flows` directory must only contain flows. If you want to add a directory or a file that is shared across multiple flows, put it into the `server/shared` folder.
:::

E.g., if you want to define a flow called `onIssued`, use the following directory structure:

```
<app>
  server
    flows
      onIssued.js
    readModel
    shared
    writeModel
```

## Structuring the code

Every stateless flow uses the same base structure. Hence, you can prepare a flow by simply copying and pasting the following template:

```javascript
'use strict';

const reactions = {};

module.exports = { reactions };
```

# Reacting to events

To handle an event, add the fully-qualified name of the event to the `reactions` object and provide a function to handle the event. This function takes a single parameter, the event.

Inside of the function, add code that reacts to the event.

E.g., to handle the `issued` event of an invoice, use the following code:

```javascript
const reactions = {
  'accounting.invoice.issued' (event) {
    // ...
  }
};
```

Some event handlers require asynchronous code. Therefore, you can use the keywords `async` and `await`. To be able do this, define the handler using the `async` keyword:

```javascript
const reactions = {
  async 'accounting.invoice.issued' (event) {
    // ...
  }
};
```

# Using services

To use services, add `services` as second parameter to your event handler.

E.g., if you want to use services from within the `accounting.invoice.issued` event handler, use the following code:

```javascript
const reactions = {
  'accounting.invoice.issued' (event, services) {
    // ...
  }
};
```

Since you do not usually need all services at the same time, it will make sense to request only the services you need. To do this, use destructuring to specify the services you need, e.g.:

```javascript
const reactions = {
  'accounting.invoice.issued' (event, { app }) {
    // ...
  }
};
```

## Sending commands

Sometimes you may need to send commands to the application from an event handler. For that use the `app` service, access the context and the aggregate, and call the command function.

:::hint-warning
> **No callbacks here**
>
> In contrast to [sending commands when building a client](../../building-a-client/sending-commands/) you can not use the `failed`, `delivered`, `await`, and `timeout` functions here.
:::

E.g., if you want to send a `check` command from the `accounting.invoice.issued` event handler to the invoice that caused the event, use the following code:

```javascript
const reactions = {
  'accounting.invoice.issued' (event, { app }) {
    app.accounting.invoice(event.aggregate.id).check();
  }
};
```

## Writing log output

To write JSON-formatted log output use the `logger` service. Internally this service uses [flaschenpost](https://github.com/thenativeweb/flaschenpost). For details on how to use flaschenpost see its [documentation](https://github.com/thenativeweb/flaschenpost).

E.g., to log messages from within the `accounting.invoice.issued` event handler, use the following code:

```javascript
const reactions = {
  'accounting.invoice.issued' (event, { logger }) {
    logger.info('Handling an issued invoice...');

    // ...
  }
};
```




# Creating stateful flows
# Overview

Stateful flows are responsible for implementing complex workflows that have their own state. For that, they react to events by updating their state and performing transitions.

A *stateful flow* is a state machine whose transitions are caused by events. Whenever a stateful flow transitions, it is able to run a reaction, such as sending commands or running tasks. Using their state they have knowledge of their past. This way you can use them to create complex workflows that include conditions and loops, e.g. to notify a user once an invoice has been rejected for the third time in a row.

# Defining flows

To define a stateful flow, create a `.js` file with the name of the flow within the `server/flows` directory:

```shell
$ cd <app>
$ touch server/flows/<flow>.js
```

:::hint-tip
> **Shared code**
>
> The `server/flows` directory must only contain flows. If you want to add a directory or a file that is shared across multiple flows, put it into the `server/shared` folder.
:::

E.g., if you want to define a flow called `handleInvoice`, use the following directory structure:

```
<app>
  server
    flows
      handleInvoice.js
    readModel
    shared
    writeModel
```

## Structuring the code

Every stateful flow uses the same base structure. Hence, you can prepare a flow by simply copying and pasting the following template:

```javascript
'use strict';

const identity = {};

const initialState = {
  is: 'pristine'
};

const transitions = {};

const reactions = {};

module.exports = { identity, initialState, transitions, reactions };
```

# Identifying flows

Since stateful flows may handle the same type of event multiple times, you need to identify the flow instance based on a unique id. This id will usually be derived from a received event. For that, add a function to the `identity` object that maps the received event to the flow's identity.

If a flow only handles events from a single aggregate instance, its identity is probably just the aggregate id, but in more complex scenarios you need to find a common denominator.

:::hint-warning
> **Provide identity**
>
> You must provide an identity function for each event that is to be handled by a stateful flow, even if the identity is the event's aggregate id.
:::

E.g., to identify a flow based on an order's `submitted` event and an invoice's `issued` event, where the common denominator is the order id shared by both events, use the following code:

```javascript
const identity = {
  'accounting.invoice.issued': event => event.data.orderId,
  'delivery.order.submitted': event => event.aggregate.id
};
```

# Defining the initial state

To define the initial state, assign the desired properties to the `initialState` object.

:::hint-warning
> **JSON only**
>
> You may use any JavaScript data type and value that is supported by JSON. This especially means that you are not allowed to use constructor functions here. Rely on object and array literals instead.
:::

E.g., if you want to add a field of type boolean named `isChecked`, you will end up with the following initial state:

```javascript
const initialState = {
  isChecked: false,
  is: 'pristine'
};
```

The `is` property represents the name of the flow's current state. It will later be changed when the flow [transitions to a new state](../defining-state-transitions/#transitioning-to-a-new-state).

:::hint-warning
> **Required property**
>
> Do not remove the `is` property, since it is required, and therefor reserved.
:::

# Defining state transitions

If a stateful flow receives an event it can transition to a new state, depending on the state it is currently in.

To handle an event, add an object to the `transitions` object using the name of the current state, and then, inside of this object, add the fully-qualified name of the event and provide a function to handle the event. This function takes two parameters: the flow itself and the event.

To read the flow's state, use the `state` property of the flow.

E.g., to handle the `issued` event of an invoice when the flow is in the `pristine` state, use the following code:

```javascript
const transitions = {
  pristine: {
    'accounting.invoice.issued' (flow, event) {
      // ...
    }
  }
};
```

## Setting the state

Inside of the function, add code that sets the state of the flow. For that, use the `setState` function of the flow.

E.g., to set the `isChecked` property of the state to `true` when an invoice's `checked` event is received while being in the `pristine` state, use the following code:

```javascript
const transitions = {
  pristine: {
    'accounting.invoice.checked' (flow, event) {
      flow.setState({
        isChecked: true
      });
    }
  }
};
```

## Transitioning to a new state

To transition a flow from the `pristine` state to a new one, use the flow's `transitionTo` function and provide the name of the new state.

E.g., to transition to the `awaiting-payment` state when an invoice's `checked` event is received while being in the `pristine` state, use the following code:

```javascript
const transitions = {
  pristine: {
    'accounting.invoice.checked' (flow, event) {
      flow.transitionTo('awaiting-payment');
    }
  }
};
```

## Handling errors

If an error happens while handling an event and you don't handle it, the flow transitions automatically to the `failed` state. You can [react to this transition](../reacting-to-state-transitions/) in the same way as you can do with any other transition.

# Reacting to state transitions

If a flow transitions from one state to another, you can run a reaction.

To run a reaction, add an object to the `reactions` object using the name of the current state, and then, inside of this object, a function with the name of the new state. This function takes two parameters, the flow itself and the event.

Inside of the function, add code that reacts to the transition. To read the flow's state, use the `state` property of the flow. If something failed, call the `event.fail` function and provide a reason.

E.g., to run a reaction when a flow transitions from `pristine` to `awaiting-payment`, use the following code:

```javascript
const reactions = {
  pristine: {
    'awaiting-payment' (flow, event) {
      // ...
    }
  }
};
```

Some reactions require asynchronous code. Therefore, you can use the keywords `async` and `await`. To be able to do this, define the reaction using the `async` keyword:

```javascript
const reactions = {
  pristine: {
    async 'awaiting-payment' (flow, event) {
      // ...
    }
  }
};
```

# Using services

To use services, add `services` as third parameter to your reaction.

E.g., if you want to use services when a flow transitions from the `pristine` state to the `awaiting-payment` state, use the following code:

```javascript
const reactions = {
  pristine: {
    'awaiting-payment' (flow, event, services) {
      // ...
    }
  }  
};
```

Since you do not usually need all services at the same time, it will make sense to request only the services you need. To do this, use destructuring to specify the services you need, e.g.:

```javascript
const reactions = {
  pristine: {
    'awaiting-payment' (flow, event, { app }) {
      // ...
    }
  }  
};
```

## Sending commands

Sometimes you may need to send commands to the application from a reaction. For that use the `app` service, access the context and the aggregate, and call the command function.

:::hint-warning
> **No callbacks here**
>
> In contrast to [sending commands when building a client](../../building-a-client/sending-commands/) you can not use the `failed`, `delivered`, `await`, and `timeout` functions here.
:::

E.g., if you want to send an `awaitPayment` command to the invoice that caused a transition from the `pristine` state to the `awaiting-payment` state, use the following code:

```javascript
const reactions = {
  pristine: {
    'awaiting-payment' (flow, event, { app }) {
      app.accounting.invoice(event.aggregate.id).awaitPayment();
    }
  }  
};
```

## Writing log output

To write JSON-formatted log output use the `logger` service. Internally this service uses [flaschenpost](https://github.com/thenativeweb/flaschenpost). For details on how to use flaschenpost see its [documentation](https://github.com/thenativeweb/flaschenpost).

E.g., to log messages when a flow transitions from the `pristine` state to the `awaiting-payment` state, use the following code:

```javascript
const reactions = {
  pristine: {
    'awaiting-payment' (flow, event, { logger }) {
      logger.info('Transitioning from pristine to awaiting payment...');
      // ...
    }
  }  
};
```

# Configuring an application
# Naming an application

To name a wolkenkit application, open the application's `package.json` file and set the `wolkenkit/application` property to the name that you want to use.

:::hint-warning
> **Alphanumeric only**
>
> An application name must only consist of alphanumeric characters. Additionally, it is recommended to only use lowercase characters.
:::

E.g., to set the name to `financialservices`, use the following code:

```json
"wolkenkit": {
  "application": "financialservices"
}
```

:::hint-warning
> **Renaming means data loss**
>
> Never change the name of an application once you are storing data persistently, otherwise you will lose data!
:::

# Pinning the runtime

To run your application in a deterministic way, pin the version of the wolkenkit runtime. For that, open the application's `package.json` file and set the `wolkenkit/runtime/version` property to the version that you want to use.

E.g., to pin the runtime to version <%= current.version %>, use the following code:

```json
"wolkenkit": {
  "runtime": {
    "version": "<%= current.version %>"
  }  
}
```

:::hint-warning
> **Be careful with latest**
>
> You can pin your application to the `latest` runtime, e.g. if you want to evaluate new features that have not yet been officially released. If you do so, please note that unexpected things may happen, and be sure to read [using the latest runtime](../../../guides/using-the-latest-runtime/overview/).
:::

# Setting the port

A wolkenkit application is bound to a port. To define the port, open the application's `package.json` file, navigate to `wolkenkit/environments/default/api`, and set the `port` property to the value that you want to use.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to set the port to `3000`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "port": 3000
      }
    }
  }
}
```

# Allowing client domains

To improve security the API only allows access from well-known domains. This means that you need to configure where to allow access from. Usually, you will want to limit access to a single domain.

For that, open the application's `package.json` file and set the `wolkenkit/environments/default/api/allowAccessFrom` property to the domain name you want to use including the protocol.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to allow access from `http://example.com`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "allowAccessFrom": "https://example.com"
      }
    }      
  }
}
```

## Using multiple protocols

If you want to support `https` and `http`, or multiple subdomains, insteaf of a single domain provide an array of multiple domains.

E.g., to allow access from `https://example.com` and `http://example.com`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "allowAccessFrom": [
          "https://example.com",
          "http://example.com"
        ]
      }
    }
  }
}
```

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

Alternatively, you may use a regular expression that matches multiple domains.

:::hint-warning
> **Escape backslashes**
>
> Since the `package.json` file contains JSON, you need to escape backslashes by typing them twice.
:::

E.g., to allow access from `https://example.com` and `http://example.com` using a regular expression, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "allowAccessFrom": "/^https?:\\/\\/example\\.com$/"
      }
    }
  }
}
```

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

## Allowing access from everywhere

For development purposes, it may be desired to allow access to the API from everywhere. For that, use `*` as domain name:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "allowAccessFrom": "*"
      }
    }
  }
}
```

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

# Using a custom host

If you want to use a custom host for the API, you also have to provide a custom certificate that matches the related host name. To enable that, you have to configure the host name and the certificate in the application's `package.json` file, and you also have to copy the certificate and its private key to your application.

## Copying the certificate and the private key

First, create a `server/keys` directory. To keep things clear, create a dedicated sub-directory for each domain. Then, copy the certificate and the private key into this directory. Use the `.pem` file format and name the files `certificate.pem` and `privateKey.pem` respectively.

E.g., to use a custom certificate for the domain `example.com`, use the following directory structure:

```
<app>
  server
    flows
    keys
      example.com
        certificate.pem
        privateKey.pem
    readModel
    shared
    writeModel
```

## Registering the host name and the certificate

Next, open the application's `package.json` file, navigate to `wolkenkit/environments/default/api/host` and set the `name` and the `certificate` properties to the name of the host and to the path of the directory that contains the private key and the certificate itself. Use an absolute path and consider the application directory as root.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to use the host `example.com` with a matching certificate in the directory `server/keys/example.com`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "host": {
          "name": "example.com",
          "certificate": "/server/keys/example.com"
        }
      }
    }    
  }
}
```

# Enabling authentication

Every wolkenkit application supports authentication of users. For that it relies on an external identity provider that issues [JSON web tokens](https://jwt.io/).

## Adding the certificate

To enable authentication, you need the certificate of one of more identity providers you want to use. To store the certificate create a `server/keys` directory. To keep things clear, it is recommended to create a dedicated sub-directory for each identity provider.

Then, copy the certificate into the appropriate directory. Use the `.pem` file format and name the file `certificate.pem`.

E.g., to use an identity provider that is hosted at `identity.example.com`, use the following directory structure:

```
<app>
  server
    flows
    keys
      identity.example.com
        certificate.pem
    readModel
    shared
    writeModel
```

## Configuring an identity provider

To configure an identity provider, open the application's `package.json` file, navigate to `wolkenkit/environment/default/identityProviders`, and set the `issuer` property to the `iss` value of the identity provider's issued tokens, and the `certificate` property to the path to the certificate directory.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to configure an identity provider that uses `identity.example.com` as its `iss` value and whose certificate is stored in the `server/keys/identity.example.com` directory, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "identityProviders": [
        {
          "issuer": "identityprovider.example.com",
          "certificate": "/server/keys/identityprovider.example.com"
        }
      ]
    }    
  }
}
```

If you provide more than one identity provider, your wolkenkit application will accept tokens created by any of them.

# Assigning a Docker Machine

To bind an application to a specific Docker Machine, open the application's `package.json` file and set the `wolkenkit/environments/default/docker/machine` property to the name of the Docker Machine that you want to use.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to bind an application to a Docker Machine named `dev`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "docker": {
        "machine": "dev"
      }
    }
  }
}
```

:::hint-warning
> **Only works with docker-machine**
>
> You must have docker-machine installed for this feature to work.
:::

# Using environments

If you need to run your application in multiple environments such as staging and production, you can register different configurations for each environment. For that, open the application's `package.json` file and clone the `wolkenkit/environments/default` section. Then, adjust its settings.

E.g., when in addition to the `default` environment you want to have a `production` environment, too, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "api": {
        "port": 3000,
        "allowAccessFrom": "*"
      }
    },
    "production": {
      "api": {
        "host": {
          "name": "example.com",
          "certificate": "/server/keys/example.com"
        },
        "port": 443,
        "allowAccessFrom": "*"
      }
    }
  }  
}
```

# Configuring file storage

In order to store large files, the file storage service must be configured. To improve security file storage only allows access from well-known domains. This means that you need to configure where to allow access from. Usually, you will want to limit access to a single domain. Additionally, you may want to configure who is initially allowed to store files. By default, this is allowed to authenticated users.

To configure where to allow access from, open the application's `package.json` file, navigate to `wolkenkit/environments/default/fileStorage/allowAccessFrom` property, and set it to the value you want to use. The property follows the same rules and syntax as when [allowing client domains](../allowing-client-domains/).

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

You will typically want to limit access to a few specific domains. For development purposes, it may be desired to allow access to the API from everywhere. For that, use `*` as domain name:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "fileStorage": {
        "allowAccessFrom": "*"
      }
    }
  }  
}
```

## Configuring who is allowed to add files

To configure who is allowed to store files, open the application's `package.json` file, navigate to `wolkenkit/environments/default/fileStorage/isAuthorized`, and provide an object that represents your desired configuration.

E.g., to allow storing files for everyone, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "fileStorage": {
        "allowAccessFrom": "*",
        "isAuthorized": {
          "commands": {
            "addFile": { "forAuthenticated": true, "forPublic": true }
          }
        }
      }
    }
  }  
}
```

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

# Setting the Node.js environment

It may be necessary to set the `NODE_ENV` environment variable to make your code work as intended. For that, open the application's `package.json` file and set the `wolkenkit/environments/default/node/environment` property to the value that you want to use.

If you do not specify a value, `development` will be used as default for the `NODE_ENV` environment variable.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to set the `NODE_ENV` environment variable to `production`, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "node": {
        "environment": "production"
      }
    }
  }  
}
```

# Setting environment variables

From time to time, you may want to configure an application at runtime, e.g. to provide credentials depending on the environment. Therefore you can use environment variables. Open the application's `package.json` file and use the `wolkenkit/environments/default/environmentVariables` section.

:::hint-warning
> **Choose the right environment**
>
> If you use an environment different than `default`, make sure that you use the name of the appropriate environment.
:::

E.g., to set environment variables, use the following code:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "environmentVariables": {
        "username": "jane.doe@example.com",
        "password": "secret",
        "isAdministrator": true
      }
    }
  }  
}
```

## Securing environment variables

In some cases you may not want to store certain environment variables in plain text in `package.json`, e.g. when specifying credentials. For these cases you can create another file called `wolkenkit-secrets.json` next to your `package.json` file where you can store the sensitive data. Do not commit this file into your version control system. This way the sensitive data remain secret.

Basically, `wolkenkit-secrets.json` is a normal JSON file in which you can store arbitrary key-value pairs, which can even be nested:

```json
{
  "password": "secret",
  "roles": {
    "isAdministrator": true
  }
}
```

Inside of the `package.json` file you can then reference the appropriate keys using the `secret://` protocol. Provide the key you want to use as path. For nested keys use the `.` character as separator. Please note that you are allowed to mix normal and secret values at will:

```json
"wolkenkit": {
  "environments": {
    "default": {
      "environmentVariables": {
        "username": "jane.doe@example.com",
        "password": "secret://password",
        "isAdministrator": "secret://roles.isAdministrator"
      }
    }
  }  
}
```

## Accessing environment variables

No matter how you defined the environment variables – to access them inside the application, use the `process.env` object:

```javascript
process.env.WOLKENKIT_USERNAME
// => 'jane.doe@example.com'

process.env.WOLKENKIT_PASSWORD
// => 'secret'

process.env.WOLKENKIT_IS_ADMINISTRATOR
// => true
```

:::hint-warning
> **Watch the names**
>
> Note that the environment variables' names get transformed, as they are capitalized and prefixed with `WOLKENKIT_`. Any camel casing is replaced by the `_` character. This way `isAdministrator` becomes `WOLKENKIT_IS_ADMINISTRATOR`.
:::

# Using the CLI
# Controlling the lifecycle

To control the lifecycle of an application use the wolkenkit CLI.

## Starting an application

To start an application run the `start` command from within the application directory:

```shell
$ wolkenkit start
```

If you want to change the port the application binds to, provide the `--port` flag and a port number. This flag takes precedence over the value that is registered in the `package.json` file:

```shell
$ wolkenkit start --port 4000
```

Either way, the CLI downloads and installs the required runtime automatically for you, the first time you start an application may take a few minutes. Every subsequent start will be way faster.

## Restarting an application

From time to time you may need to restart an application, e.g. if you have made changes to its code. To do so run the `reload` command. This command takes care of preserving your data, even if you do not [store your data permanently](../storing-data-permanently/):

```shell
$ wolkenkit reload
```

If you want to restart the entire application, including its infrastructure services, run the `restart` command:

```shell
$ wolkenkit restart
```

:::hint-warning
> **Possible loss of data**
>
> Restarting an application leads to data loss, if you haven't enabled to [store your data permanently](../storing-data-permanently/).
:::

## Stopping an application

To stop an application, run the `stop` command:

```shell
$ wolkenkit stop
```

## Verifying the application status

To verify whether an application is set up correctly, run the `health` command:

```shell
$ wolkenkit health
```

To verify whether an application is running, run the `status` command:

```shell
$ wolkenkit status
```

# Protecting an application

If you run a wolkenkit application this also includes running multiple infrastructure services, such as databases and message queues. To avoid running these services without password protection, the CLI creates a random key and prints it to the terminal when starting an application.

Sometimes you may want to set the key manually. For that, use the `--shared-key` flag when starting the application:

```shell
$ wolkenkit start --shared-key <secret>
```

:::hint-warning
> **Beware of environment variables**
>
> If you use a shared key with special characters, it might contain the `$` sign. Since this character is used by the command line to access environment variables, unexpected things could happen. To avoid this, enclose the shared key in single quotes.
:::

## Storing the shared key

For security reasons, you can't store the shared key in the application's `package.json` file. Anyway, if you don't want to provide it every single time you start the application, set the environment variable `WOLKENKIT_SHARED_KEY` to the key that you want to use:

```shell
$ export WOLKENKIT_SHARED_KEY=<secret>
```

:::hint-warning
> **Parameters over environment variables**
>
> If you provide the `--shared-key` parameter albeit the `WOLKENKIT_SHARED_KEY` variable is set, the command-line parameter takes higher precedence.
:::

# Storing data permanently

By default, any data that have been created by your application will be destroyed once you run `wolkenkit stop`. This is great for development, but not for production. In production, you will want to store data permanently.

To enable permanent data storage, provide the `--persist` flag when starting the application using `wolkenkit start`. Please note that you also have to [set a shared key](../protecting-an-application/). Now all of your application's data will be permanently stored and hence survive a restart of your application:

```shell
$ wolkenkit start --shared-key <secret> --persist
```

:::hint-warning
> **Beware of environment variables**
>
> If you use a shared key with special characters, it might contain the `$` sign. Since this character is used by the command line to access environment variables, unexpected things could happen. To avoid this, enclose the shared key in single quotes.
:::

## Restarting an application

When you restart an application, the CLI takes care of preserving the shared key between restarts. Hence you can simply run:

```shell
$ wolkenkit restart
```

This is *not* true when stopping and then starting your application. In this case you explicitly need to provide the very same shared key again, otherwise you won't be able to access your previously stored data:

```shell
$ wolkenkit stop
$ wolkenkit start --shared-key <secret> --persist
```

## Destroying stored data

In case you need to destroy your stored data, provide the `--dangerously-destroy-data` flag to the `start`, `stop`, or `restart` command:

```shell
$ wolkenkit stop --dangerously-destroy-data
```

# Exporting and importing data

From time to time you may want to export your application's data, e.g. for backup purposes, or to import data into a new application. For these scenarios, the wolkenkit CLI offers the `export` and `import` commands.

## Exporting data

To export data you need to run `wolkenkit export` and provide a directory that you want to export your application's data into. This directory must either be empty or non-existent; if it doesn't exist, it will be created automatically:

```shell
$ wolkenkit export --to <directory>
```

This creates a directory `<directory>/event-store` for the events that have been stored by your application's write model. When the export has finished, you will find one or more files named `events-<number>.json` in this directory (where `number` is a 16-digit number padded with `0`s). Each file contains an array of up to 65536 events.

## Importing data

To import data you need to run `wolkenkit import` and provide a directory that contains the previously exported data you want to import. Please note that the event store of your application must be empty for this to work:

```shell
$ wolkenkit import --from <directory>
```

:::hint-warning
> **Use the right directory**
>
> For the import you have to specify the directory that you specified using the `--to` flag of the export command, *not* the sub-directory `<directory>/event-store` that was created for the events.
:::

Once the import has finished, you need to reload your application by running the following command:

```shell
$ wolkenkit reload
```

# Using environments

By default, all commands use the `default` environment that is specified in the  application's `package.json` file. If you have defined more than one environment you may choose which one to use by providing the `--env` flag.

E.g., if you want to start an application using the `production` environment, run the following command:

```shell
$ wolkenkit start --env production
```

## Storing the environment

Alternatively, you may specify the environment variable `WOLKENKIT_ENV`. This way you don't need to specify `--env` whenever you run a command:

```shell
$ export WOLKENKIT_ENV=production
```

:::hint-warning
> **Parameters over environment variables**
>
> If you provide the `--env` parameter albeit the `WOLKENKIT_ENV` variable is set, the command-line parameter takes higher precedence.
:::

# Building a client
# Connecting to an application

To connect to an application, you need to use the wolkenkit SDK. As it is a universal module, it works in the browser as well as in Node.js.

The wolkenkit SDK has been tested against Chrome <%= current.versions.chrome %>+, Firefox <%= current.versions.firefox %>+, Safari <%= current.versions.safari %>+, Microsoft Edge <%= current.versions.edge %>+, Internet Explorer <%= current.versions.ie %>, and Node.js <%= current.versions.node %>+. Other platforms may work as well, they have just not been tested.

## Installing the SDK

To install the wolkenkit SDK, use npm:

```shell
$ npm install wolkenkit-client@<%= current.versions.clientSdkJs %>
```

:::hint-warning
> **Polyfill old browsers**
>
> Please note that for Internet Explorer 11, you additionally need to install the module [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) to make things work. For details on how to integrate this polyfill into your application, see its [documentation](https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack).
:::

## Using the SDK

To use the SDK, call the require function to load the `wolkenkit-client` module:

```javascript
const wolkenkit = require('wolkenkit-client');
```

### In the browser

While Node.js supports the `require` function out of the box, you have to use a bundler such as [webpack](https://webpack.js.org/) if you want to use the wolkenkit SDK inside an application that runs in the browser. For a simple example of how to set this up see the [wolkenkit-client-template-spa-vanilla-js](https://github.com/thenativeweb/wolkenkit-client-template-spa-vanilla-js) repository.

## Connecting to an application

To connect to a wolkenkit application call the `wolkenkit.connect` function and provide the hostname of the server you want to connect to. Since this is an asynchronous function, you have to call it using the `await` keyword:

```javascript
const app = await wolkenkit.connect({ host: 'local.wolkenkit.io' });
```

### Setting the port

By default, the port `443` is being used. To change this, provide the `port` property as well:

```javascript
const app = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });
```

### Setting the protocol

There are two protocols that the wolkenkit SDK can use to connect to the wolkenkit application:

- `wss` (default in the browser)
- `https` (default on Node.js)

```javascript
const app = await wolkenkit.connect({ host: 'local.wolkenkit.io', protocol: 'wss' });
```

:::hint-warning
> **Browsers are not yet ready for streaming**
>
> While the `wss` protocol makes use of web sockets, the `https` protocol uses streaming HTTP. Unfortunately, not all current browsers support streaming HTTP in a reasonable fashion. Hence, you may safely use `wss` on Node.js, but consider `https` to be experimental in the browser.
:::

# Sending commands

To send a command get a reference to the wolkenkit application, get the context and the aggregate, and call the command function.

E.g., to send an `issue` command for an invoice, use the following code:

```javascript
app.accounting.invoice().issue();
```

If the command takes any parameters, provide them using an options object.

E.g., to send an `issue` command for an invoice and set its amount to `1000`, use the following code:

```javascript
app.accounting.invoice().issue({
  amount: 1000
});
```

:::hint-warning
> **File storage for large documents**
>
> Commands represent a user's request to the system. Although they contain data, they should not contain large documents such as PDFs, images or videos. If you want to store such documents, think about using [file storage](../../storing-large-files/accessing-file-storage/).
:::

## Addressing existing aggregates

If a command addresses an existing aggregate, hand over the aggregate id as a parameter to the aggregate function.

E.g., to send an `issue` command for an existing invoice, use the following code:

```javascript
const invoiceId = // ...

app.accounting.invoice(invoiceId).issue({
  // ...
});
```

## Handling errors

If an error happens you will probably want to handle it. For that add the `failed` function and provide a callback that receives the error and the sent command.

E.g., to handle errors that happen when sending the `issue` command, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}).
  failed((err, command) => {
    // ...
  });
```

## Getting notified on delivery

If you want to get notified once a command has been delivered to the wolkenkit application, add the `delivered` function and provide a callback that takes the sent command.

E.g., to get notified once the `issue` command has been delivered, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}).
  delivered(command => {
    // ...
  });
```

## Awaiting events

If you want to wait for an event caused by a command you just sent, use the `await` function and provide the name of the event you are interested in as well as a callback that takes the event and the sent command.

E.g., to wait for the `issued` event after having sent an `issue` command, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}).
  await('issued', (event, command) => {
    // ...
  });
```

### Awaiting multiple events

If there are multiple events that may happen, add the `await` function multiple times, or provide the event names in an array.

:::hint-warning
> **Await only runs once**
>
> If you specify multiple `await` functions or multiple events as an array, only the first event will cause the `await` function to be run.
:::

E.g., to wait for the `issued` or the `noted` event after having sent an `issue` command, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}).
  await([ 'issued', 'noted' ], (event, command) => {
    // ...
  });
```

## Handling timeouts

If you send a command and await an event, you probably want to limit the time to wait. For that, add the `timeout` function and provide a duration and a callback that takes the command. If you don't provide the timeout function, wolkenkit defaults to 120 seconds.

:::hint-tip
> **Timeout always works**
>
> You can use the `timeout` function whether you specify an `await` function or not.
:::

```javascript
app.accounting.invoice().issue({
  // ...
}).
  await('issued', (event, command) => {
    // ...
  }).
  timeout('30s', command => {
    // ...
  });
```

## Using the chaining API

You can chain all the aforementioned functions. Although not technically necessary, it is highly recommended to put the `failed` function first to ensure that you don't forget it.

E.g., to use the chaining API when sending an `issue` command, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}).
  failed((err, command) => {
    // ...
  }).
  delivered(command => {
    // ...
  }).
  await('issued', (event, command) => {
    // ...
  }).
  timeout('30s', command => {
    // ...
  });
```

## Impersonating commands

From time to time you may need to send commands on behalf of another user. For that, besides the command's payload, use an options object to specify the `asUser` property, and provide the `sub` claim of the user's token.

To use impersonation you need to have the `can-impersonate` claim in your own token set to `true`.

E.g., to send an `issue` command on behalf of another user, use the following code:

```javascript
app.accounting.invoice().issue({
  // ...
}, {
  asUser: '42fd502f-4dda-46e3-b90b-6c841fdd2339'
});
```

# Receiving events

If you want to receive events no matter whether you have sent a command or not, you need to observe them. For that call the `observe` function on the application's `events` property and handle the received events using the `received` function:

```javascript
app.events.observe().
  received((event, cancel) => {
    // ...
  });
```

### Cancelling observation

To cancel observing events call the provided `cancel` function. Unfortunately, this only works once you have received an event.

If you want to cancel even before that, e.g. after a given amount of time, use the `cancel` function of the `started` function. It is called immediately once observing events was started:

```javascript
app.events.observe().
  started(cancel => {
    // ...
  }).
  received((event, cancel) => {
    // ...
  });
```

## Handling errors

If an error happens you will probably want to handle it. For that add the `failed` function and provide a callback that receives the error:

```javascript
app.events.observe().
  failed(err => {
    // ...
  }).
  received((event, cancel) => {
    // ...
  });
```

## Filtering events

From time to time you do not want to receive all events, but only a subset that matches some filter criteria. For that hand over a `where` clause to the `observe` function.

E.g., to only get `issued` events, run the following code:

```javascript
app.events.observe({
  where: { name: 'issued' }
}).
  received((event, cancel) => {
    // ...
  });
```

## Using the chaining API

You can chain all the aforementioned functions. Although not technically necessary, it is highly recommended to put the `failed` function first to ensure that you don't forget it:

```javascript
app.events.observe().
  failed(err => {
    // ...
  }).
  started(cancel => {
    // ...
  }).
  received((event, cancel) => {
    // ...
  });
```

# Reading lists

To read data from a list use the `lists` context and the list name to call its `read` function. Provide a `finished` function to retrieve the list once it has been read.

E.g., to read all invoices, use the following code:

```javascript
app.lists.invoices.read().
  finished(invoices => {
    // ...
  });
```

## Handling errors

If an error happens you will probably want to handle it. For that add the `failed` function and provide a callback that receives the error.

E.g., to handle errors that happen while readong the list of invoices, use the following code:

```javascript
app.lists.invoices.read().
  failed(err => {
    // ...
  }).
  finished(invoices => {
    // ...
  });
```

## Filtering lists

To only receive a subset of a list provide a `where` clause.

E.g., to only get the invoices that were issued before yesterday, use the following code:

```javascript
const yesterday = // ...

app.lists.invoices.read({
  where: { issuedAt: { $lessThan: yesterday }}
}).
  finished(invoices => {
    // ...
  });
```

### Using query operators

You may have to write more complex queries than simple comparisons for equality. For that, use query operators. The following operators are available that match simple types:

Operator                | Description
------------------------|---------------------------------------------
`$greaterThan`          | Matches fields greater than the given value.
`$greaterThanOrEqualTo` | Matches fields greater than or equal to the given value.
`$lessThan`             | Matches fields less than the given value.
`$lessThanOrEqualTo`    | Matches fields less than or equal to the given value.
`$notEqualTo`           | Matches fields not equal to the given value.

E.g., to read all invoices that have an amount less than `1000`, use the following code:

```javascript
app.lists.invoices.read({
  where: { amount: { $lessThan: 1000 }}
}).
  finished(invoices => {
    // ...
  });
```

The following query operators are available that match arrays:

Operator          | Description
------------------|---------------------------------------------
`$contains`       | Matches arrays that contain the given value.
`$doesNotContain` | Matches arrays that do not contain the given value.

E.g., to read all invoices that are tagged with the `private` tag, use the following code:

```javascript
app.lists.invoices.read({
  where: { tags: { $contains: 'private' }}
}).
  finished(invoices => {
    // ...
  });
```

### Using logical operators

To combine multiple `where` clauses, use logical operators. The following operators are available:

Operator | Description
---------|---------------------------------------------
`$and`   | Matches items that match all conditions.
`$or`    | Matches items that match at least one condition.

E.g., to remove all invoices that have an amount less than `1000` or are tagged with the `private` tag, use the following code:

```javascript
app.lists.invoices.read({
  where: {
    $or: [
      { amount: { $lessThan: 1000 }},
      { tags: { $contains: 'private' }}
    ]    
  }
}).
  finished(invoices => {
    // ...
  });
```

## Ordering lists

If you want to order the result, provide an `orderBy` expression and set the sort order to `ascending` or `descending`.

E.g., to get all invoices ordered by their amount, but in descending order, use the following code:

```javascript
app.lists.invoices.read({
  orderBy: { amount: 'descending' }
}).
  finished(invoices => {
    // ...
  });
```

## Browsing lists

Usually, you do not want to read an entire list at once. Instead, you may want to browse the list by reading only a subset. For that, use the `skip` and `take` properties to limit which and how many items to read.

E.g., to only read 10 invoices, starting at the 21st invoice, use the following code:

```javascript
app.lists.invoices.read({
  skip: 20,
  take: 10
}).
  finished(invoices => {
    // ...
  });
```

## Reading single items

If you only want to read a single item from a list, use the `readOne` function. It works in exactly the same way as `read`, except that `where` is mandatory and `orderBy`, `skip` and `take` are not available.

E.g., to read an invoice by its id, use the following code:

```javascript
app.lists.invoices.readOne({
  where: { id: 'bf04c4c4-7b39-4368-a3b6-a98ef445e49d' }
}).
  finished(invoice => {
    // ...
  });
```

## Reading and observing lists

The `read` and `readOne` functions only return a snapshot of a list. While this is enough for many situations, from time to time it may be helpful to retrieve live updates for a list.

For this use `readAndObserve` instead of `read`. Additionally, instead of `finished` you have to provide a `started` and an `updated` function that are called accordingly.

:::hint-tip
> **Same API as read**
>
> You can use `where`, `orderBy`, `skip` and `take` as before. Also the `failed` function works in exactly the same way.
:::

E.g., to read and observe the list of invoices, use the following code:

```javascript
app.lists.invoices.readAndObserve().
  started((invoices, cancel) => {
    // ...
  }).
  updated((invoices, cancel) => {
    // ...
  });
```

# Handling application events

The client application is an [EventEmitter](https://nodejs.org/dist/v<%= current.versions.node %>/docs/api/events.html#events_class_eventemitter) that emits multiple lifecycle events.

## Handling errors

If your client application encounters an error, it emits an `error` event:

```javascript
app.on('error', err => {
  console.error(err);
});
```

## Handling disconnects

From time to time your client application may lose its connection to the wolkenkit application, e.g. because of network issues.

If the connection gets lost the client application will emit a `disconnected` event. Once you receive this event you should stop sending commands, and let the user know that they are currently not able to work.

```javascript
app.on('disconnected', () => {
 // ...
});
```

Whenever the client application establishes a connection to the wolkenkit application again, it emits a `connected` event:

```javascript
app.on('connected', () => {
 // ...
});
```

:::hint-tip
> **Reload on connected**
>
> Even if a connection gets established again, the client application and the wolkenkit application need to be synchronized again. Hence it is recommended to reload the client application. You may use the `connected` event to do this automatically.
>
> ```javascript
> app.on('connected', () => {
>   window.location.reload();
> });
> ```
:::

# Using authentication

If your wolkenkit application is [using authentication](../../configuring-an-application/enabling-authentication/), you must configure your client application accordingly. For that, provide the `authentication` property with an authentication strategy when [connecting to an application](../connecting-to-an-application).

## Using OpenID Connect

Currently, OpenID Connect is the only supported authentication strategy for web clients. Using this authentication strategy, you can integrate your application with various identity services such as [Auth0](https://auth0.com/).

:::hint-warning
> **Browsers only**
>
> Please note that the OpenID Connect authentication strategy is only available in the browser.
:::

To use OpenID Connect, create an instance of the `wolkenkit.authentication.OpenIdConnect` strategy and provide it using the `authentication` property:

```javascript
wolkenkit.connect({
  host: 'local.wolkenkit.io',
  authentication: new wolkenkit.authentication.OpenIdConnect({
    identityProviderUrl: 'https://...',
    clientId: '...'
  })
}).
  then(app => /* ... */).
  catch(err => /* ... */);
```

:::hint-warning
> **Hash-based routing**
>
> If you are using a hash-based router this will conflict with the OpenID Connect protocol. To avoid this make sure to call `wolkenkit.connect` before starting your router.
:::

### Configuring OpenID Connect

If you need to set the redirect URL dynamically, additionally provide a `redirectUrl` property. Please note that this only works if the given redirect URL is configured at your OpenID Connect identity provider.

Using the `scope` property you can get additional profile information on the user:

```javascript
wolkenkit.connect({
  host: 'local.wolkenkit.io',
  authentication: new wolkenkit.authentication.OpenIdConnect({
    identityProviderUrl: 'https://...',
    clientId: '...',
    scope: 'profile'
  })
}).
  then(app => /* ... */).
  catch(err => /* ... */);
```

:::hint-warning
> **Strict mode**
>
> Some identity providers do not follow the OpenID Connect protocol strictly. In order to still being able to support them you may need to set the `strictMode` property to `false`:
>
> ```javascript
> wolkenkit.connect({
>   host: 'local.wolkenkit.io',
>   authentication: new wolkenkit.authentication.OpenIdConnect({
>     identityProviderUrl: 'https://...',
>     clientId: '...',
>     strictMode: false
>   })
> }).
>   then(app => /* ... */).
>   catch(err => /* ... */);
> ```
:::

## Using Local

The Local authentication strategy is currently the only supported authentication strategy for services written in Node.js. Using this authentication strategy, you can issue your own tokens.

:::hint-warning
> **Node.js only**
>
> Please note that the Local authentication strategy is only available in Node.js and primarily meant for testing purposes.
:::

To use Local, create an instance of the `wolkenkit.authentication.Local` strategy and provide it using the `authentication` property. Additionally you must provide an identity provider name and a certificate as well as a private key in `.pem` format:

```javascript
wolkenkit.connect({
  host: 'local.wolkenkit.io',
  authentication: new wolkenkit.authentication.Local({
    identityProviderName: 'https://...',
    certificate: '...',
    privateKey: '...'
  })
}).
  then(app => /* ... */).
  catch(err => /* ... */);
```

## Managing the authentication lifecycle

No matter which authentication strategy you use, the application provides an `auth` property that allows you to manage the authentication lifecycle.

:::hint-tip
> **Protected by default**
>
> Whenever you try to use a wolkenkit application that requires authentication with an unauthenticated user, the wolkenkit SDK automatically takes care of logging in the user.
:::

To find out whether there is a currently logged in user, call the `app.auth.isLoggedIn` function:

```javascript
if (app.auth.isLoggedIn()) {
  // ...
}
```

To login a user manually, call the `app.auth.login` function. How this works in detail depends on the configured authentication strategy. If you are using OpenID Connect, all you need to do is call the function:

```javascript
app.auth.login();
```

:::hint-warning
> **Redirects ahead**
>
> Depending on the authentication strategy calling the `login` and `logout` functions may result in redirects, so ensure to store your application state appropriately if needed.
:::

If you are using the Local authentication strategy, you need to provide the `sub` claim as parameter:

```javascript
app.auth.login('Jane Doe');
```

Additionally, you may specify custom claims that shall be included in the token:

```javascript
app.auth.login('Jane Doe', {
  'https://.../roles': [ 'administrator' ]
});
```

To logout a user, call the `app.auth.logout` function:

```javascript
app.auth.logout();
```

## Accessing the user profile

To get the user profile call the `app.auth.getProfile` function. The profile is then returned as an object that contains claims about the user. If there is no logged in user, the function returns `undefined`:

```javascript
const profile = app.auth.getProfile();
```

Typically, you will find information such as first name, last name, or email in the profile, but its specific content depends on the authentication strategy and the identity provider being used. If in doubt, have a look at the profile object that is being returned.

### Accessing the low-level token

In rare cases you may need to access the raw low-level [JWT token](https://jwt.io/) that is used by the wolkenkit SDK internally to authenticate the user against the wolkenkit application. To retrieve the token call the `app.auth.getToken` function:

```javascript
const token = app.auth.getToken();
```

:::hint-warning
> **Security considerations**
>
> If you access the token, it is being returned in its raw form, i.e. you need to decode it on your own. This may lead to severe security issues, so only do this if you know exactly what you are doing.
:::

# Sending IoT events

If you have set up your application to [collect IoT events](../../creating-the-write-model/collecting-iot-events/) use the appropriate command to send these events. Provide the name of the event that you want to store as well as its data as parameters.

E.g., to send the `sentAsLetterPost` event to an invoice, use the following code:

```javascript
financialservices.accounting.invoice(id).recordEvent({
  name: 'sentAsLetterPost',
  data: {
    // ...
  }
});
```

# Storing large files
# Accessing file storage

wolkenkit contains a service for storing large files. It is designed to allow you to store documents such as PDFs, images and videos so that your commands remain small. This file storage is called *depot*.

To access file storage, you must use different urls depending on whether the access is from the client or from within the wolkenkit application. From the outside you use `https://local.wolkenkit.io:3001` (the exact port depends on your configuration, but it is always `1` higher than the port of the API), from the application you use `http://depot`.

In addition to the ability to store and retrieve files, file storage also provides the ability to authenticate and authorize users. By default, each user is allowed to store files, but you can change who can initially add files by [configuring file storage](../../configuring-an-application/configuring-file-storage/). All further actions can be configured individually by [configuring authorization](../configuring-authorization/) per file.

## Selecting an access mechanism

Basically, there are two different ways to access file storage. For easy access, there is the depot SDK, which is available as a universal module, and therefore works in the browser as well as in Node.js. Alternatively, it is possible to access file storage directly via an HTTP API.

The depot SDK has been tested against Chrome <%= current.versions.chrome %>+ and Node.js <%= current.versions.node %>+. Other platforms may work as well, they have just not been tested.

## Installing the SDK

To install the depot SDK, use npm:

```shell
$ npm install wolkenkit-depot-client@<%= current.versions.depotClientSdkJs %>
```

## Using the depot SDK

To use the SDK, call the require function to load the `wolkenkit-depot-client` module:

```javascript
const DepotClient = require('wolkenkit-depot-client');
```

### In the browser

While Node.js supports the `require` function out of the box, you have to use a bundler such as [webpack](https://webpack.js.org/) if you want to use the depot SDK inside an application that runs in the browser.

## Creating a client

To use file storage, create a new instance of the `DepotClient` class and specify the hostname of the service you want to use:

```javascript
const depotClient = new DepotClient({
  host: 'local.wolkenkit.io'
});
```

### Setting the port

By default, port `443` is used. To change this, set the `port` property to the desired value:

```javascript
const depotClient = new DepotClient({
  host: 'local.wolkenkit.io',
  port: 3001
});
```

### Setting the token

By default, the depot SDK does not use authentication. To authenticate yourself for access as a specific user, specify the JWT token of this user using the `token` property:

```javascript
const depotClient = new DepotClient({
  host: 'local.wolkenkit.io',
  token: '...'
});
```

### Setting the protocol

The depot SDK supports access via `https` and via `http`, whereby `https` is used by default. To change this, set the protocol property to the desired value:

```javascript
const depotClient = new DepotClient({
  host: 'local.wolkenkit.io',
  protocol: 'http'
});
```

:::hint-warning
> **Secure access**
>
> Access via `http` is insecure, so you should always use `https`. The only exception is the internal access from a wolkenkit application, which always takes place via a secure virtual network. Here you have to use `http`, otherwise you will get certificate errors.
:::

## Using the HTTP API

As already mentioned, the depot SDK is nothing but an abstraction layer over a HTTP API. This means that you can also access this API directly if required. The base endpoint for this is `/api/v1`.

To call routes that change data, use `POST` requests. To retrieve data, use `GET` requests. The data to be stored or retrieved is transferred in the request or response body, all metadata is stored in headers. The specific routes and their parameters are described on the respective pages.

To authenticate requests, use the `authorize` header and set the token with the `Bearer` scheme:

```
authorization: Bearer <token>
```

# Adding files

To store a file, call the `addFile` function of the depot SDK and pass the content and the file name as parameters. In Node.js the content can be passed as a stream or a buffer, in the browser it can be an instance of `File` or `Blob`. Either way, the function then returns the ID of the stored file:

```javascript
const content = fs.createReadStream('wolkenkit.png');

const id = await depotClient.addFile({
  content,
  fileName: 'wolkenkit.png'
});
```

In the browser the same example looks like this:

```javascript
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', async () => {
  const content = fileInput.files[0];

  const id = await depotClient.addFile({
    content,
    fileName: 'wolkenkit.png'
  });
});
```

## Setting the ID manually

Sometimes it may be necessary to set the ID manually. Therefore it is possible to pass the optional parameter `id` to the function `addFile`. Please note that the value of the `id` parameter must be a UUID:

```javascript
const id = await depotClient.addFile({
  id: 'f9b14a28-b64e-4c07-893b-3566472100b7',
  content,
  fileName: 'wolkenkit.png'
});
```

## Setting the content type

By default, files are stored with the content type `application/octet-stream`. To change this, set the `contentType` property to the desired value:

```javascript
const id = await depotClient.addFile({
  content,
  contentType: 'image/png',
  fileName: 'wolkenkit.png'
});
```

## Configuring authorization

Individual permissions for various actions can be configured for each file. To do this, you must use the `isAuthorized` property to pass an object that contains the desired permissions. If you only want to configure a few permissions, you can simply specify only selected sections.

If you do not configure permissions at all, the default values shown in the following example are used. They are set so that only the user who originally stored a file has access to it:

```javascript
const id = await depotClient.addFile({
  content,
  fileName: 'wolkenkit.png',
  isAuthorized: {
    commands: {
      removeFile: { forAuthenticated: false, forPublic: false },
      transferOwnership: { forAuthenticated: false, forPublic: false },
      authorize: { forAuthenticated: false, forPublic: false }
    },
    queries: {
      getFile: { forAuthenticated: false, forPublic: false }
    }
  }
});
```

## Using the HTTP API

To add a file using the HTTP API, call the route `POST /api/v1/add-file`.

For the content, use the request body; for the id, the file name and, if necessary, the content type and permissions, set the `x-metadata` header to a stringified JSON object with the following structure:

```json
{
  "id": "4bb37f02-a734-4f7e-85dc-6f239bf1b44d",
  "contentType": "image/png",
  "fileName": "wolkenkit.png",
  "isAuthorized": {
    ...
  }
}
```

To authenticate your request, proceed as described in [accessing file storage](../accessing-file-storage/#using-the-http-api).

If the file was successfully added, you will receive the status code `200`. In case of errors, you will receive one of the following error codes:

- `400 (Bad request)`
- `401 (Unauthorized)`
- `409 (Conflict)`
- `500 (Internal server error)`

# Getting files

To get a file, call the `getFile` function of the depot SDK and pass the file ID as parameter. This returns an object that contains the file and its file name and content type. In Node.js the content is returned as a stream, in the browser it is returned as an instance of `Blob`:

```javascript
const { content, contentType, fileName } = await depotClient.getFile({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});
```

In the browser there are different ways to process the content: For example, you can use the `FileReader` class to read the content or convert it to a data url. For details on how to use this see [Reading files in JavaScript using the File APIs](https://www.html5rocks.com/en/tutorials/file/dndfiles/).

To read the content into an array, use the following code:

```javascript
const { content, fileName, contentType } = await depotClient.getFile({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});

const reader = new FileReader();

reader.addEventListener('loadend', () => {
  // result is an instance of ArrayBuffer.
  console.log(reader.result);
});

reader.readAsArrayBuffer(content);
```

## Using data urls

To convert a file to a data url, use the `asDataUrl` function with the result of the call to the `getFile` function:

```javascript
const file = await depotClient.getFile({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});

const dataUrl = await file.asDataUrl();
```

### Displaying images

You can use a data url, for example, to easily display images (supposed that the file your retrieved actually contains an image):

```javascript
const image = new Image();

image.src = dataUrl;

document.body.appendChild(image);
```

## Using the HTTP API

To get a file using the HTTP API, call the route `GET /api/v1/file/:id` and provide the file ID as part of the path.

To authenticate your request, proceed as described in [accessing file storage](../accessing-file-storage/#using-the-http-api).

If the file was successfully read, you will receive the status code `200` and the file in the response body. The content type is provided in the `content-type` header. The file ID and its file name are sent in the `x-metadata` header as a stringified JSON object with the following structure:

```json
{
  "id": "2a7e9f8f-9bfc-4c19-87b9-274c0e193401",
  "contentType": "image/png",
  "fileName": "wolkenkit.png"
}
```

In case of errors, you will receive one of the following error codes:

- `401 (Unauthorized)`
- `404 (Not found)`
- `500 (Internal server error)`

# Removing files

To remove a file, call the `removeFile` function of the depot SDK and pass the file ID as parameter:

```javascript
await depotClient.removeFile({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});
```

## Using the HTTP API

To remove a file using the HTTP API, call the route `POST /api/v1/remove-file`.

For the file ID, set the `x-metadata` header to a stringified JSON object with the following structure:

```json
{
  "id": "2a7e9f8f-9bfc-4c19-87b9-274c0e193401"
}
```

To authenticate your request, proceed as described in [accessing file storage](../accessing-file-storage/#using-the-http-api).

If the file was successfully removed, you will receive the status code `200`. In case of errors, you will receive one of the following error codes:

- `400 (Bad request)`
- `401 (Unauthorized)`
- `404 (Not found)`
- `500 (Internal server error)`

# Configuring authorization

If you want to configure authorization for a file, there are basically two different approaches: First, you can transfer the ownership of a file; second, you can configure the access permissions for the users who try to access the file.

## Transferring the ownership

To transfer the ownership of a file, call the `transferOwnership` function of the depot SDK and pass the file ID as well as the ID of the new owner as parameters:

```javascript
await depotClient.transferOwnership({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401',
  to: '9d0ad83b-865c-4684-b420-41f630118f1b'
});
```

:::hint-warning
> **Only known users**
>
> If you provide an id of a non-existent user, the ownership will be transferred anyway. You will not be able to return to the previous state.
:::

### Using the HTTP API

To transfer the ownership of a file using the HTTP API, call the route `POST /api/v1/transfer-ownership`.

For the file ID, set the `x-metadata` header to a stringified JSON object with the following structure:

```json
{
  "id": "2a7e9f8f-9bfc-4c19-87b9-274c0e193401"
}
```

For the ID of the new owner, set the `x-to` header to a stringified JSON object with the following structure:

```json
{
  "to": "9d0ad83b-865c-4684-b420-41f630118f1b"
}
```

To authenticate your request, proceed as described in [accessing file storage](../accessing-file-storage/#using-the-http-api).

If the ownership of the file was successfully transferred, you will receive the status code `200`. In case of errors, you will receive one of the following error codes:

- `400 (Bad request)`
- `401 (Unauthorized)`
- `404 (Not found)`
- `500 (Internal server error)`

## Changing authorization

To change the authorization of a file, call the `authorize` function of the depot SDK and pass the file ID as well as an object that contains the desired permissions. If you only want to configure a few permissions, you can simply specify only selected sections:

```javascript
await depotClient.authorize({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401',
  isAuthorized: {
    commands: {
      removeFile: { forAuthenticated: false, forPublic: false },
      transferOwnership: { forAuthenticated: false, forPublic: false },
      authorize: { forAuthenticated: false, forPublic: false }
    },
    queries: {
      getFile: { forAuthenticated: false, forPublic: false }
    }
  }
});
```

### Using the HTTP API

To change the authorization of a file using the HTTP API, call the route `POST /api/v1/authorize`.

For the file ID and the permissions, set the `x-metadata` header to a stringified JSON object with the following structure:

```json
{
  "id": "2a7e9f8f-9bfc-4c19-87b9-274c0e193401",
  "isAuthorized": {
    ...
  }
}
```

To authenticate your request, proceed as described in [accessing file storage](../accessing-file-storage/#using-the-http-api).

If the authorization of the file was successfully changed, you will receive the status code `200`. In case of errors, you will receive one of the following error codes:

- `400 (Bad request)`
- `401 (Unauthorized)`
- `404 (Not found)`
- `500 (Internal server error)`

# Debugging an application
# Attaching a debugger

If your application behaves in an unexpected way, you may want to analyse it using a debugger. For that, you first need to run your application in debug mode, and then attach a debugger to the appropriate process.

## Running an application in debug mode

To run a wolkenkit application in debug mode provide the `--debug` flag on the `wolkenkit start` command:

```shell
$ wolkenkit start --debug
```

:::hint-tip
> **Stay debugging**
>
> If you run `wolkenkit restart` or `wolkenkit reload` while your application is running in debug mode, your application stays in debug mode.
:::

## Debugging an application

When starting, restarting or reloading an application using debug mode, the CLI provides a debug address for each of the application's processes. To debug an application, open Chrome and point it to the appropriate address.

:::hint-warning
> **Highly experimental**
>
> Debugging applications is currently marked as experimental. Your application may freeze or behave in an unexpected way if you attach a debugger.
:::

## Leaving the debug mode

To leave the debug mode you explicitly have to stop your application, and then start it again without the `--debug` flag:

```shell
$ wolkenkit stop
$ wolkenkit start
```

:::hint-warning
> **Only stop ends debugging**
>
> Running `wolkenkit restart` or `wolkenkit reload` is not sufficient to leave debug mode. To actually leave debug mode you explicitly have to stop the application by running `wolkenkit stop`.
:::

# Viewing log messages

If you want to debug a wolkenkit application, you may want to have a look at the log messages of its various processes.

## Getting a snapshot

To get the log messages of an application use the `wolkenkit logs` command of the CLI. This will get a snapshot of the log messages:

```shell
$ wolkenkit logs
```

## Getting live updates

If you are not only interested in a snapshot, but want to follow the log messages in real-time, you need to additionally provide the `--follow` flag:

```shell
$ wolkenkit logs --follow
```

## Formatting log messages

Either way, the log messages are nothing but stringified JSON objects, so they can be somewhat hard to read. To format them install [flaschenpost](https://github.com/thenativeweb/flaschenpost) by running the following command:

```shell
$ npm install -g flaschenpost
```

Then you can pipe the log messages through flaschenpost and view them as nicely formatted output:

```shell
$ wolkenkit logs | flaschenpost-normalize | flaschenpost-uncork
```

# Using Docker

From time to time you may need to have a look at the internal workings of wolkenkit. As wolkenkit is built on Docker it helps to be familiar with it. Anyway, there are a few recurring situations you will probably find yourself in, so it is useful to have the following commands at hand.

## Listing containers

If you need to verify the status of the containers of an application, e.g. to verify whether they are actually running, run:

```shell
$ docker ps
```

## Monitoring containers

If you want to continuously monitor which containers are being started and stopped use one of the following commands, depending on your operating system.

### On macOS

Run the following command:

```shell
$ while :; do clear; docker ps; sleep 1; done
```

### On Linux

Run the following command:

```shell
$ watch -n 1 docker ps
```

## Entering a running container

Sometimes it is useful to be able to enter a running container, e.g. to inspect the files within the container. Depending on which container you want to enter, run one of the following commands:

```shell
# Write model
$ docker exec -it <application>-core sh

# Read model
$ docker exec -it <application>-broker sh

# Flows
$ docker exec -it <application>-flows sh
```

To exit from a container, just type `exit`.

## Freeing disk space

If you are using Docker on a virtual machine, the virtual machine may run out of disk space eventually. To free disk space run the following command:

```shell
$ docker system prune
```

# Data structures
# Commands

When you send a command from the client or from a flow, internally a JSON object is created. To handle commands, or to create them by yourself, you need to understand their internal structure.

If you call the `send` command from your `chat` application…

```javascript
chat.communication.message().send({
  text: 'hey, how are you?'
});
```

…then the following command will be created:

```javascript
{
  // The context of the command.
  context: {
    name: 'communication'
  },

  // The aggregate that receives the command.
  aggregate: {
    name: 'message',

    // Type: uuid
    id: '0b866be9-f83c-4501-a54f-fa3facb582c5'
  },

  // The name of the command.
  name: 'send',

  // A unique value to identify a specific command in a domain. If you use the
  // wolkenkit client SDK, it is auto-generated; otherwise, you need to create
  // it by yourself.
  // (Type: uuid)
  id: '0ff228c1-e9a5-47a6-9b96-a0767082b61e',

  // The data of the command. This contains any values that you have provided
  // when you called the command from the client.
  data: {
    text: 'hey, how are you?',
    // ...
  },

  // The user that called the command; for anonymous users, this is null.
  user: {
    // The id will be set to the subject of the JWT token provided by your
    // identity provider.
    id: 'jane.doe@thenativeweb.io',

    // The token contains all claims about the user.
    token: {
      sub: 'jane.doe@thenativeweb.io',
      // ...
    }
  },

  metadata: {
    // The point in time when the command was called.
    timestamp: 1421260133331,

    // The id of the event that caused this command; if there is no such event,
    // this is equal to the command id.
    // (Type: uuid)
    causationId: '9a5171e5-957f-40f5-aa70-64418839718e',

    // The id of the command that led to this command; if there is no such
    // command, this is equal to the command id.
    // (Type: uuid)
    correlationId: 'c5104249-76cc-4a18-8419-a52cbbdd4b28'
  }
}
```

:::hint-question
> **What is uuid?**
>
> The type `uuid` refers to a UUID in version 4, formatted as a lowercased string, without curly braces, but with dashes. To create such UUIDs by yourself, use the [uuidv4](https://www.npmjs.com/package/uuidv4) module.
:::

# Events

When you publish an event from a write model, internally a JSON object is created. To handle events, you need to understand their internal structure.

If you publish the `sent` event from your `chat` application…

```javascript
message.events.publish('sent', {
  text: command.data.text
});
```

…then the following event will be created:

```javascript
{
  // The context of the event.
  context: {
    name: 'communication'
  },

  // The aggregate that published the event.
  aggregate: {
    name: 'message',

    // Type: uuid
    id: '0b866be9-f83c-4501-a54f-fa3facb582c5'
  },

  // The name of the event.
  name: 'send',

  // A unique value to identify a specific event in a domain.
  // (Type: uuid)
  id: '4c99d051-a526-4526-9cca-34f92a6c8c9d',

  // The type of the event, depending on its source.
  // Values: [ 'domain', 'readModel' ]
  type: 'domain',

  // The data of the event. This contains any values that you have provided when
  // you published the event.
  data: {
    text: 'hey, how are you?',
    // ...
  },

  // The user that caused this event; for anonymous users, this is null.
  user: {
    // The id will be set to the subject of the command's JWT token provided by
    // your identity provider.
    id: 'jane.doe@thenativeweb.io'
  },

  metadata: {
    // The point in time when the event was published.
    timestamp: 1421260133331,

    // The id of the command that caused this event.
    // (Type: uuid)
    causationId: '0ff228c1-e9a5-47a6-9b96-a0767082b61e',

    // The id of the command that led to this event.
    // (Type: uuid)
    correlationId: '0ff228c1-e9a5-47a6-9b96-a0767082b61e',

    isAuthorized: {
      // The id of the user that owns the aggregate instance that published
      // this event.
      owner: 'jane.doe@thenativeweb.io',

      // Set to true, if authenticated users are allowed to receive this event;
      // otherwise false.
      forAuthenticated: true,

      // Set to true, if public users are allowed to receive this event;
      // otherwise false.
      forPublic: false
    }
  }
}
```

:::hint-question
> **What is uuid?**
>
> The type `uuid` refers to a UUID in version 4, formatted as a lowercased string, without curly braces, but with dashes. To create such UUIDs by yourself, use the [uuidv4](https://www.npmjs.com/package/uuidv4) module.
:::


# Blog posts

When getting started with wolkenkit, you may be interested in the thoughts and experiences of other people. That's why we created a curated list of blog posts that deal with wolkenkit, DDD, event-sourcing and CQRS.

- Auth0
  - [Building real-time web applications using wolkenkit](https://auth0.com/blog/building-real-time-web-applications-using-wolkenkit/)
- Intuity
  - [wolkenkit - the JavaScript backend designed to bridge the gap between domain and technology](https://www.intuity.de/wolkenkit-the-javascript-backend-designed-to-bridge-the-gap-between-domain-and-technology/)
  - [Boards in the clouds, part 1: Introduction](https://www.intuity.de/boards-in-the-clouds-part-1-introduction/)
  - [Boards in the clouds, part 2: Modelling with our team](https://www.intuity.de/boards-in-the-clouds-part-2-modelling-with-our-team/)
  - [Boards in the clouds, part 3: Building the realtime API](https://www.intuity.de/boards-in-the-clouds-part-3-building-the-realtime-api/)
  - [Boards in the clouds, part 4: Building the client](https://www.intuity.de/en/boards-in-the-clouds-part-4-building-the-client/)
  - [Boards in the clouds, part 5: Conclusion & source code](https://www.intuity.de/boards-in-the-clouds-part-5-conclusion-source-code/)
  - [wolkenkit: Working together to create a connected world](https://www.intuity.de/en/wolkenkit-die-vernetzte-welt-collaborativ-entwickeln/)
- RisingStack
  - [Event sourcing vs CRUD](https://community.risingstack.com/event-sourcing-vs-crud/)
  - [When to use CQRS?!](https://community.risingstack.com/when-to-use-cqrs/)
- the native web
  - [DDD & co., part 1: What's wrong with CRUD](https://www.thenativeweb.io/blog/2017-10-25-09-46-ddd-and-co-part-1-whats-wrong-with-crud/)
  - [DDD & co., part 2: Semantics over CRUD](https://www.thenativeweb.io/blog/2017-11-01-11-13-ddd-and-co-part-2-semantics-over-crud/)
  - [DDD & co., part 3: Commands and events](https://www.thenativeweb.io/blog/2017-11-16-09-46-ddd-and-co-part-3-commands-and-events/)
  - [DDD & co., part 4: Aggregates](https://www.thenativeweb.io/blog/2017-11-20-10-02-ddd-and-co-part-4-aggregates/)
  - [DDD & co., part 5: Event sourcing](https://www.thenativeweb.io/blog/2017-11-27-15-17-ddd-and-co-part-5-event-sourcing/)
  - [DDD & co., part 6: From model to code](https://www.thenativeweb.io/blog/2017-12-07-15-33-ddd-and-co-part-6-from-model-to-code/)
  - [DDD & co., part 7: CQRS](https://www.thenativeweb.io/blog/2017-12-14-14-17-ddd-and-co-part-7-cqrs/)
  - [DDD & co., part 8: Eventual consistency](https://www.thenativeweb.io/blog/2018-01-11-16-23-ddd-and-co-part-8-eventual-consistency/)
  - [DDD & co., part 9: Coding the read model](https://www.thenativeweb.io/blog/2018-01-18-15-47-ddd-and-co-part-9-coding-the-read-model/)
  - [DDD & co., part 10: Hello, wolkenkit](https://www.thenativeweb.io/blog/2018-01-23-16-17-ddd-and-co-part-10-hello-wolkenkit/)

# Videos

When getting started with wolkenkit, you may be interested in talks of meetups and conferences. That's why we created a curated list of videos that deal with wolkenkit, DDD, event-sourcing and CQRS.

- International JavaScript conference
  - [DDD, event-sourcing and CQRS – theory and practice](https://www.youtube.com/watch?v=rolfJR9ERxo)
- Munich Node.js user group
  - [Domain-driven design](https://www.youtube.com/watch?v=B5uoLWZv0AA)
  - [wolkenkit](https://www.youtube.com/watch?v=yAnzic2yGaQ)

# sample applications
### wolkenkit-boards

wolkenkit-boards is a team collaboration application.

The idea was to have an electronic blackboard on which every employee can spontaneously post thoughts and ideas, which can then be discussed together at a later date. The application supports public and private blackboards to which you can attach notes and pictures.

## Links

- [GitHub](https://github.com/thenativeweb/wolkenkit-boards)

### wolkenkit-geocaching

wolkenkit-geocaching is a geocaching application.

The idea was to manage caches, starting from creating and hiding the caches to finding them, making it easier for geocaching teams to organize themselves. The application uses the Google Maps API to display the caches on a map.

## Links

- [GitHub](https://github.com/revrng/wolkenkit-geocaching)

### wolkenkit-nevercompletedgame

wolkenkit-nevercompletedgame is a mystery game.

The idea was to create a simple but challenging mystery game in which the player has to find the solution to a riddle in each level, inspired by [nevercompletedgame.com](https://www.nevercompletedgame.com/). The application displays a high score to all players to indicate how far the most advanced player has come yet.

## Links

- [GitHub](https://github.com/thenativeweb/wolkenkit-nevercompletedgame)

### wolkenkit-template-chat

wolkenkit-template-chat is a simple messaging application.

The idea was to implement a messaging platform similar to [Slack](https://slack.com/), with the functionality limited to the essentials, i.e. sending and rating messages. The application is used as one of the templates available for newly initialized projects with wolkenkit.

## Links

- [GitHub](https://github.com/thenativeweb/wolkenkit-template-chat)

### wolkenkit-todomvc

wolkenkit-todomvc is a todo list application.

The idea was to implement the well known [TodoMVC](http://todomvc.com/) application based on wolkenkit to enable comparison with other frameworks. The application allows you to manage todos such as noting them, ticking them off or discarding them.

## Links

- [GitHub](https://github.com/thenativeweb/wolkenkit-todomvc)
