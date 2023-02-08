import styled from "styled-components";
import {Logo, BoardListItem, ToggleTheme} from '../components'

const Sidebar = () => {
    const titles = ['platform launch', 'marketing plan', 'roadmap']

    return (
        <Wrapper>
            <div className='container '>
                <div className='logo-container'>
                    <Logo/>
                </div>

                <div className='boards-container'>
                    <h4 className='boards-header'>all boards (3)</h4>
                    {titles.map((item, index) => {
                        return <BoardListItem key={index} id={index} title={item}/>
                    })}
                </div>

                <ToggleTheme/>
            </div>
        </Wrapper>
    );
};

export default Sidebar;

const Wrapper = styled.aside`
  position: relative;

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

  @media (min-width: 650px) {
    .container {
      margin-left: 0;
    }

    .hide-sidebar {
      margin-left: -18rem;
    }
  }

`;