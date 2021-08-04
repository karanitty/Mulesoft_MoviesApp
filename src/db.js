var sqlite3 = require('sqlite3').verbose();
// var md5 = require('md5');

const DB_SOURCE = "db.sqlite";

let db = new sqlite3.Database(DB_SOURCE,(err)=>{
    if(err){
        console.log(err.message);
        throw err;
    }
    else{
        console.log('SQLite db Connected');
        db.run("CREATE TABLE MOVIES (Movie_Name TEXT, Lead_Actor TEXT, Lead_Actress TEXT, Director TEXT, Year_of_Release INTEGER)",
        (err)=>{
            if(err){
                console.log(err.message);
            }
        });
    }
});

module.exports = db;