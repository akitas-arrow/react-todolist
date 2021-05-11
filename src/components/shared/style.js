import {css} from 'styled-components'
import "@fontsource/noto-sans-jp"

export const Color = {
  white: '#fff',
  main: '#00bed4',
  text: '#555555',
}

export const BaseTextStyle = css`
  font-family: "noto-sans-jp";
  font-size: 16px;
  line-height: 2em;
  letter-spacing: 0.05em;
  color: ${Color.text};
`