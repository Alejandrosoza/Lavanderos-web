module.exports = {
  apps: [
    {
      name: "lavanderos-api",
      script: "server.js",
      cwd: "/var/www/lavanderos-web/server",
      instances: 1,
      autorestart: true,
      max_memory_restart: "150M",
      env: { NODE_ENV: "production" }
    }
  ]
};
