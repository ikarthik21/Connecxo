import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SignInF, userIdF } from '@utils/apis/authApi';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const res = await userIdF(session.user.email);
                if (res?.user?.id) {
                    session.user.id = res.user.id;
                }
            } catch (error) {
                console.log(error);
            }                
            return session;
        },
        async signIn({ profile }) {
            
            try {
                const res = await SignInF(profile.email);
                if (res.status !== true) {
                    return false;
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }


});

export { handler as GET, handler as POST };



