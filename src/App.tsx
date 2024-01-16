import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { Default } from './pages';
import { NavigationBar } from 'components/NavigationBar';

export const App = (): JSX.Element => {
    
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-slate-300 min-h-screen">
        <BrowserRouter>
          <NavigationBar/>
          <Routes>
            <Route path="/" element={<Default/>}/>
          </Routes>
        </BrowserRouter>
    </main>
  );
}