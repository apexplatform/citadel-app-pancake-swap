import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodesBSC = [process.env.REACT_APP_NODE_BSC_1, process.env.REACT_APP_NODE_BSC_2, process.env.REACT_APP_NODE_BSC_3]

export const nodesETH = [process.env.REACT_APP_NODE_ETH_1, process.env.REACT_APP_NODE_ETH_2, process.env.REACT_APP_NODE_ETH_3]


const getNodeUrl = () => {
  return sample(nodesBSC)
}

export default getNodeUrl
