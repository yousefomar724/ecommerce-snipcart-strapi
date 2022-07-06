import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'

export const getServerSideProps = async () => {
  const { STRAPI_API_TOKEN, API_URL } = process.env
  const api_key = `${API_URL}`
  const strapi_token = `${STRAPI_API_TOKEN}`

  let res = await fetch(`${api_key}/api/products?populate=*`)
  const data = await res.json()
  return {
    props: {
      products: data,
    },
  }
}

const Home = ({ products }) => {
  const idPaths = products?.data?.map((prod) => ({
    params: { id: prod.id.toString() },
  }))

  return (
    <>
      <Head>
        <title>Ecommerce</title>
      </Head>
      <Header />

      <main className='my-8'>
        <section className='flex justify-center items-center container gap-4'>
          {products?.data?.map((product, index) => {
            const {
              id,
              attributes: { name, description, main_image, price },
            } = product
            return (
              <div
                key={index}
                className='max-w-sm rounded overflow-hidden shadow-lg'
              >
                <img
                  className='w-full max-h-[200px] object-cover'
                  src={`${process.env.API_URL}${main_image?.data?.attributes?.url}`}
                  alt='Sunset in the mountains'
                />
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2'>{name}</div>
                </div>
                <div className='flex justify-between items-center'>
                  <button className='px-2 py-1 mb-2 bg-slate-700 text-white rounded-md'>
                    ${price}
                  </button>
                  <Link href={`products/${id}`}>
                    <a className='px-2 py-1 mb-2 bg-slate-700 text-white rounded-md'>
                      More Details
                    </a>
                  </Link>
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
            )
          })}
        </section>
      </main>
    </>
  )
}

export default Home
