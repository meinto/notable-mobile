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

export const Wrapper = styled.View`
  padding: 20px;
`
