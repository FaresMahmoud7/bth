import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "./db";
import AdminUser from "../models/AdminUser";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      displayName?: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    username: string;
    role: string;
    displayName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    displayName?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();

        // Strict single admin enforcement - get any existing admin
        let admin = await AdminUser.findOne({});

        if (!admin) {
          const hashedPassword = await bcrypt.hash("BthAdmain2026@", 12);
          admin = await AdminUser.create({
            username: "BTHadmin2026",
            password: hashedPassword,
            role: "admin",
            displayName: "مدير النظام"
          });
        } else if (admin.username !== "BTHadmin2026") {
          const hashedPassword = await bcrypt.hash("BthAdmain2026@", 12);
          admin.username = "BTHadmin2026";
          admin.password = hashedPassword;
          await admin.save();
        }

        if (credentials.username !== admin.username) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: admin._id.toString(),
          name: admin.displayName || "Admin",
          username: admin.username,
          role: admin.role,
          displayName: admin.displayName
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours for security
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.displayName = user.displayName;
      }
      // Handle session update
      if (trigger === "update" && session?.name) {
        token.name = session.name;
        token.displayName = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.displayName = token.displayName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
