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
        <Wrapper data-id={id} type='button' onClick={handleClick}>
            <div  className={activeBtn === id ? 'btn-container active' : 'btn-container'}>
                <TbLayoutBoardSplit className='icon-img'/>
                <h4 className='name'>{title}</h4>
            </div>
        </Wrapper>
    );
};

export default BoardListItem;

const Wrapper = styled.button`
  border: none;
  width: 100%;
  background-color: transparent;

  .btn-container {
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
  }

  .btn-container:hover {
    background-color: var(--Light-Grey-Light-BG);
    color: var(--Main-Purple);
  }

  .active {
    background-color: var(--Main-Purple);
    color: var(--White);
  }

  .btn-container:hover .icon-img {
    color: var(--Main-Purple);
  }

  .icon-img {
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 1rem;
    stroke-width: 1;
  }
`;