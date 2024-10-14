module.exports = {
    apps: [
      {
        name: "task-api",
        script: "./src/index.js", // Path to your server file
        instances: 2,              // Number of instances (2 replicas)
        exec_mode: "cluster",      // Enable cluster mode
        watch: true,               // Watch files for changes (optional)
        max_memory_restart: "1G",  // Restart if memory exceeds 1GB
        env: {
          NODE_ENV: "development",
          PORT: 3000
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 8000
        }
      }
    ]
  };
  