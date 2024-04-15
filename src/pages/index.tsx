import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import shirt1 from '@/assets/shirts/shirt-1.png'
import shirt2 from '@/assets/shirts/shirt-2.png'
import shirt3 from '@/assets/shirts/shirt-3.png'
import { HomeContainer, Product } from '@/styles/pages/home'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product href="/product/1" className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$&nbsp;79,90</span>
        </footer>
      </Product>

      <Product href="/product/2" className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$&nbsp;79,90</span>
        </footer>
      </Product>

      <Product href="/product/3" className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$&nbsp;79,90</span>
        </footer>
      </Product>

      <Product href="/product/3" className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$&nbsp;79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
