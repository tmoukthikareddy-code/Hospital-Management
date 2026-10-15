const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const db = mysql.createConnection({host:"localhost",user:"root",password:"moukthika",database:"hospital"}); // Change password if your MySQL root password differs

db.connect(err=>{if(err){console.error("MySQL connection failed:",err.message);process.exit(1)}console.log("Connected to hospital database")});
const columns="patient_id, name, email, phone_no, gender, age, problem";
app.get("/patients",(req,res)=>db.query(`SELECT ${columns} FROM patients ORDER BY patient_id DESC`,(e,r)=>e?res.status(500).send(e.message):res.json(r)));
app.get("/patients/:id",(req,res)=>db.query(`SELECT ${columns} FROM patients WHERE patient_id=?`,[req.params.id],(e,r)=>e?res.status(500).json({error:e.message}):res.json(r)));
app.post("/patients",(req,res)=>{const {patient_id,name,email,phone_no,gender,age,problem}=req.body;if(!patient_id||!name?.trim()||!email?.trim()||!phone_no?.trim()||!gender||age===""||age===undefined||!problem?.trim())return res.status(400).send("Please fill all fields.");db.query("INSERT INTO patients (patient_id,name,email,phone_no,gender,age,problem) VALUES (?,?,?,?,?,?,?)",[patient_id,name.trim(),email.trim(),phone_no.trim(),gender,Number(age),problem.trim()],e=>e?res.status(500).send(e.message):res.send("Patient added successfully."))});
app.put("/patients/:id",(req,res)=>{const {name,email,phone_no,gender,age,problem}=req.body;if(!name?.trim()||!email?.trim()||!phone_no?.trim()||!gender||age===""||age===undefined||!problem?.trim())return res.status(400).send("Please fill all fields.");db.query("UPDATE patients SET name=?,email=?,phone_no=?,gender=?,age=?,problem=? WHERE patient_id=?",[name.trim(),email.trim(),phone_no.trim(),gender,Number(age),problem.trim(),req.params.id],(e,r)=>e?res.status(500).send(e.message):!r.affectedRows?res.status(404).send("Patient not found."):res.send("Patient updated successfully."))});
app.delete("/patients/:id",(req,res)=>db.query("DELETE FROM patients WHERE patient_id=?",[req.params.id],(e,r)=>e?res.status(500).send(e.message):!r.affectedRows?res.status(404).send("Patient not found."):res.send("Patient deleted successfully.")));
app.listen(3000,()=>console.log("CarePoint Hospital running at http://localhost:3000"));
