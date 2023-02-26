import styled from "styled-components";
import {useSelector} from "react-redux";
import {Column} from "../../components";

const BoardLayout = () => {
    const {activeBoard} = useSelector((state) => state.board);
    const {tasks} = useSelector((state) => state.task);

    return (
        <Wrapper column={activeBoard?.columns.length}>
            {activeBoard?.columns.map((column, index) => {
                return (
                    // column in the board is the same as status in task
                    <Column key={index} index={index} column={column} tasks={tasks[column]}/>
                )
            })}
        </Wrapper>
    );
};

export default BoardLayout;

const Wrapper = styled.section`
  min-height: calc(100vh - var(--Navbar-Height));
  padding: 1.5rem;
  overflow: auto;

  display: grid;
  grid-template-columns: repeat(${props => props.column}, 18rem);
  column-gap: 2rem;
`;