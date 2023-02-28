import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Header: FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <div className="col-span-12 h-[3.75rem] bg-green-400 px-4 flex items-center justify-between">
      <div className="flex gap-2">
        <div>
          <Link href="/" legacyBehavior>
            <a className="mr-2" data-active={isActive('/')}>
              Feed
            </a>
          </Link>
          {session && (
            <Link href="/drafts" legacyBehavior>
              <a data-active={isActive('/drafts')}>My drafts</a>
            </Link>
          )}
        </div>
      </div>
      <div>
        {session ? (
          <div className="right">
            <p>
              {session?.user?.name} ({session?.user?.email})
            </p>
            <Link href="/create" legacyBehavior>
              <button className="mr-2">
                <a>New post</a>
              </button>
            </Link>
            <button onClick={() => signOut()}>
              <a>Log out</a>
            </button>
          </div>
        ) : (
          <Link href="/api/auth/signin" legacyBehavior>
            <a data-active={isActive('/signup')}>Log in</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
