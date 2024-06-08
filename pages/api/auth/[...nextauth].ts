import { db, dbUsers } from '@/database';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
	}
}

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers

	providers: [
		// ...add more providers here

		Credentials({
			name: 'Custom Login',
			credentials: {
				Email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
				Password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
			},

			async authorize(credentials) {
				db.connect().catch((error) => {
					error: 'Connection Failed...!';
				});
				const user = await dbUsers.checkUserEmailPassword(
					credentials!.Email,
					credentials!.Password,
				);
				if (user) {
					return { ...user, id: user._id };
				}

				return null;
			},
		}),
	],

	//custom page

	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},

	session: {
		maxAge: 259200, //30d
		strategy: 'jwt',
		updateAge: 86400, //cada dia
	},

	//callback
	//callback para guardar la data de la seccion entre otras cosas

	callbacks: {
		async jwt({ token, account, user }) {
			
			// console.log({token,account,user})

			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			({ session, token, user });

			session.accessToken = token.accessToken as any;
			session.user = token.user as any;

			return session;
		},
	}, // end callback
};

export default NextAuth(authOptions);
