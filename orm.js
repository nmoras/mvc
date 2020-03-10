const mysql = require( 'mysql' );


class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }
// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "burger"
});

async function saveResult(myPost){
    const dbResult = await db.query(
        "INSERT INTO eatburger(name) values(?)",[myPost.name]);
        return dbResult;
}

async function displayResult(id){
    const myListDb = await db.query("SELECT name FROM eatburger WHERE id = ?", [id]
    );
    return myListDb;
}