import Link from 'next/link'
import Header from '../../components/header'

export const getStaticPaths = async () => {
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/api/products`)
  const data = await res.json()
  const paths = data?.data?.map((prod) => ({
    params: { id: prod.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { API_URL } = process.env
  const API = `${API_URL}`
  const res = await fetch(`${API}/api/products/${context.params.id}?populate=*`)
  const data = await res.json()

  return {
    props: {
      product: data,
    },
  }
}

const SinglePorduct = ({ product }) => {
  const {
    id,
    attributes: { name, description, main_image, price },
  } = product.data
  return (
    <>
      <Header />
      <div className='mt-8 flex justify-center items-center'>
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
          <img
            className='w-full max-h-[160px] object-cover'
            src={`${process.env.API_URL}${main_image?.data?.attributes?.url}`}
            alt='Sunset in the mountains'
          />
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>{description}</p>
          </div>
          <div className='flex justify-between items-center'>
            <button className='px-2 py-1 mb-2 bg-slate-700 text-white rounded-md'>
              ${price}
            </button>
          </div>
          <button
            className='px-6 py-4 mr-auto w-full bg-slate-700 text-white rounded-md snipcart-add-item'
            data-item-id={id}
            data-item-price={price}
            data-item-url={`/products/${id}`}
            data-item-description={description}
            data-item-image={`${process.env.API_URL}${main_image?.data?.attributes?.url}`}
            data-item-name={name}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default SinglePorduct
