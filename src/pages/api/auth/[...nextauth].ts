import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    })
    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD
    //     }
    //   },
    //   from: process.env.SMTP_FROM
    // })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET
};

// import { NextApiHandler } from 'next';
// import { NextAuthOptions } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import NextAuth from 'next-auth/next';
// import prisma from '../../../lib/prisma';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GIHUB_SECRET || ''
//     })
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
//   session: {
//     strategy: 'database',
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//     updateAge: 60 * 60 * 24 // 24 hours
//   },
//   useSecureCookies: process.env.NODE_ENV === 'production',
//   callbacks: {
//     async redirect({ baseUrl }) {
//       return baseUrl;
//     },
//     async session({ session, user }) {
//       if (session?.user) session.user.id = user.id;
//       return session;
//     }
//   }
// };

// export default NextAuth(authOptions);
