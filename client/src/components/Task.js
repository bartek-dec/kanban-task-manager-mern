import styled from "styled-components";

const Task = ({item}) => {
    const {title, subtasks} = item;

    const countCompleted = () => {
        return subtasks?.reduce((acc, curr) => {
            const {isCompleted} = curr;
            if (isCompleted) {
                return acc + 1;
            }
            return acc;
        }, 0)
    }

    return (
        <Wrapper>
            <h3>{title}</h3>
            <h4>{countCompleted()} of {subtasks?.length} subtasks</h4>
        </Wrapper>
    );
};

export default Task;

const Wrapper = styled.article`
  background-color: var(--Sidebar-Background-Color);
  padding: 1rem;
  border-radius: var(--border-radius-6);
  cursor: pointer;

  h3 {
    font-size: var(--font-size-13);
    color: var(--Main-Text-Color);
    text-transform: none;
    letter-spacing: 1px;
  }

  h4 {
    font-size: var(--font-size-12);
    color: var(--Medium-Grey);
  }

  :hover h3 {
    color: var(--Main-Purple);
  }
`;