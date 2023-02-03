import styled from "styled-components";

const Logo = () => {
    return (
        <Wrapper>
            <div className='bars'>
                <span className='bar bar-1'></span>
                <span className='bar bar-2'></span>
                <span className='bar bar-3'></span>
            </div>
            <h2>Kanban</h2>
        </Wrapper>
    );
};

export default Logo;

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 1rem;

  .bars {
    width: 1.5rem;
    height: 1.8rem;
    display: flex;
    justify-content: space-between;
  }

  .bar {
    display: block;
    height: 100%;
    width: 0.375rem;
    border-radius: 0.125rem;
  }

  .bar-1 {
    background-color: var(--Main-Purple);
  }

  .bar-2 {
    background-color: var(--Main-Purple-Hover-2);
  }

  .bar-3 {
    background-color: var(--Main-Purple-Hover-1);
  }

  h2 {
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--Main-Text-Color);
  }
`;