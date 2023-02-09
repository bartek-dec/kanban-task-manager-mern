import styled from "styled-components";
import {BsDot} from 'react-icons/bs';

const EditBoardButton = () => {
    return (
        <Wrapper>
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .dots-icon {
    stroke-width: 5;
  }
`;