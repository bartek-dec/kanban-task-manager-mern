import styled from "styled-components";
import {useSelector} from "react-redux";
import {BoardListItem, CreateBoardButton} from "./index";

const BoardsContainer = () => {
    const {boards} = useSelector((state) => state.board);

    return (
        <Wrapper>
            <h4 className='boards-header'>all boards (3)</h4>
            {boards.map((item, index) => {
                return <BoardListItem key={index} id={index} title={item}/>
            })}
            <CreateBoardButton/>
        </Wrapper>
    );
};

export default BoardsContainer;

const Wrapper = styled.div`
  width: 100%;
  
  .boards-header {
    text-transform: uppercase;
    font-size: var(--font-size-13);
    letter-spacing: 3px;
    padding: 0.75rem;
    padding-left: 2rem;
    margin-bottom: 0.5rem;
    color: var(--Medium-Grey);
  }
`;