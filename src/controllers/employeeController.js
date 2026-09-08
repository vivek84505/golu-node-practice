const pool = require("../db/database")



const getEmployees = async (req , res) => {
    
    
    try{

        const result = await pool.query(
            `select *
                from
                public.employee_one
                order by
                employee_id`
        )
        
        console.log("API Result======>",result)
        

        res.status(200).json(result.rows)
 

    }
    catch(error){

        console.log("Error ===========>",error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }


}

const getEmployeesById = async(req, res) => {

    const {id} = req.params;
    
    try{

        const result = await pool.query(
            `SELECT * 
             FROM public.employee_one
             where employee_id = $1 ` ,
             [id]
        )

        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Employee Not Found"
            });
        }

        res.status(200).json(result.rows[0])
        
    }
    catch(error){
        console.log('error========>',error)

        res.status(500).json({
            message:"Internal Server Error"
        })

    }
}



const createEmployee = async (req , res) => {

   

    try {

        const {
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            designation,
            department,
            date_of_joining,
            salary} = req.body;

            const result = await pool.query(
                `INSERT INTO public.employee_one
                (  employee_code,
                    first_name,
                    last_name,
                    email,
                    phone,
                    designation,
                    department,
                    date_of_joining,
                    salary)
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                    RETURNING *`,
                    [
                        employee_code,
                        first_name,
                        last_name,
                        email,
                        phone,
                        designation,
                        department,
                        date_of_joining,
                        salary
                    ]

            )


              res.status(201).json(result.rows[0])

    }
    catch(error){
        
        console.log('Error========>',error)
        res.status(500).json({
            message:"Failed to create employee"
        })
    }
}    


module.exports = {
    getEmployees,
    getEmployeesById,
    createEmployee 
}