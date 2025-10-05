'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function ChakraUI(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}

// 'use client'

// import { ChakraProvider, extendTheme } from '@chakra-ui/react'
// import { ColorModeProvider } from './color-mode'

// const theme = extendTheme({
//   // You can add your custom theme config here (optional)
// })

// export function ChakraUI(props) {
//   return (
//     <ChakraProvider theme={theme}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   )
// }

