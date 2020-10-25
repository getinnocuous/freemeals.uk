import React from "react";
import styled from "styled-components";

import Block from "../Block";

import { NAME, RESULTS_MODE, URL } from "../../constants";
import Button from "components/Button";

function ProviderList({
  resultsMode,
  buildAddressString,
  data,
  handleProviderClick,
  selectedIndex,
}) {
  return (
    <List>
      <Block>{data.length} results</Block>
      {data.length ? (
        data.map((provider, i) => (
          <Provider
            key={i}
            onClick={() => handleProviderClick(i)}
            isSelected={selectedIndex === i}
          >
            <h3>{provider[NAME]}</h3>
            <Block>{buildAddressString(provider)}</Block>
            <Block>{provider[URL]}</Block>
          </Provider>
        ))
      ) : (
        <span>Getting list of fantastic providers...</span>
      )}
      {resultsMode === RESULTS_MODE.closest && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <Button text={'Show more'} to={'/page1'} />
        </div>
      )}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  flex: 3;
  height: 100%;
  overflow-y: scroll;
`;

const Provider = styled.li`
  display: block;
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  &:hover {
    background: #85de77;
    color: white;
  }
  ${(props) =>
    props.isSelected &&
    `
    background: #85DE77;
    color: white;
  `}
`;

export default ProviderList;
