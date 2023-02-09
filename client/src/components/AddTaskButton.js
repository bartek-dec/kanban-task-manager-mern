import styled from "styled-components";
import {HiPlusSm} from 'react-icons/hi';

const AddTaskButton = () => {

    return (
        <Wrapper>
            <HiPlusSm className='plus-icon'/> Add New Task
        </Wrapper>
    );
};

export default AddTaskButton;

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0.85rem 1.5rem;
  background-color: var(--Main-Purple);
  color: var(--White);
  border: none;
  border-radius: var(--border-radius-24);
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-7);
  letter-spacing: 1px;
  cursor: pointer;
  transition: var(--transition);
  margin-right: 1rem;

  &:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .plus-icon {
    display: flex;
    align-items: center;
    width: 1rem;
    height: 1rem;
  }
`;