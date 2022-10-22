import { Icon } from '@iconify/react';
import Button from '../atomic/Button';

export type HeroProps = {
  name: {
    firstName: string,
    lastName: string,
  },
  secondaryText?: string,
  github?: string,
  linkedin?: string,
  twitter?: string,
  resume?: string
}

const Hero = ({
  name: {
    firstName,
    lastName
  },
  secondaryText,
  github,
  linkedin,
  twitter,
  resume, }: HeroProps) => {
  return (
    <section>
      <div className="w-full md:w-75 flex flex-col gap-2">
        <div className="relative w-max tracking-widest text-9xl font-bst">
          <div 
            className="relative z-[1] pl-[15%] text-black text-outline-4 text-outline-white
            dark:text-white dark:text-outline-black">
            {firstName}
          </div>
          <div 
            className="-mt-12 text-white text-outline
              dark:text-black dark:text-outline-white">
            {lastName}
          </div>
        </div>
        {secondaryText &&
          <div className="text-primary dark:text-primary-dark tracking-wider text-2xl font-light pl-1">
            {secondaryText}
          </div>
        }
        <div className="flex gap-8 items-center mt-3">
          <div className="flex gap-3 pl-1 dark:text-white text-black text-3xl">
            {github && <Icon className="fill-current text-current" icon="akar-icons:github-outline-fill" />}
            {linkedin && <Icon className="fill-current text-current" icon="uit:linkedin-alt" />}
            {twitter && <Icon className="fill-current text-current" icon="uit:twitter-alt" />}
          </div>
          {resume && <Button text="VIEW RESUME" URL={resume} target="_blank"/>}
        </div>
      </div>

    </section>
  )
}

export default Hero