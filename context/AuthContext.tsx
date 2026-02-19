import { SupabaseBrowser } from "@/lib/SupabaseBrowser";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        SupabaseBrowser.auth.getUser().then(({ data }) => {
            setUser(data.user);
        })
    })

    const signUp = async (email: string, password: string) => {
        const { error } = await SupabaseBrowser.auth.signUp({
            email,
            password
        });
        if(error) alert(error.message);
    }

    const signIn = async (email: string, password: string) => {
        const { error } = await SupabaseBrowser.auth.signInWithPassword({
            email,
            password
        });
        if(error) alert(error.message);
    }

    const signOut = async () => {
        const { error } = await SupabaseBrowser.auth.signOut();
        if(error) alert(error.message);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}