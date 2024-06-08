import { IUser } from '@/interfaces';
import mongoose, { Model, Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Email: {
            type: String,
            required: [true, 'Please provide a email'],
            unique: true,
            match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Email is invalid'],
        },
        Password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        },

        Firstname: {
            type: String,
            required: [true, 'por favor ingrese su primer nombre'],
        },
        Lastname: {
            type: String,
            required: [true, 'por favor ingrese su apellido'],
        },
        Address: {
            type: String,
            required: [true, 'Please provide a Address'],
        },
        Sector: {
            type: String,
            required: [true, 'Please provide a Sector'],
        },
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    { timestamps: true },
);

const User: Model<IUser> = mongoose.models.users || model('users', userSchema);

export default User;