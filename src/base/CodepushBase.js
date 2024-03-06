import React, { createContext, useContext } from 'react'
import codePush, { DownloadProgress } from 'react-native-code-push'

// @ts-ignore
const CodePushContext = createContext<CodePushContext>({})

export const useCodePush = () => useContext<CodePushContext>(CodePushContext)

export const CodePushProvider = codePush()(
  class extends React.Component{
    state = {
      status: null,
      progress: null,
    }

    codePushStatusDidChange(status) {
      this.setState({ status })
    }

    codePushDownloadDidProgress(progress) {
      this.setState({ progress: progress.receivedBytes / progress.totalBytes })
    }

    render() {
      return (
        <CodePushContext.Provider
          value={{
            status: this.state.status,
            progress: this.state.progress,
          }}
        >
          {this.props.children}
        </CodePushContext.Provider>
      )
    }
  }
)

export default CodePushProvider
