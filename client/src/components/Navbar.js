import styled from "styled-components";
import {useSelector} from "react-redux";
import {AddTaskButton, EditBoardButton, LogoutButton, LogoutModal} from "./index";
import {IoIosArrowDown} from 'react-icons/io';

const Navbar = () => {
    const {activeBtn, boards} = useSelector((state) => state.board);
    const boardTitle = boards[activeBtn];

    return (
        <Wrapper>
            <h2>{boardTitle} <span className='arrow'><IoIosArrowDown/></span></h2>
            <div className='nav-btn-container'>
                <AddTaskButton/>
                <EditBoardButton/>
                <LogoutButton/>
            </div>
            <LogoutModal/>
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

  .arrow {
    margin-left: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--Main-Purple);
    cursor: pointer;
    transition: var(--transition);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow:hover {
    color: var(--Main-Purple-Hover-3);
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

    .arrow {
      display: none;
    }
  }
`;