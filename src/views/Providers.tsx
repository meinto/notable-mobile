import React from 'react'
import { DirectoryProvider } from '../filesystem/context'

export class Providers extends React.PureComponent {

  render() {
    return (
      <DirectoryProvider>
        {this.props.children}
      </DirectoryProvider>
    )
  }
}
