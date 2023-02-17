import styled from "styled-components";
import {Alert, FormInputSmall} from "./index";
import {closeCreateModal, createBoard} from "../features/board/boardSlice";
import {setShowAlert, setAlertText} from "../features/alert/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {HiPlusSm} from 'react-icons/hi';
import {IoMdClose} from 'react-icons/io';
import {nanoid} from "nanoid";
import {filterObject} from "../utils/objectUtil";

let initialIDs = [nanoid(), nanoid()];
let initialValues = {};
let initialErrors = {};

initialIDs.forEach((id) => {
    initialValues[id] = '';
    initialErrors[id] = false;
});

const CreateBoardModal = () => {
    const dispatch = useDispatch();
    const {isCreateBoardModalVisible, isLoading} = useSelector((state) => state.board);
    const {showAlert} = useSelector((state) => state.alert);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [columnIDs, setColumnIDs] = useState(initialIDs);
    const [values, setValues] = useState(initialValues);
    const [columnErrors, setColumnErrors] = useState(initialErrors);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            dispatch(setShowAlert(false));
            dispatch(setAlertText(''));
            setNameError(false);

            // reset all column errors
            const errors = {...columnErrors};
            Object.entries(errors).forEach((entry) => {
                const [key] = entry;
                errors[key] = false;
            });
            setColumnErrors(errors);
        }, 3000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [nameError, columnErrors]);

    const resetLocalState = () => {
        setTimeout(() => {
            initialIDs = [nanoid(), nanoid()];
            initialValues = {};
            initialErrors = {};

            initialIDs.forEach((id) => {
                initialValues[id] = '';
                initialErrors[id] = false;
            });
            setName('');
            setColumnIDs(initialIDs);
            setValues(initialValues);
            setColumnErrors(initialErrors);
        }, 150);
    }

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeCreateModal());
            resetLocalState();
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleAddNewColumn = () => {
        // generate new Id
        const id = nanoid();

        // add Id to the array of existing Ids
        setColumnIDs((prevState) => {
            return [...prevState, id];
        });
        // create new value placeholder for the corresponding Id
        setValues({...values, [id]: ''});
        // create new error placeholder for the corresponding Id
        setColumnErrors({...columnErrors, [id]: false});
    }

    const handleRemoveColumn = (e) => {
        // get current Id from the clicked button
        const id = e.currentTarget.dataset.id;
        // remove selected Id from array of existing Ids
        const remainColumns = columnIDs.filter((column) => column !== id);
        setColumnIDs(remainColumns);

        // remove the key/value pair from the object, for the selected Id
        const remainValues = filterObject(values, id);
        setValues(remainValues);
        const remainErrors = filterObject(columnErrors, id);
        setColumnErrors(remainErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let emptyColumns = false;

        Object.entries(values).forEach((item) => {
            const [id, value] = item;
            if (!value) {
                setColumnErrors((prevState) => {
                    return {...prevState, [id]: true}
                });
                emptyColumns = true;
            }
        });

        // check for errors
        if ((!name && emptyColumns) || !name) {
            setNameError(true);
            dispatch(setShowAlert(true));
            dispatch(setAlertText('Please provide all values'));
            return;
        } else if (emptyColumns) {
            dispatch(setShowAlert(true));
            dispatch(setAlertText('Please provide all values'));
            return;
        }

        dispatch(createBoard({name, columns: Object.values(values)}));
        //dispatch(closeCreateModal());
        resetLocalState();
    }

    return (
        <Wrapper className={isCreateBoardModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form-board' onSubmit={handleSubmit} noValidate>

                <h2 className='small-header'>Add New Board</h2>

                {showAlert && <Alert/>}

                <FormInputSmall type='text' name='name' value={name} labelText='Name' handleChange={handleNameChange}
                                error={nameError} label={true} placeholder='e.g Web Design'/>

                <p>Columns</p>
                <div className='columns-container'>

                    {columnIDs.map((id) => {
                        return (
                            <div key={id} className='column' data-id={id}>
                                <FormInputSmall type='text' name={id} value={values[id]} placeholder='e.g Todo'
                                                error={columnErrors[id]} labelText='Last Name'
                                                handleChange={handleChange}/>

                                <button type='button' className='remove-btn' data-id={id} onClick={handleRemoveColumn}>
                                    <IoMdClose className='close-icon'/>
                                </button>
                            </div>
                        )
                    })}

                </div>

                <button disabled={isLoading} type='button' className='btn new-board-btn column-btn'
                        onClick={handleAddNewColumn}>
                    <HiPlusSm/> Add New Column
                </button>
                <button disabled={isLoading} type='submit' className='btn new-board-btn create-board-btn'>Create New
                    Board
                </button>
            </form>
        </Wrapper>
    );
};

export default CreateBoardModal;

const Wrapper = styled.div`

  .form-board {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 30rem;
    background-color: var(--Sidebar-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 2rem;
  }

  .small-header {
    text-align: left;
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-7);
    color: var(--Main-Text-Color);
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-5);
    color: var(--Main-Text-Color);
  }

  .column {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
    margin-bottom: 0.75rem;

    div {
      margin-bottom: 0;
    }
  }

  .remove-btn {
    background-color: transparent;
    border: none;
    color: var(--Medium-Grey);
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .close-icon {
    width: 1.75rem;
    height: 1.75rem;
  }

  .column-btn {
    background-color: var(--Light-Grey-Light-BG);
    color: var(--Main-Purple);
    transition: color 0.3s linear;
    margin-bottom: 1rem;
  }

  .column-btn:hover {
    color: var(--Black);
  }

  .new-board-btn {
    border: none;
    border-radius: var(--border-radius-24);
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: var(--font-size-13);
    letter-spacing: 0;
    transition: background-color 0.3s linear;
  }

  .create-board-btn {
    background-color: var(--Main-Purple);
    color: var(--White);
  }

  .create-board-btn:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .create-board-btn:disabled {
    background-color: var(--Main-Purple-Hover-2);
    cursor: auto;
  }
`;