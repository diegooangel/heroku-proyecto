
const model = require('../models/users.model');
const scripts = [
  { script: '/javascripts/users.js' }
];
const Signin = require('../models/validar.model');
const mailer = require('./../utils/mailer');


const getUsers = async (req, res, next) => {
    try {
      
      const users = await model.getAllUsers();
      if(users && users.length > 0 ) {
        res.render('users', { title: 'Users', users, scripts });
      } else {
        res.status(404).render('error');
      }
  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      
    }
}

const getSingleUser = async(req, res, next) => {
  try {
    
    const { id } = req.params;
    const result = await model.getSingleUser(id);
    const users = await model.getAllUsers();
    
    if(result && result.length > 0) {
      res.render('update', { user: result[0], users, scripts });
    } else {
      res.render('error');
    }


  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
const deleteUser = async(req, res, next) => {
  try {
    
    const { email, password } = req.body;
    const user = new Signin(email, password);
    
    const resultado = await user.login();
    
    console.log(resultado);

    if (resultado && resultado.length > 0) {
        const { id } = req.params; 

        
        // Buscarlo en la base de datos y eliminarlo.
        const result = await model.deleteUser(id);
        
        if(result > 0) {
        console.log(result);
        const users = await model.getAllUsers();

        res.json({ id });

        } else {
        res.render('error');
        }
    } else {
        res.render('error')
    }

  } catch (error) {
      res.sendStatus(500);
    }
  }
  

const updateUser = async(req, res, next) => {
  try {
    
    const { email, password } = req.body;
    const user = new Signin(email, password);
    
    const result = await user.login();
    
    if (result && result.length > 0) {
      const { id } = req.params;
      const { email, password, date } = req.body;
      const userUpdated = {
        email,
        password,
        date 
    }
      const resultado = await model.updateUser(id, userUpdated);
      if(resultado) {

        const users = await model.getAllUsers();

        res.render('users');

      } else {
        res.render('users');
      }
    
    } else {
      res.render('error');
    }
    
    
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const sendComment = async(req, res, next) => {
  try {
      
      const { email, date } = req.body;
      const emailToSend = { email, date };

      const info = await mailer.comments(emailToSend);
      
       if (info) {
          // Obtengo del obj req.body los varoles que envian por POST
          const { email, password, date } = req.body;
          const result = await model.insertUser({ email, password, date });
          const users = await model.getAllUsers();
          res.render('users', { users, date, scripts, message: `Reserva para la fecha ${date}`});
       } else {
         res.render('error');
       }  
      
      
        
      
      
        
      

          
      

  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}


module.exports = {
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    sendComment

}
