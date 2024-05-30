import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

/**
 * Handles the authentication logic using NextAuth.
 * @param {object} options - The options for NextAuth.
 * @returns {object} - The NextAuth handler.
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Retrieves the session user from the database and adds the user ID to the session.
     * @param {object} session - The session object.
     * @returns {object} - The updated session object.
     */
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error("Error fetching session user: ", error);
        return session;
      }
    },
    /**
     * Handles the sign-in logic, checks if the user already exists, and creates a new user if not.
     * @param {object} profile - The user profile object.
     * @returns {boolean} - True if the sign-in is successful, false otherwise.
     */
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists && profile.email.endsWith("@vitstudent.ac.in")) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        } else if (!profile.email.endsWith("@vitstudent.ac.in")) {
          console.log("Email id should end with @vitstudent.ac.in");
          return false;
        }

        return true;
      } catch (error) {
        console.log("Error during sign-in: ", error.message);
        return false;
      }
    },
  },
});

// this line is required to make the handler work. here GET and POST mean that the handler will work for both GET and POST requests
export { handler as GET, handler as POST };
