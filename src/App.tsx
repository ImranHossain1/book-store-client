import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { auth } from './Firebase/firebase';
import { useAppDispatch } from './redux/hook';
import { setLoading, setUser } from './redux/features/users/userSlice';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div>
      <MainLayout></MainLayout>
      <Toaster />
    </div>
  );
}
