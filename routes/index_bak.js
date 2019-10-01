// routes/index.js

module.exports = function(app)

{

    const sql = require('mssql');

    

    var config = {

        user: 'ttm_friver',
    
        password: 'frivertkdydwk',
    
        server: '121.129.55.141',
    
        database: 'tsweb'
        

//    options: {

//                encrypt: true // Use this if you're on Windows Azure 

//            }

    };

    

    sql.connect(config).then(pool => {
 

        // GET ALL USERS

        app.get('/api/v1/alive', function(req, res){
            
            
            return pool.request()
            
           
            .query('select top 10 * from ttm_member')
                
            .then(result => {

                res.json(result.recordset);

                res.end();

            });

            

        });


        // GET SINGLE USERS BY USER_ID

        app.get('/api/v1/products/:mstCode', function(req, res){

           return pool.request()

            .input('input_parameter', sql.Int, req.params.user_id)

            .query('select * from ttm_member where cust_id = @input_parameter')

            .then(result => {

                res.json(result.recordset);

                res.end();

            });

            

        });

        

        // GET SINGLE USERS ID BY NAME

        app.get('/api/v1/products/:childCode/info', function(req, res){

           return pool.request()

            .input('input_parameter', req.params.name)

            .query('select * from ttm_member where cust_nm_kor = @input_parameter')

            .then(result => {

                res.json(result.recordset);

                res.end();

            });

            

        });

        

        // CREATE USERS

        app.post('/api/users', function(req, res){

            return pool.request()

            .input('input_parameter', req.body.name) // json body에서 name 항목을 찾아서 할당

            .query('INSERT INTO ttm_member (Name) VALUES (@input_parameter)')

            .then(result => {

                res.json(result.recordset);

                res.end();

            });

        });

                

        // UPDATE THE USERS

        app.put('/api/users/:user_id', function(req, res){

           return pool.request()

            .input('input_parameter_user_id', sql.Int, req.params.user_id)

            .input('input_parameter_name', req.body.name)

            .query('UPDATE ttm_member SET cust_nm_kor = @input_parameter_name WHERE cust_id = @input_parameter_user_id')

            .then(result => {

                res.json(result.recordset);

                res.end();

            });

        });

        // DELETE USERS

        app.delete('/api/users/:user_id', function(req, res){

            return pool.request()

            .input('input_parameter', sql.Int, req.params.user_id)

            .query('DELETE FROM MemberInfo WHERE MemberID = @input_parameter')

            .then(result => {

                res.json(result.recordset);

                res.end();

            });

        });

    });

}