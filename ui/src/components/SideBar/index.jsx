import {BsPlus, BsFillLightningFill, BsGearFill, BsLightningFill} from 'react-icons/bs'
import {FaFire, FaPoo, FaSun, FaMoon} from 'react-icons/fa'

import useDarkMode from '../../hooks/useDarkMode';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 
                        flex flex-col
                        bg-gray-900 text-white shadow-lg
                        dark:bg-gray-900 dark:text-white">
            <SideBarIcon icon={<FaFire size="28" />} />
            <SideBarIcon icon={<BsPlus size="32" />} />
            <SideBarIcon icon={<BsLightningFill size="20" />} />
            <SideBarIcon icon={<FaPoo size="20" />} />
            <ThemeIcon />
        </div>
    )
};

const SideBarIcon = ({icon, tooltip = "tooltip 💡"}) => (
    <div className="sidebar-icon group">
        {icon}
        <span class="sidebar-tooltip group-hover:scale-100">
            {tooltip}
        </span>
    </div>
);

const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span className="sidebar-icon" onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='top-navigation-icon' />
        ) : (
          <FaMoon size='24' className='top-navigation-icon' />
        )}
      </span>
    );
  };

export default SideBar;