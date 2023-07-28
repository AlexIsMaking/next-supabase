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
    const { data, error } = await supabase.auth.getSession()
    console.log("data:", data);
    //setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <main>{!session ? <Login /> : <Profile session={session} />}</main>;
}
