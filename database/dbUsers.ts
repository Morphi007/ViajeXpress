import { db } from './';
import bcrypt from 'bcryptjs';
import { User } from '@/model';



export const checkUserEmailPassword = async( Email: string, Password: string ) => {

    await db.connect();
    const user = await User.findOne({ Email }).lean();
    await db.disconnect();

    if ( !user ) {
        return null;
    }

    if ( !bcrypt.compareSync( Password, user.Password! ) ) {
        return null;
    } 


    const { role, Firstname, _id } = user;

    return {
        _id,
        Email: Email.toLocaleLowerCase(),
        role,
        Firstname,
    }
}
