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

async function saveResultFn(myPost){
    const dbResultPost = await db.query("INSERT INTO EATBURGER(name) values(?)",[myPost.name]);
    // const dbResultGet = await db.query("SELECT EATBURGER.name FROM EATBURGER");
    return dbResultPost;
}

async function burgerDbFunc(id){
    // console.log(burgername.name);
    const myListDb = await db.query("SELECT name FROM eatburger WHERE id = ?", [id]);
    // console.log(`[loadUser] thumbsupSql:`, myListDb);
    return myListDb;
}

async function getBurgerFunc(){
    // console.log(burgername.name);
    const getBurgerName = await db.query("SELECT * FROM eatburger");
    // console.log(`[loadUser] getBurgerName:`, getBurgerName);
    return getBurgerName;
};

module.exports = {
    saveResultFn,
    getBurgerFunc,
    burgerDbFunc
    
}