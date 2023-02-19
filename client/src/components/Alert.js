import styled from "styled-components";
import {useSelector} from "react-redux";

const Alert = () => {
    const {alertText} = useSelector((state) => state.alert);

    return (
        <Wrapper>
            <h3 className='alert'>{alertText}</h3>
        </Wrapper>
    );
};

export default Alert;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid var(--Error-Color);
  border-radius: var(--border-radius-4);
  padding: 0.75rem 1rem;

  .alert {
    text-align: center;
    font-size: var(--font-size-15);
    font-weight: var(--font-weight-5);
    color: var(--Error-Color);
    letter-spacing: 1px;
  }
`;