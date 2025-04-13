import express from 'express';


export const api = ()=>{


    const app = express();
    const PORT = 8000;


    app.get('/', (req,res)=>{
        res.send("It is working")
    })

    app.listen(PORT, ()=>{
        console.log('Its ruuning')
    })


}

