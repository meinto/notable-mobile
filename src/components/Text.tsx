import React from 'react'
import styled from 'styled-components/native'
import { Text as RNText, Platform } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

type TextProps = {
  children: string,
}

const BaseText = ({ style, children }) => (
  <RNText style={[...style, {
    color: '#1f1f1f',
    fontFamily: 'Roboto-Regular',
  }]}>{children}</RNText>
)

export const BoldHeadline = ({ children }: TextProps) => (
  <BaseText style={[material.headline, systemWeights.bold]}>
    {children}
  </BaseText>
)

export const Headline = ({ children }: TextProps) => (
  <BaseText style={[material.headline]}>
    {children}
  </BaseText>
)

export const Subheading = ({ children }: TextProps) => (
  <BaseText style={[material.subheading]}>
    {children}
  </BaseText>
)

export const Text = ({ children }: TextProps) => (
  <BaseText style={[material.body1]}>
    {children}
  </BaseText>
)
