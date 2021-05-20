// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data.sqlite3'
    },
    useNullAsDefault: true,
    migrations:{
      directory:'./src/database/lib/knex/migrations'
    },
    seeds:{
      directory:'./src/database/lib/knex/seeds'
    },
    
  },

  

};
