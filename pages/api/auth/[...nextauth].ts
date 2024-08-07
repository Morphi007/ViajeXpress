import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import { compare } from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
		try {
		  const client = await clientPromise;
		  const db = client.db('ViajeXpress');

		  const email = credentials?.email?.toLowerCase();
	  
		  // Busca el usuario en la base de datos
		  const user = await db.collection('Users').findOne({ Email: email });
		  console.log(user);
		  
	  
		  // Verifica la contraseña
		  if (user && credentials?.password) {
			console.log('Verificando contraseña');
			const isPasswordValid = await compare(credentials.password, user.Password);
			if (isPasswordValid) {
			  return {
				id: user._id.toString(),
				email: user.Email,
				role: user.role,
				Firstname: user.Firstname,
				Lastname: user.Lastname,
			  };
			}
		  }
		  
		  return null;
		} catch (error) {
		  console.error('Error en la autorización:', error);
		  return null;
		}
	  }
    }),
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 días en segundos
  },

  callbacks: {
	async jwt({ token, user }: { token: any, user: any }) {
	  if (user) {
		token.id = user.id;
		token.email = user.email;
		token.role = user.role;
		token.Firstname = user.Firstname;
		token.Lastname = user.Lastname;
	  }
	  return token;
	},
  
	async session({ session, token }: { session: any, token: any }) {
		let name = token.Firstname + ' ' + token.Lastname;
	  session.user = {
		id: token.id as string,
		email: token.email as string,
		role: token.role as string,
		name: name as string, // Renombra `Firstname` a `name`
	  };
	  return session;
	},
  }
  
};

export default NextAuth(authOptions);
