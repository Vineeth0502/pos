const express = require('express');
const router = express.Router();
const database = require('../database'); // Import your database module

router.get('/', async (req, res) => {
    try {
      const mattresses = await database.getMattresses();
      res.render('main', { mattresses });
    } catch (error) {
      console.error('Error fetching mattresses:', error);
      res.status(500).send('Internal Server Error');
    }
  });  

  router.get('/:mattressId', async (req, res) => {
    try {
      // Fetch the mattress details based on the provided ID
      const mattressId = req.params.mattressId;
      const mattressDetails = await database.getMattressById(mattressId);
      console.log('Mattress Details:', mattressDetails);

      // Render the mattress details page with the fetched details
      res.render('mattressDetails', { mattressDetails });
    } catch (error) {
      console.error('Error fetching mattress details:', error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router;
