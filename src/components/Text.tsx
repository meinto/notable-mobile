import React from 'react'
import { Text as RNText } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

type TextProps = {
  children: string,
  style?: any,
}

const BaseText = ({ style, children }: TextProps) => (
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
