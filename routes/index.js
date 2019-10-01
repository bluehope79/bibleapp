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
 
        // 모상품 조회 
        app.get('/api/v1/products', function(req, res, err){
            
                return pool.request()
            
                .input('ASHOP_SITE_CD', 'TOUR2000') 
                .execute('WSP_PARTNERS_NAVER_PACK_GOODS;2') 
                
                .then(result => {
                    res.json(res.json(result.recordset););

                    res.end();

                });

        });

         // 자상품 조회 
        
        app.get('/api/v1/products/:mstCode', function(req, res, err){
            console.log(req.param.id); //url 파라미터 
            const id = parseInt(req.params.id, 10);

            return pool.request()
        
            .input('ASHOP_SITE_CD', 'TOUR2000') 
            .input('GOOD_TYPE_CD', '1') 
            .input('AREA_CD', '50') 
            .input('GOOD_YY', '2019') 
            .input('GOOD_SEQ', '1') 
            .execute('WSP_PARTNERS_NAVER_PACK_GOODS;3')  //행사리스트 
            
            .then(result => {
                res.json(result.recordset);
                res.end();

            });

        });

        //단일 자상품 정보 조회
        app.get('/api/v1/products/:childCode/info', function(req, res){

                return pool.request()
            
                .input('ASHOP_SITE_CD', 'TOUR2000') 
                .input('EV_YM', '191002') 
                .input('EV_SEQ', '500') 
                .execute('WSP_PARTNERS_NAVER_PACK_GOODS;6') 
                
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