import styled from "styled-components";
import {HiPlusSm} from 'react-icons/hi';

const AddTaskButton = () => {

    return (
        <Wrapper>
            <HiPlusSm className='plus-icon'/> <span>Add New Task</span>
        </Wrapper>
    );
};

export default AddTaskButton;

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0.85rem;
  background-color: var(--Main-Purple);
  color: var(--White);
  border: none;
  border-radius: 50%;
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-7);
  letter-spacing: 1px;
  cursor: pointer;
  transition: var(--transition);
  margin-right: 1rem;

  &:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  span {
    display: none;
  }

  .plus-icon {
    display: flex;
    align-items: center;
    width: 1rem;
    height: 1rem;
  }

  @media (min-width: 650px) {
    padding: 0.85rem 1.5rem;
    border-radius: var(--border-radius-24);
    span {
      display: inline;
    }
  }
`;