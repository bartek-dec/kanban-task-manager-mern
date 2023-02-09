import styled from "styled-components";
import {Logo, BoardListItem, ToggleTheme, HideButton, ShowButton, UserButton} from '../components';
import {useSelector} from "react-redux";

const Sidebar = () => {
    const {isSidebarVisible} = useSelector((state) => state.sidebar);

    const titles = ['platform launch', 'marketing plan', 'roadmap']

    return (
        <Wrapper>
            <div className={isSidebarVisible ? 'container' : 'container hide-sidebar'}>
                <div className='logo-container'>
                    <Logo/>
                </div>

                <div className='boards-container'>
                    <h4 className='boards-header'>all boards (3)</h4>
                    {titles.map((item, index) => {
                        return <BoardListItem key={index} id={index} title={item}/>
                    })}
                </div>

                <div className='settings-container'>
                    <ToggleTheme/>
                    <HideButton/>
                    <UserButton/>
                </div>
                <ShowButton/>
            </div>
        </Wrapper>
    );
};

export default Sidebar;

const Wrapper = styled.aside`
  .container {
    width: 18rem;
    height: 100vh;
    padding-right: 1.5rem;
    background-color: var(--Sidebar-Background-Color);
    margin-left: -18rem;
    transition: var(--transition);
  }

  .logo-container {
    height: var(--Navbar-Height);
    padding-left: 2rem;
    display: flex;
    align-items: center;
  }

  .boards-container {
    width: 100%;
    height: calc(100vh - (var(--Navbar-Height) + var(--Settings-Height)));
  }

  .boards-header {
    text-transform: uppercase;
    font-size: var(--font-size-13);
    letter-spacing: 3px;
    padding: 0.75rem;
    padding-left: 2rem;
    margin-bottom: 0.5rem;
    color: var(--Medium-Grey);
  }

  .settings-container {
    height: var(--Settings-Height);
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (min-width: 650px) {
    .container {
      margin-left: 0;
    }

    .hide-sidebar {
      margin-left: -18rem;
    }
  }

`;