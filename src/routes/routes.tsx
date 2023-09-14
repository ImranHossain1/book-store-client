import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import UpdateBook from '@/pages/UpdateBook';
import AddNewBook from '@/pages/AddBooks';
import SignUp from '@/pages/Signup';
import SignIn from '@/pages/SignIn';
import PrivateRoute from './PrivateRoute';
import WishList from '@/pages/WishList';
import ReadList from '@/pages/ReadList';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/addNewBook',
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/book-details/:id',
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: '/readlist',
        element: (
          <PrivateRoute>
            <ReadList />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-book/:id',
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
