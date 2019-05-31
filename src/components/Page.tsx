import styled from 'styled-components/native'

type PageWrapperProps = {
  justifyContent: string,
  withPadding: boolean,
}

export const PageWrapper = styled.View<PageWrapperProps>`
  flex: 1;
  ${props => props.withPadding && 'padding: 20px;'}
  ${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
`

type WrapperProps = {
  row?: boolean,
}

export const Wrapper = styled.View<WrapperProps>`
  padding: 20px;
  flex-direction: ${props => props.row ? 'row' : 'column'};
`
