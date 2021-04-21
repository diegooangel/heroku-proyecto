
const model = require('../models/users.model');
const scripts = [
  { script: '/javascripts/users.js' }
];

const getSingleUser = async(req, res, next) => {
  try {
    
    const { id } = req.params;
    console.log('capaz es aca')
    const result = await model.getSingleUser(id);
    const users = await model.getAllUsers();
    
    if(result && result.length > 0) {

      res.render('eliminar', { user: result[0], users, scripts });
    } else {
      res.render('error');
    }


  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}


module.exports = {
    
    getSingleUser
    
}
