
import { Arduino } from "../models/arduino.model.js"
 import {asyncHandler} from "../utils/asyncHandler.js"
import { Respberry } from "../models/resberipy.model.js"
import { Esp } from "../models/esp.model.js"
import {uploadCloudinary}  from "../utils/cloudinary.js"
 import { Home } from "../models/home.model.js"

const homeImages=asyncHandler(async(req,res)=>{
 
        let image1=  await uploadCloudinary(req.files.image1[0].path)
        let image2 =await uploadCloudinary(req.files.image2[0].path)
        let image3=  await uploadCloudinary(req.files.image3[0].path)
        let image4 = await uploadCloudinary(req.files.image4[0].path)
        let image5=  await uploadCloudinary(req.files.image5[0].path)
        let image6 = await uploadCloudinary(req.files.image6[0].path)
        let image7=  await uploadCloudinary(req.files.image7[0].path)
        let image8 = await uploadCloudinary(req.files.image8[0].path)
        let image9=  await uploadCloudinary(req.files.image9[0].path)
        let image10=  await uploadCloudinary(req.files.image10[0].path)
        if(!(image1 && image2))
          {
            console.log('file is not uploaded')
          }
     let setHomeImages =   await Home.create({
                  image1:image1.url,
                  image2:image2.url,
                  image3:image3.url, 
                  image4:image4.url,
                  image5:image5.url,
                  image6:image6.url,
                  image7:image7.url,
                  image8:image8.url,
                  image9:image9.url,
                  image10:image10.url
        })
        return res.status(201).send(setHomeImages)
})
const getHomeImages = asyncHandler(async (req, res) => {
  try {
    // Fetch data from Arduino collection
    const arduinodata = await Arduino.aggregate([
      {
        $project: {
          _id: 0,
          ExperimentName: 1,
          ExperimentId: 1,
          image1: 1,
          poster: 1,
          plot: 1
        }
      }
    ]);

    // Fetch data from Home collection
    const homedata = await Home.find()
     

    // Check if data was fetched
    if (!homedata) {
      console.log('Home data not fetched');
      return res.status(404).json({ message: 'No home data found' });
    }

    // Return the data
    return res.status(200).json({ arduinodata, homedata });

  } catch (error) {
    // Handle errors and return a server error response
    console.error('Error fetching images:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

  const datasave=asyncHandler(async(req,res)=>{
   const { ExperimentId,ExperimentName,
    
     madeBy,madeByinfo,overview,overviewinfo, HC,working,
      pinDiagramInfo,
      pinDiagramInfo2,
    
        CircuitDiagramInfo,code ,
     result
     
    
    }=req.body
   
   if(
    [ExperimentName,madeby,overview,overviewinfo,HC,working,pinDiagramInfo,pinDiagramInfo2].some((field)=>field.trim()=='')

   )
    {
     console.log('all filed required')
    }
     if(!req.files.image1[0].path)
      {
      console.log('file not in a server')
      }
   let image1= await uploadCloudinary(req.files.image1[0].path)
     let  image2=await uploadCloudinary(req.files.image2[0].path)
   let image3=await uploadCloudinary(req.files.image3[0].path)
   let image4=await uploadCloudinary(req.files.image4[0].path)
   let image5=await uploadCloudinary(req.files.image5[0].path)
   let image6=await uploadCloudinary(req.files.image6[0].path)
 
    if(!(image1 && image2))
      {
        console.log('file not uploaded')
      }
   
   
   

  
  
    
   let dataInsert= await Arduino.create({
     ExperimentId,
     ExperimentName,
     
     madeBy,
     madeByinfo,
     overview,
     overviewinfo,
    HC,
    working,
     pinDiagramInfo,   
     pinDiagramInfo2,   
     CircuitDiagramInfo,
     
      
     
     code,
     result,
     image1:image1.url,
     image2:image2.url,
     image3:image3.url,
     image4:image4.url,
     image5:image5.url,
     image6:image6.url,
            
   
    
    })
 
  return res.status(201).send(dataInsert)
  })

  

 const datasave2=asyncHandler(async(req,res)=>{
  const { ExperimentId,ExperimentName,
     madeBy,madeByinfo,overview,overviewinfo,Material,Material1,Material2,Material3,Material4, 
     pinDiagramInfo,CircuitDiagramInfo,step1,step2,step3,step4,step5,step6,step7,code,result}=req.body
     if(
      [ExperimentName,madeby,madeByinfo,overview,overviewinfo,pinDiagramInfo,CircuitDiagramInfo,step1,step2,step3].some((field)=>field.trim()=='')
  
     )
      {
       console.log('all filed required')
      }
       
      if(!req.files.image1[0].path)
        {
        console.log('file not in a server')
        }
  let image1= await uploadCloudinary(req.files.image1[0].path)
    let  image2=await uploadCloudinary(req.files.image2[0].path)
    let image3= await uploadCloudinary(req.files.image3[0].path)
    let  image4=await uploadCloudinary(req.files.image4[0].path)
    let image5= await uploadCloudinary(req.files.image5[0].path)

    if(!(image1 && image2))
      {
        console.log('file not uploaded')
      }


 
 
   
  let dataInsert= await Respberry.create({
    ExperimentId,
    ExperimentName,
    madeBy,
    madeByinfo,
    overview,
    overviewinfo,
    Material,
    Material1,
    Material2,
    Material3,
    Material4,
    pinDiagramInfo,   
    CircuitDiagramInfo,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    code,
    result,
    image1:image1.url,
    image2:image2.url,
    image3:image3.url,
    image4:image4.url,
    image5:image5.url
  
   
   })

 return res.status(200).send(dataInsert)
 })
 const getRes=asyncHandler(async(req,res)=>{
   let ExperimentId= req.query.exId
   if(!ExperimentId)
    {
      console.log('Experiment not available')
    }
  let data= await  Respberry.findOne({
    ExperimentId
  }) 
   if(!data)
    {
      console.log('data not found')
    }
    return res.status(200).json(data)
})
 

const EspData = asyncHandler(async(req,res)=>{
  
  const { ExperimentId,ExperimentName,
   overview,step1,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,
   step12,step13,step14,step15,step16,step17,step18,pinDiagramInfo,CircuitDiagramInfo,code,
   component,
   result,
   
   
   }=req.body
  
   if(
    [ExperimentName,overview,pinDiagramInfo,CircuitDiagramInfo,step1,step2,step3,component,code].some((field)=>field.trim()=='')

   )
    {
     console.log('all filed required')
    }

    if(!(req.files.iamge1[0].path && req.files.image2[0].path))
      {
           console.log('file not a server')
      }
  let image1= await uploadCloudinary(req.files.image1[0].path)
    let  image2=await uploadCloudinary(req.files.image2[0].path)
  let image3=await uploadCloudinary(req.files.image3[0].path)
  let image4=await uploadCloudinary(req.files.image4[0].path)

 if(!(image1 && image2))
  {
    console.log('file not uploaded ')
  }


 
 
   
  let espData= await Esp.create({
    ExperimentId,
    ExperimentName,
   overview,
   component,
   pinDiagramInfo,
   CircuitDiagramInfo,
   step1,
   step2,
   step3,
   step4,
   step5,
   step6,
   step7,
   step8,
   step9,
   step10,
   step11,
   step12,
   step13,
   step14,
   step15,
   step16,
   step17,
   step18,
  
   code,
   result,
   image1:image1.url,
   image2:image2.url,
   image3:image3.url,
   image4:image4.url
   
   })

 return res.status(202).send(espData)
 })
 const getEspData=asyncHandler(async(req,res)=>{
     
  let ExperimentId=req.query.exId
 if(!ExperimentId)
  {
   console.log('esp data not fecthed')
  }
 let exOne= await Esp.findOne({
    ExperimentId
  })
  return res.json(exOne)
})

const oneObject =asyncHandler(async(req,res)=>{
let ExperimentId=req.query.exId

 if(!ExperimentId)
  {
    console.log('Experiment not available')
  }
 let exOne= await Arduino.findOne({
    ExperimentId
  })
  return res.status(200).json(exOne)
})
const searchArduinoData = asyncHandler(async (req, res) => {
  let { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    let agg = [
      {
        $search: {
          index: 'default', // Add the name of your Atlas Search index if required
          autocomplete: {
            query: search,
            path: 'ExperimentName',
            fuzzy: {
              maxEdits: 2
            }
          }
        }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          ExperimentName: 1,
          ExperimentId: 1,
          image1: 1,
          poster: 1,
          plot: 1
        }
      }
    ];

    let response1 = await Respberry.aggregate(agg);
      
    
    return res.status(200).json(response1);
  } catch (error) {
    console.error('Error performing search:', error);
    return res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

const oneObject1 =asyncHandler(async(req,res)=>{
  
  
   let exOne= await Arduino.find( )
   if(!exOne)
    {
      console.log("arduino data not feched")
    }
    return res.json(exOne)
  })
 let homeData=asyncHandler(async(req,res)=>{
   let allHomedata= await Home.find()
   if(!allHomedata)
    {
    throw console.log('error')
    }

    return res.status(200).json(allHomedata)
 })
export{oneObject1,datasave,getRes,datasave2,homeImages,getHomeImages,EspData,getEspData,oneObject,searchArduinoData,homeData}