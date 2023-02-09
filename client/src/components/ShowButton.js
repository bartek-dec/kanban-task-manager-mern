import styled from "styled-components";
import {BsEye} from 'react-icons/bs';

const ShowButton = () => {

    return (
        <Wrapper type='button' onClick={handleClick}>
            <BsEye className='icon-img show-icon'/>
        </Wrapper>
    );
};

export default ShowButton;

const Wrapper = styled.button`
  position: fixed;
  left: 0;
  bottom: 20rem;
  border: none;
  border-bottom-right-radius: var(--border-radius-24);
  border-top-right-radius: var(--border-radius-24);
  cursor: pointer;
  padding: 0.85rem;
  padding-left: 1.25rem;
  background-color: var(--Main-Purple);
  transition: var(--transition);

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .show-icon {
    margin-right: 0;
    color: var(--White);
  }
`;
