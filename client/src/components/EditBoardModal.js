import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {closeEditModal} from "../features/board/boardSlice";

const EditBoardModal = () => {
    const {isEditBoardModalVisible} = useSelector((state) => state.board);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeEditModal());
        }
    }

    return (
        <Wrapper className={isEditBoardModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <div>
                <button type='button' className='edit'>Edit Board</button>
                <button type='button'>Delete Board</button>
            </div>
        </Wrapper>
    );
};

export default EditBoardModal;

const Wrapper = styled.div`
  div {
    position: absolute;
    right: 3rem;
    top: calc(var(--Navbar-Height) - 1rem);
    background-color: var(--Dark-Light-Mode-Switch-Background-Color);
    border-radius: var(--border-radius-6);
    overflow: hidden;
    padding: 0.85rem 1.5rem;

    display: flex;
    flex-direction: column;
  }

  .edit {
    color: var(--Medium-Grey);
    margin-bottom: 0.85rem;
  }

  button {
    text-align: left;
    border: none;
    background-color: transparent;
    color: var(--Red);
    font-weight: var(--font-weight-5);
    font-size: var(--font-size-18);
    cursor: pointer;
    transition: transform 0.3s linear;
  }
  
  button:hover{
    transform: scale(1.1);
  }
`;