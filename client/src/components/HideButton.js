import styled from "styled-components";
import {FaEyeSlash} from 'react-icons/fa';

const HideButton = () => {
    return (
        <Wrapper type='button'>
            <FaEyeSlash className='icon-img'/>
            <h4 className='name'>Hide Sidebar</h4>
        </Wrapper>
    );
};

export default HideButton;

const Wrapper = styled.button`
  border: none;
  width: 100%;
  background-color: transparent;
  padding: 0.85rem;
  padding-left: 2rem;
  text-transform: capitalize;
  font-size: var(--font-size-15);
  border-top-right-radius: var(--border-radius-24);
  border-bottom-right-radius: var(--border-radius-24);
  color: var(--Medium-Grey);
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--Light-Grey-Light-BG);
    color: var(--Main-Purple);
  }

  &:hover .icon-img {
    color: var(--Main-Purple);
  }
`;