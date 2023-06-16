module.exports = {
    apps: [
        {
            name: "Main API server",
            script: "./index.js",
            instances: "2",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "production",
                PORT: 3030
            }
        },
        {
            name: "Socket server",
            script: "./socket.js",
            instances: "1",
            env: {
                PORT: 3031,
            },

        },
        {
            name: "Worker server 1",
            script: "./index.js",
            instances: "1",
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
                PORT: 3032,
            },

        },
        {
            name: "Worker server 2",
            script: "./index.js",
            instances: "1",
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
                PORT: 3033,
            }
        },
        {
            name: "Worker server 2",
            script: "./index.js",
            instances: "1",
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
                PORT: 3034,
            }
        }
    ]
}

