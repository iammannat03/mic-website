"use client";

import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders(); // getProviders() returns an object of providers which can be used to sign in and sign up
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="w-full flex-between bg-blue-300 py-3 my-5 px-16">
      <Link href="/">
        <div className="p-2 bg-pink-200">MIC</div>
      </Link>
      <div>
        <Link href="/hackathons">hackathons</Link>
      </div>
      <div>
        <Link href="/recruitment">recruitment</Link>
      </div>
      <div>
        <Link href="/blah">blah</Link>
      </div>

      {/* conditional */}
      <div className="">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="py-2 px-4 bg-purple-500 text-white"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
