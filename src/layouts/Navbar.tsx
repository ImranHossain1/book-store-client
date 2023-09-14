import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

import logo from '../assets/images/technet-logo.png';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebase';
import { setUser } from '@/redux/features/users/userSlice';
import Cookies from 'js-cookie';
export default function Navbar() {
  const [nav, setNav] = useState(true);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      Cookies.remove('refreshToken');
    });
  };

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">Books</Link>
                </Button>
              </li>

              {!user.email && (
                <>
                  <li className="p-3 hover:text-[#02BBFB]">
                    <Link to="/signIn">Sign In</Link>
                  </li>
                  <li className="p-3 hover:text-[#02BBFB]">
                    <Link to="/signUp">Sign Up</Link>
                  </li>
                </>
              )}
              {user.email && (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/addNewBook">Add Book</Link>
                    </Button>
                  </li>

                  <li
                    onClick={handleLogout}
                    className="p-3 hover:text-[#02BBFB]"
                  >
                    Logout
                  </li>
                </>
              )}

              {/* <li>
                <Cart />
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
