const express = require('express');
const router = express.Router();
const RescueTeamData = require('../db/model/RescueTeamData');

router.get('/',async (req,res)=>{

  try{
      const data = await RescueTeamData.find();
      res.status(200).json(data);
  }catch(error){
    res.status(500).json(error.message);

  };


    
})

router.get('/count', async (req, res) => {
  try {
  
    const hospitalCount = await RescueTeamData.count();
    console.log("hospital Count : " +  hospitalCount);
    res.status(200).json({ count: hospitalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
    try {
      console.log('frontend connected');
      
      const newData = await RescueTeamData({

        RescueTeamName: req.body.name,
        RescueTeamEmail: req.body.email,
        RescueTeamphoneNumber: req.body.phoneNumber,
        RescueTeamLocation : req.body.location,


      });
  
      
      const savedData = await newData.save();
      res.status(201).json(savedData); 
      console.log(savedData)
  
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  });



module.exports = router;