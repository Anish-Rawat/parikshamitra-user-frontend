'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.accessToken) {
      const fetchClasses = async () => {
        try {
          // redux provider ogic will here 
        } catch (err) {
          console.error('Error:', err);
        }
      };

      fetchClasses();
    }
  }, [dispatch, session?.user?.accessToken]);

  return <>{children}</>; // ✅ return children so it wraps layout/pages properly
};

export default ReduxProvider;
