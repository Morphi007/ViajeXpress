export interface IUser {
	_id: string;
	Email: string;
	Password: string;
	Firstname: string;
	Lastname: string;
	Address: string;
	Sector: string;
	role: 'admin' | 'client' | 'super-user';
	forgotPasswordToken?: string;
	forgotPasswordTokenExpiry?: Date;
	verifyToken?: string;
	verifyTokenExpiry?: Date;
	createdAt: Date;
	updatedAt: Date;
}
