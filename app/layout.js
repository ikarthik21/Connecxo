import './globals.css'
import Providers from '@components/Providers';
 
export const metadata = {
  title: 'Connecxo',
  description: 'A platform for instant messaging, voice and video callling',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}