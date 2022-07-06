import Link from 'next/link'
import Header from '../components/header'

const Blog = () => {
  return (
    <>
      <Header />
      <div className='h-screen flex justify-center items-center flex-col'>
        <Link href='/'>
          <a className='px-6 py-4 bg-slate-700 text-white rounded-md '>
            Go Back Home
          </a>
        </Link>
        <div className='m-8 text-4xl'>Blog</div>
      </div>
    </>
  )
}

export default Blog
