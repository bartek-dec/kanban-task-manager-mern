import styled from "styled-components";
import {useSelector} from "react-redux";
import {AddTaskButton, EditBoardButton} from "./index";

const Navbar = () => {
    const {activeBtn, boards} = useSelector((state) => state.board);
    const boardTitle = boards[activeBtn];

    return (
        <Wrapper>
            <h2>{boardTitle}</h2>
            <div className='nav-btn-container'>
                <AddTaskButton/>
                <EditBoardButton/>
            </div>
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
  }

  .nav-btn-container {
    margin-right: 1rem;
    
    display: flex;
    align-items: center;
  }

  @media (min-width: 650px) {
    border-left: 1px solid var(--Border-Color);
  }
`;