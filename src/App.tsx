import './App.css';
import TrendingReposView from './features/trendingRepos/TrendingReposView';
import { ApiProvider } from './ApiContext';
import axios from 'axios';


function App() {
  return (
    <ApiProvider api={{
      get: (url, config) => axios.get(url, config)
    }}>
      <TrendingReposView />
    </ApiProvider>
  );
}

export default App;
