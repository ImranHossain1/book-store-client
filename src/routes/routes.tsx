import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';

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
        path: '/book-details/:id',
        element: <BookDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
