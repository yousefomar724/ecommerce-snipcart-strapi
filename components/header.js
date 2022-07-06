import Link from 'next/link'
import { useSnipcart } from 'use-snipcart'

const Header = () => {
  const { cart = {} } = useSnipcart()
  return (
    <header className='px-2 py-4 bg-slate-800 text-white w-full'>
      <nav className='container m-auto flex justify-between items-center'>
        <h3 className='font-bold text-2xl'>LOGO</h3>
        <ul className='flex items-center justify-center gap-4'>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/blog'>
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <a>About Us</a>
            </Link>
          </li>
          <li>
            <Link href='/services'>
              <a>Services</a>
            </Link>
          </li>
          <Link href='/'>
            <a className='snipcart-checkout text-2xl'>
              ${cart.subtotal?.toFixed(2)}
            </a>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
