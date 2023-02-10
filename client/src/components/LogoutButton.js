import styled from "styled-components";
import {MdLogout} from 'react-icons/md';

const LogoutButton = () => {
    return (
        <Wrapper>
            <MdLogout className='logout'/>
        </Wrapper>
    );
};

export default LogoutButton;

const Wrapper = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: var(--Medium-Grey);

  &:hover {
    color: var(--Main-Purple);
  }

  .logout {
    width: 2rem;
    height: 2rem;
  }
`;