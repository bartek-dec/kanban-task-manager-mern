import styled from "styled-components";
import {getColor} from "../utils/columnColors";
import React from "react";

const Column = ({index, column, tasks}) => {
    return (
        <Wrapper>
            <h3><span style={{backgroundColor: getColor(index)}}></span>{column} (3)</h3>
        </Wrapper>
    );
};

export default Column;

const Wrapper = styled.div`

  h3 {
    text-transform: uppercase;
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-7);
    color: var(--Medium-Grey);
    letter-spacing: 3px;
  }

  span {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

`;