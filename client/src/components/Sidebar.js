import styled from "styled-components";
import {
    ToggleTheme,
    HideButton,
    ShowButton,
    UserButton,
    BoardsContainer,
    UserModal,
    CreateBoardModal
} from '../components';
import {useSelector} from "react-redux";

const Sidebar = () => {
    const {isSidebarVisible} = useSelector((state) => state.sidebar);

    return (
        <Wrapper>
            <div className={isSidebarVisible ? 'container' : 'container hide-sidebar'}>
                <div className='boards-container'>
                    <BoardsContainer/>
                </div>

                <div className='settings-container'>
                    <ToggleTheme/>
                    <HideButton/>
                    <UserButton/>
                </div>
                <ShowButton/>
            </div>
            <UserModal/>
            <CreateBoardModal/>
        </Wrapper>
    );
};

export default Sidebar;

const Wrapper = styled.aside`
  .container {
    width: var(--Sidebar-Width);
    height: calc(100vh - var(--Navbar-Height));
    padding-right: 1.5rem;
    background-color: var(--Sidebar-Background-Color);
    margin-left: -18rem;
    transition: var(--transition);
  }

  .boards-container {
    width: 100%;
    height: calc(100vh - (var(--Navbar-Height) + var(--Settings-Height)));
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
      position: sticky;
      top: var(--Navbar-Height);
      margin-left: 0;
    }

    .hide-sidebar {
      margin-left: -18rem;
    }
  }
`;