import mongoose from "mongoose"

const homeSchema=new mongoose.Schema({
    image1:{
        type:String,
         required:true
      },
      image2:{
        type:String,
         required:true
      },
      image3:{
        type:String,
         required:true
      },
       
      image4:{
        type:String,
         required:true
      }, 
      image5:{
        type:String,
        
      },
      image6:{
        type:String,
         required:true
      },
       
      image7:{
        type:String,
         required:true
      }, 
      image8:{
        type:String,
        
      },
      image9:{
        type:String,
         required:true
      },
       
      image10:{
        type:String,
         required:true
      }, 
     
})


export const Home = mongoose.model('Home',homeSchema)
