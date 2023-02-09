import styled from "styled-components";
import {FaEyeSlash} from 'react-icons/fa';

const HideButton = () => {
    return (
        <Wrapper type='button' className='board-btn'>
            <FaEyeSlash className='icon-img'/>
            <h4>Hide Sidebar</h4>
        </Wrapper>
    );
};

export default HideButton;

const Wrapper = styled.button`
  .board-btn:hover .icon-img {
    color: var(--Main-Purple);
  }
`;