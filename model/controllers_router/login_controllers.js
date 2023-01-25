import {conn} from '../data_base/db.js';
export const get_login_user = (req, res) => {
    res.send('login,path.join(__dirname,login)');
};