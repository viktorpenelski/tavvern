import './App.css';
import Equipment from './components/Equipment';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3'>
      <Equipment/>
    </div>
  )
}

export default App;
