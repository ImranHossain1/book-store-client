import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { auth } from './Firebase/firebase';
import { useAppDispatch } from './redux/hook';
import { setLoading, setUser } from './redux/features/users/userSlice';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const dispatch = useAppDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
      }

      // Once the authentication state has been determined, set authInitialized to true.
      setAuthInitialized(true);
      dispatch(setLoading(false));
    });

    return () => {
      // Make sure to unsubscribe from the auth state observer when the component unmounts.
      unsubscribe();
    };
  }, [dispatch]);

  // While Firebase is initializing the auth state, display a loading indicator.
  if (!authInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <MainLayout></MainLayout>
      <Toaster />
    </div>
  );
}
