const express = require("express")

require("dotenv").config()

const employeeRoutes = require("./routes/employeeRoutes")

const app = express()

const PORT = process.env.PORT || 5000


app.use(express.json())

app.use("/api/employees",employeeRoutes)

app.get("/",(req,res) => {
    res.json({
        message : "Employee API is now Running"
    })
})

app.listen(PORT,() =>{
    console.log(`Server is now running on port ${PORT}`)
})


 