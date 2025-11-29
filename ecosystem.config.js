module.exports = {
  apps: [{
    name: 'it-ojt-platform',
    script: './server/server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    watch: false,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=2048',
    // Restart settings
    exp_backoff_restart_delay: 100,
    max_restarts: 10,
    min_uptime: '10s',
    // Auto restart on crash
    autorestart: true,
    // Kill timeout
    kill_timeout: 5000
  }]
};
