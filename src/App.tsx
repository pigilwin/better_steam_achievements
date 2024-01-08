import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { Default } from './pages/index';

export const App = (): JSX.Element => {
    
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}