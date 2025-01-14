import Head from 'next/head';
import Image from 'next/image';
import CountryList from '../components/CountryList';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/initSupabase';
import Login from '../components/Login';
import Profile from '../components/Profile';


export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(async () => {
    await supabase.auth.getSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <main>{!session ? <Login /> : <Profile session={session} />}</main>;
}
