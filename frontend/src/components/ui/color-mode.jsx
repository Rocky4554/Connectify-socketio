'use client'
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
// import {IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <ClientOnly fallback={<Skeleton boxSize='9' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  },
)

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme light'
      colorPalette='gray'
      colorScheme='light'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme dark'
      colorPalette='gray'
      colorScheme='dark'
      ref={ref}
      {...props}
    />
  )
})


///////////////////

// 'use client'

// import React from 'react'
// import {
//   IconButton,
//   Skeleton,
//   chakra,
//   useColorMode as useChakraColorMode,
//   useColorModeValue as useChakraColorModeValue,
// } from '@chakra-ui/react'
// import { LuMoon, LuSun } from 'react-icons/lu'
// import { ThemeProvider, useTheme } from 'next-themes'

// // ✅ Safe ClientOnly fallback (works in all Chakra versions)
// function ClientOnly({ children, fallback = null }) {
//   const [isClient, setIsClient] = React.useState(false)
//   React.useEffect(() => setIsClient(true), [])
//   return isClient ? children : fallback
// }

// // ✅ Color Mode Provider using next-themes
// export function ColorModeProvider(props) {
//   return (
//     <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
//   )
// }

// // ✅ Hook for color mode (light/dark)
// export function useColorMode() {
//   const { resolvedTheme, setTheme, forcedTheme } = useTheme()
//   const colorMode = forcedTheme || resolvedTheme
//   const toggleColorMode = () => {
//     setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
//   }
//   return {
//     colorMode,
//     setColorMode: setTheme,
//     toggleColorMode,
//   }
// }

// // ✅ Use light/dark value
// export function useColorModeValue(light, dark) {
//   const { colorMode } = useColorMode()
//   return colorMode === 'dark' ? dark : light
// }

// // ✅ Icon that changes based on color mode
// export function ColorModeIcon() {
//   const { colorMode } = useColorMode()
//   return colorMode === 'dark' ? <LuSun /> : <LuMoon />
// }

// // ✅ Button to toggle color mode
// export const ColorModeButton = React.forwardRef(function ColorModeButton(
//   props,
//   ref
// ) {
//   const { toggleColorMode } = useColorMode()

//   return (
//     <ClientOnly fallback={<Skeleton boxSize="9" />}>
//       <IconButton
//         onClick={toggleColorMode}
//         variant="ghost"
//         aria-label="Toggle color mode"
//         size="sm"
//         ref={ref}
//         icon={<ColorModeIcon />}
//         {...props}
//       />
//     </ClientOnly>
//   )
// })

// // ✅ Light and Dark wrappers using Chakra’s chakra() API
// export const LightMode = React.forwardRef(function LightMode(props, ref) {
//   return (
//     <chakra.span
//       color="fg"
//       display="contents"
//       className="chakra-theme light"
//       colorPalette="gray"
//       colorScheme="light"
//       ref={ref}
//       {...props}
//     />
//   )
// })

// export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
//   return (
//     <chakra.span
//       color="fg"
//       display="contents"
//       className="chakra-theme dark"
//       colorPalette="gray"
//       colorScheme="dark"
//       ref={ref}
//       {...props}
//     />
//   )
// })
