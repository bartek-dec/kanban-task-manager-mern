import {FaUserAlt} from 'react-icons/fa';
import styled from "styled-components";

const UserButton = () => {
    return (
        <Wrapper type='button' className='board-btn'>
            <FaUserAlt className='icon-img'/>
            <h4>User Settings</h4>
        </Wrapper>
    );
};

export default UserButton;

const Wrapper = styled.button`
  .board-btn:hover .icon-img {
    color: var(--Main-Purple);
  }
`;