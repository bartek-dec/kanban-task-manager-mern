import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {BoardListItem, CreateBoardButton} from "./index";
import {useEffect} from "react";
import {getBoards, setCurrentBoardName, setActiveBoard} from "../features/board/boardSlice";
import {useNavigate} from "react-router-dom";

const BoardsContainer = () => {
    const {boards, activeBoard} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoards());
    }, []);

    useEffect(() => {
        // set active board
        if (activeBoard) {
            navigate(`/${activeBoard}`);
        } else if (!activeBoard && boards.length > 0) {
            const {_id: id, name} = boards[0];
            dispatch(setCurrentBoardName(name));
            dispatch(setActiveBoard(id));
            navigate(`/${id}`);
        }
    }, [boards]);

    return (
        <Wrapper>
            <h4 className='boards-header'>all boards ({boards.length})</h4>
            {boards.map((item, index) => {
                const {name, _id: id} = item;
                return <BoardListItem key={index} id={id} title={name}/>
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