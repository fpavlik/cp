module.exports = {
  apps : [{
    name: 'mts',
    script: './bin/www',
    instances: 1,
    watch: true, 
    max_memory_restart: '1G',
    instance_var: 'INSTANCE_ID',
    env: {
      "PORT":3001,
      "NODE_ENV": "development",
      "MYSQLDBUSER":"fp",
      "MYSQLDBPASSWORD":"1Popover",
      "MYSQLDBHOST":"localhost",
      "MYSQLDBPORT":3306,
      "MYSQLDBNAME":"peopleX",
      "SALT" : "CfJdRDe233336IkWl4"
    },
    env_production: {
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
