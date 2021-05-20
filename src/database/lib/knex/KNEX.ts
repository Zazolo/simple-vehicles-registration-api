import knex, { Knex } from "knex";

class KNEXDatabase{

    /**KNEX ativo */
    public knex:Knex

    constructor(){
        console.log("Applying KNEX configuration");
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