import styled from "styled-components";

const FormInputSmall = ({type, error, name, labelText, value, handleChange}) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText ? labelText : name}</label>
            <input type={type} name={name} value={value} onChange={handleChange}
                   className={error ? 'input error' : 'input'}/>
        </Wrapper>
    );
};

export default FormInputSmall;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-7);
    color: var(--Medium-Grey);
  }

  .input {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: var(--font-size-13);
    background-color: var(--Form-Background-Color);
    color: var(--Main-Text-Color);
    border: none;
    outline: 1px solid var(--Border-Color);
    border-radius: var(--border-radius-4);
    cursor: pointer;
  }

  .error {
    outline: 1px solid var(--Error-Color);
  }

  input:hover {
    outline: 1px solid var(--Main-Purple);
  }

  input:focus {
    outline: 2px solid var(--Main-Text-Color);
  }
`;
















