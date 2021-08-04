const express = require('express');
const app = new express();
const db = require('./src/db');

const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views','./src/views');

app.get('/',(req,res)=>{
    const rows =[]
    res.render("index",{
        rows,
        
    });
})

//display all movies
app.get('/getAll',(req,res)=>{
    var sql = 'SELECT * FROM MOVIES';
    var params = [];
    db.all(sql,params,(err,rows)=>{
        if(err){
            console.log(err.message);
        }
        res.render("index",{
            rows,
            

        })
    })
})

//add data
app.post('/adddata',(req,res)=>{    
    var sql = 'INSERT into MOVIES (Movie_Name,Lead_Actor,Lead_Actress,Director,Year_of_Release) VALUES (?,?,?,?,?)'
    var params= [req.body.mname,req.body.actorName,req.body.actressName,req.body.dname,req.body.year];
    db.run(sql,params,(err,result)=>{
        if(err){
            res.status(400).send('Error');
            return;
        }
        res.redirect('/');
    })
    // res.redirect('/')
});

//Result based on params
app.post('/getData',(req,res)=>{
    // console.log(req.body);
    if(req.body.category == 'Lead Actor'){
        var sql = 'SELECT * FROM MOVIES WHERE UPPER(Lead_Actor) = UPPER(?)';
    }
    else if(req.body.category == 'Lead Actress'){
        var sql = 'SELECT * FROM MOVIES WHERE UPPER(Lead_Actress) = UPPER(?)';
    }
    else if(req.body.category == 'Director'){
        var sql = 'SELECT * FROM MOVIES WHERE UPPER(Director) = UPPER(?)';
    }
    else if(req.body.category == 'year'){
        var sql = 'SELECT * FROM MOVIES WHERE Year_of_Release = ?';
    }
    else{
        res.status(400).send()
    }
    var params = [req.body.val];
    db.all(sql,params,(err,rows)=>{

        if(err){
            console.log(err.message);
            res.status(400).send();
        }
        // console.log(rows);
        res.render("index",{
            rows
        });
    })
})



app.listen(port,()=>{console.log('Server running at port: '+port)});