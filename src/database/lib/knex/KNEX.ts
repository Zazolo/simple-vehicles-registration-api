import knex, { Knex } from "knex";
class KNEXDatabase{

    public knex:Knex;

    constructor(){
        this.knex = knex(
            {
                client: 'sqlite3',
                connection: {
                    filename: './data.sqlite3'
                },
                useNullAsDefault: true
            }
        );
    }
}

export default new KNEXDatabase().knex;