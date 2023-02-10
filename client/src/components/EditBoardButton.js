import styled from "styled-components";
import {BsDot} from 'react-icons/bs';
import {useDispatch} from "react-redux";
import {showModal} from "../features/board/boardSlice";

const EditBoardButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showModal());
    }

    return (
        <Wrapper type='button' onClick={handleClick}>
            <BsDot className='dots-icon'/>
            <BsDot className='dots-icon'/>
            <BsDot className='dots-icon'/>
        </Wrapper>
    );
};

export default EditBoardButton;

const Wrapper = styled.button`
  color: var(--Medium-Grey);
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .dots-icon {
    stroke-width: 5;
  }

  &:hover {
    color: var(--Main-Purple);
  }
`;