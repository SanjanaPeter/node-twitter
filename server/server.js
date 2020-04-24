import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import body_parser from 'body-parser';
import routes from './src/routes';
import database from './src/database/database';

const PORT = process.env.PORT || 4000;
const app = express();

mongoose.connect(database.uri, database.options, function(err, result){
    if(err){
        console.log("Error in connecting the database!!!", err);
    }
    else{
        console.log("Successfully connected with the database!!");
    }
})       // Database connection

app.use(cors());                                       // Include functionality to handle Cross domain requests
app.use(body_parser.json());                           // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true }));   // support encoded bodies
app.use(routes);

app.listen(PORT, () => {
    console.log(`Connecting to PORT: ${PORT}`);
})