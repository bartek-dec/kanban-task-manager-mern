import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {AddTaskButton, EditBoardButton, LogoutButton, LogoutModal, EditBoardModal, SidebarModal} from "./index";
import {IoIosArrowDown} from 'react-icons/io';
import {showSidebarModal} from "../features/sidebarSlice/sidebarSlice";

const Navbar = () => {
    const {activeBtn, boards} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const boardTitle = boards[activeBtn]?.name;
    const handleClick = () => {
        dispatch(showSidebarModal());
    }

    return (
        <Wrapper>
            <h2>{boardTitle}
                <button className='arrow-btn' onClick={handleClick}>
                    <IoIosArrowDown className='arrow'/>
                </button>
            </h2>
            <div className='nav-btn-container'>
                <AddTaskButton/>
                <EditBoardButton/>
                <LogoutButton/>
            </div>
            <LogoutModal/>
            <EditBoardModal/>
            <SidebarModal/>
        </Wrapper>
    );
};

export default Navbar;

const Wrapper = styled.nav`
  height: var(--Navbar-Height);
  background-color: var(--Navbar-Background-Color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    text-transform: capitalize;
    margin-left: 1rem;
    color: var(--Main-Text-Color);
    font-size: var(--font-size-20);

    display: flex;
    align-items: center;
  }

  .arrow-btn {
    margin-left: 0.5rem;
    color: var(--Main-Purple);
    cursor: pointer;
    transition: var(--transition);
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow:hover {
    color: var(--Main-Purple-Hover-3);
  }

  .arrow {
    width: 1.5rem;
    height: 1.5rem;
  }

  .nav-btn-container {
    margin-right: 1rem;

    display: flex;
    align-items: center;
  }

  @media (min-width: 650px) {
    border-left: 1px solid var(--Border-Color);

    h2 {
      font-size: var(--font-size-24);
    }

    .arrow-btn {
      display: none;
    }
  }
`;