import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {BoardListItem, CreateBoardButton} from "./index";
import {useEffect} from "react";
import {getBoards} from "../features/board/boardSlice";

const BoardsContainer = () => {
    const {boards} = useSelector((state) => state.board);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBoards());
    }, []);

    return (
        <Wrapper>
            <h4 className='boards-header'>all boards ({boards.length})</h4>
            {boards.map((item, index) => {
                const {name} = item;
                return <BoardListItem key={index} id={index} title={name}/>
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