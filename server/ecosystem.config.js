module.exports = {
  apps: [
    {
      name: "lavanderos-web",
      script: "server.js",
      cwd: "/home/lavanderos/htdocs/lavanderosjanitorial.ca/server",
      instances: 1,
      autorestart: true,
      max_memory_restart: "150M",
      env: { NODE_ENV: "production" }
    }
  ]
};
