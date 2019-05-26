import React from 'react'
import { Listing } from './Listing'
import { Providers } from '../Providers'
import { DirectoryConsumer } from '../../filesystem/context'

type ListingContainerProps = {
  componentId: string,
}

export class ListingContainer extends React.PureComponent<ListingContainerProps> {
  render() {
    return (
      <Providers>
        <DirectoryConsumer>
          {({ dir, fileList, initialized }) => {
            const context = { dir, fileList, initialized }
            return (
              <Listing
                {...this.props}
                {...context}
              />
            )
          }}
        </DirectoryConsumer>
      </Providers>
    )
  }
}
