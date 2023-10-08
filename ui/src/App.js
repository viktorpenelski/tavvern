import './App.css';
import Equipment from './components/Equipment';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex-col w-screen h-28 border-solid border-2 border-red-500'></div>
      <Equipment/>
    </div>
  )
}

export default App;
