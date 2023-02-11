import styled from "styled-components";
import {TbLayoutBoardSplit} from 'react-icons/tb';
import {useSelector, useDispatch} from "react-redux";
import {setIsActive} from "../features/board/boardSlice";

const BoardListItem = ({title, id}) => {
    const {activeBtn} = useSelector((state) => state.board);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        const btnId = Number(e.currentTarget.dataset.id);
        dispatch(setIsActive(btnId));
    }

    return (
        <Wrapper data-id={id} type='button' className={activeBtn === id ? 'board-btn active' : 'board-btn'}
                 onClick={handleClick}>
            <TbLayoutBoardSplit className='icon-img'/>
            <h4>{title}</h4>
        </Wrapper>
    );
};

export default BoardListItem;

const Wrapper = styled.button`
  .board-btn:hover .icon-img {
    color: var(--Main-Purple);
  }
`;