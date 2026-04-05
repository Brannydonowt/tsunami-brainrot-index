import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Gallery from './components/Gallery';
import CharacterDetail from './components/CharacterDetail';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="character/:id" element={<CharacterDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
