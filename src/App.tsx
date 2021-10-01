import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { createGlobalStyle } from 'styled-components'
import { CustomNodeInnerDemo } from './CustomNodeInner'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`

const PageContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-width: 100vw;
  max-height: 100vh;
`

function App() {
  return (
      <CustomNodeInnerDemo/>
  );
}
export const Page = ({ children }: { children: any}) => (
  <PageContent>
    {children}
    <GlobalStyle />
  </PageContent>
)

export default App;
