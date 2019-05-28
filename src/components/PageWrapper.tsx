import styled from 'styled-components/native'

type PageWrapperProps = {
  justifyContent: string,
}

export const PageWrapper = styled.View<PageWrapperProps>`
  flex: 1;
  padding: 20px;
  ${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
`
