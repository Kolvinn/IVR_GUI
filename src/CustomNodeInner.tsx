import { cloneDeep, mapValues } from 'lodash'
import * as React from 'react'
import styled from 'styled-components'
import { FlowChart, INodeInnerDefaultProps } from '@mrblenny/react-flow-chart'
import {actions,} from '@mrblenny/react-flow-chart'
import { Page } from './components/Page'
import { chartSimple } from './ExampleChartState'
import {Sidebar} from './components/Sidebar'
import './App.css';
import { SidebarItem } from './components/SidebarItem'

const Outer = styled.div`
  padding: 30px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 80%;
`

const Label = styled.label`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 20%;
`
const Message = styled.div`
  margin: 10px;
  padding: 10px;
  line-height: 1.4em;
`

const Button = styled.div`
  padding: 10px 15px;
  background: cornflowerblue;
  color: white;
  border-radius: 3px;
  text-align: center;
  transition: 0.3s ease all;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
  &:active {
    background: #5682d2;
  }
`
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  if (node.type === 'output-only') {
    return (
      <Outer>
        <p>Use Node inner to customise the content of the node</p>
      </Outer>
    )
  } else {
    return (
      <Outer>
        <p>Add custom displays for each node.type</p>
        <p>You may need to stop event propagation so your forms work.</p>
        <br />
        <div className = "flexbox-container">
            <Label>Id:</Label>
            <Input
            type="text"
            placeholder="input"
            onChange={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            />
        </div>
        <div className = "flexbox-container">
            <Label>Prompt:</Label>
            <Input
            type="text"
            placeholder="input"
            onChange={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            />
        </div>
        <div className = "flexbox-container">
            <Label>Voice:</Label>
            <Input
            type="text"
            placeholder="input"
            onChange={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            />
        </div>
      </Outer>
    )
  }
}

export class CustomNodeInnerDemo extends React.Component {
  public state = cloneDeep(chartSimple)
  public render () {
    const chart = this.state
    const stateActions = mapValues(actions, (func: any) =>
      (...args: any) => this.setState(func(...args))) as typeof actions

    return (
      <Page>
        <FlowChart
          chart={chart}
          callbacks={stateActions}
          Components={{
            NodeInner: NodeInnerCustom,
          }}
        />
    <Sidebar>{/*
          { chart.selected.type
          ? <Message>
              <div>Type: {chart.selected.type}</div>
              <div>ID: {chart.selected.id}</div>
              <br/>
              {/*
                We can re-use the onDeleteKey action. This will delete whatever is selected.
                Otherwise, we have access to the state here so we can do whatever we want.
              *
              <Button onClick={() => stateActions.onDeleteKey({})}>Delete</Button>
            </Message>
          : <Message>Click on a Node, Port or Link</Message> }
        </Sidebar>  */}
        <SidebarItem
        type="top/bottom"
        ports={ {
          port1: {
            id: 'port1',
            type: 'top',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port1',
            type: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        } }
        properties={ {
          custom: 'property',
        }}
      />
      <SidebarItem
        type="bottom-only"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="left-right"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port2',
            type: 'right',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="all-sides"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',

          },
          port2: {
            id: 'port2',
            type: 'right',
          },
          port3: {
            id: 'port3',
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'bottom',
          },
        }}
      />
      <SidebarItem
        type="lots-of-ports"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',

          },
          port2: {
            id: 'port2',
            type: 'right',
          },
          port3: {
            id: 'port3',
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'bottom',
          },
          port5: {
            id: 'port5',
            type: 'left',
          },
          port6: {
            id: 'port6',
            type: 'right',
          },
          port7: {
            id: 'port7',
            type: 'top',
          },
          port8: {
            id: 'port8',
            type: 'bottom',
          },
          port9: {
            id: 'port9',
            type: 'left',
          },
          port10: {
            id: 'port10',
            type: 'right',
          },
          port11: {
            id: 'port11',
            type: 'top',
          },
          port12: {
            id: 'port12',
            type: 'bottom',
          },
        }}
      />
    </Sidebar>
      </Page>
    )
  }
}