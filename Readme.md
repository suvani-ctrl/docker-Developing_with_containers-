Docker Networking

Docker uses networking to allow containers (which are like isolated environments) to communicate with each other and the outside world. By default, Docker provides several networking options to control how containers connect and interact.
1. Docker’s Default Networking (Bridge Network)

When you create a container without specifying a network, Docker automatically places it in a default network called the bridge network. Containers in the bridge network can communicate with each other using their container name (like a hostname) because they are in the same network.
2. Docker Network and Communication

Imagine you have Container A and Container B running on the same Docker host, and both are part of the same Docker network. Here's how they can communicate:

    Container-to-Container Communication: If both containers are in the same Docker network, Container A can directly communicate with Container B by using the name of Container B. This is because Docker automatically creates an internal DNS server for the network, and the containers can resolve each other's names within that network.

    For example, if Container A wants to send a request to Container B, it can use the following URL in its code:

http://containerB:PORT

Here, containerB is the name of the container, and PORT is the port on which Container B is listening for requests.

Example:

    Let's say you have an Express.js server running inside Container B, and it’s listening on port 3000.
    Container A wants to send an HTTP request to Container B.
    Container A doesn’t need to know the IP address or use localhost, but simply can use:

        http://containerB:3000

        Docker will handle the internal networking, ensuring the request reaches Container B.

3. Communication Outside the Docker Network

Now, let's talk about how containers communicate with the outside world.

    Host-to-Container Communication: If you want to access a container’s service (e.g., a web app running inside a container) from outside Docker (like from your host machine), you need to map the container's internal port to a port on your host machine using the -p or --publish flag when running the container.

    For example, you can run a container with the following command:

docker run -p 8080:3000 my-express-app

Here, Docker maps port 3000 inside the container (where your Express.js app is running) to port 8080 on your host machine. You can then access the app by visiting:

    http://localhost:8080

    Express.js Server:
        If your Express server inside Container B is set to listen on 0.0.0.0, it can accept requests not only from inside the container but also from the outside (via the Docker host).
        However, Container A communicates with Container B using the container name (like containerB) in the internal network.

4. Summary:

    When containers are in the same Docker network, they can use container names to communicate with each other (like http://containerB:3000).
    If you want to access a service running inside a container from outside, you need to expose and map the container’s ports to your host using docker run -p <host-port>:<container-port>.
    For services running in containers that need external access (e.g., a web app), you access them via http://localhost:host-port from outside the container.

Key Points:

    Inside the network: Containers communicate using container names (http://containerB:3000).
    Outside the network: You use localhost and a mapped port (http://localhost:8080).

