const UserController = require ('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/api/cookietest', authenticate, UserController.cookieTester); // Update Pages
    app.get('/api/allusers', UserController.findAll); // Map Page
    app.post('/api/register', UserController.register); // Registration Page
    app.post('/api/login', UserController.login); // Login Page
    app.get('/api/logout', UserController.logout); // Logout Action Route
    app.get('/api/user/profile', authenticate, UserController.getOne); // Profile and Update Pages
    app.put('/api/user/update', authenticate, UserController.update); // Update Pages
    app.delete('/api/user/delete', authenticate, UserController.deleteUser); // Profile Page
}