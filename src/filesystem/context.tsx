import React, { PureComponent } from 'react';

export const DirectoryContext = React.createContext({
  dir: '',
  setDir: (dir: string) => {},
});

export class DirectoryProvider extends PureComponent {
  state = {
    dir: '',
    setDir: (dir: string) => {
      this.setState({dir})
    }
  }

  render() {
    return (
      <DirectoryContext.Provider value={this.state}>
        {this.props.children}
      </DirectoryContext.Provider>
    )
  }
}

export const DirectoryConsumer = DirectoryContext.Consumer