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
import { IChart } from './chart'

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
        <p>Starting Phone Node</p>
      </Outer>
    )
  } else {
    return (
      <Outer>
        <p>Some Node Title</p>
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
export const startChart: IChart = {
    offset: {
      x: 0,
      y: 0,
    },
    scale: 1,
    nodes: {
      node1: {
        id: 'node1',
        type: 'output-only',
        position: {
          x: 300,
          y: 100,
        },
        ports: {
          port1: {
            id: 'port1',
            type: 'output',
            properties: {
              value: 'yes',
            },
          },
          port2: {
            id: 'port2',
            type: 'output',
            properties: {
              value: 'no',
            },
          },
        },
      },
    },
    links: {
      link1: {
        id: 'link1',
        from: {
          nodeId: 'node1',
          portId: 'port2',
        },
        to: {
          nodeId: 'node2',
          portId: 'port1',
        },
        properties: {
          label: 'example link label',
        },
      },
      link2: {
        id: 'link2',
        from: {
          nodeId: 'node2',
          portId: 'port2',
        },
        to: {
          nodeId: 'node3',
          portId: 'port1',
        },
        properties: {
          label: 'another example link label',
        },
      },
      link3: {
        id: 'link3',
        from: {
          nodeId: 'node2',
          portId: 'port2',
        },
        to: {
          nodeId: 'node4',
          portId: 'port1',
        },
      },
    },
    selected: {},
    hovered: {},
  }
export class CustomNodeInnerDemo extends React.Component {

    saveData(string: string) {
        console.log(this.state)
  }

  public state = cloneDeep(startChart)
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
        <div className = "flexbox-container-col">
        <button title = "Save Diagram" onClick={() => this.saveData("dfd")}/>
             Save Data
        <button/>
                
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
                    type="Top Node"
                    ports={ {
                    port1: {
                        id: 'port1',
                        type: 'bottom',
                        properties: {
                        custom: 'property',
                        },
                    },
                }}
                isDraggable = {true}
                />
                <SidebarItem
                    type="Middle Node"
                    ports=
                    { 
                        {
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
                        } 
                    }
                    properties=
                    { 
                        {
                            custom: 'property',
                        }
                    }
                    isDraggable = {true}
                />
            </Sidebar>
        </div>
      </Page>
    )
  }
}