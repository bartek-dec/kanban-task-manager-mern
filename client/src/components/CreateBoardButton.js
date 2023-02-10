import styled from "styled-components";
import {TbLayoutBoardSplit} from 'react-icons/tb';
import {HiPlusSm} from 'react-icons/hi';

const CreateBoardButton = () => {
    return (
        <Wrapper className='board-btn'>
            <TbLayoutBoardSplit className='icon-img'/>
            <h4><HiPlusSm className='plus-icon'/> Create New Board</h4>
        </Wrapper>
    );
};

export default CreateBoardButton;

const Wrapper = styled.button`
  color: var(--Main-Purple);
  
  .plus-icon{
    stroke-width: 1;
    margin-right: 0.25rem;
  }
  
  h4 {
    display: flex;
    align-items: center;
  }
`;