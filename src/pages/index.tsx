import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { HomeContainer, Product } from '@/styles/pages/home'

interface HomeProps {
  products: {
    id: string
    name: string
    price: number
    image: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product
          key={product.id}
          href={`/product/${product.id}`}
          className="keen-slider__slide"
        >
          <Image src={product.image} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data
    .map((product) => {
      const price = product.default_price as Stripe.Price
      if (!price.unit_amount) {
        return null
      }

      return {
        id: product.id,
        name: product.name,
        price: price.unit_amount / 100,
        image: product.images[0],
      }
    })
    .filter(Boolean)

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
