type ButtonProps = {
  text: string,
  URL: string,
  target?: string,
}
const Button = ({text, URL, target}: ButtonProps) => {
  return (
    <a 
      className="relative px-5 py-2 font-bold text-sm z-[1] text-black

      before:absolute before:-left-1 before:-top-1 before:w-full before:h-full
      before:bg-white before:z-[-1]
      before:transition-all hover:before:translate-x-1 hover:before:translate-y-1

      after:absolute after:top-1 after:left-1 after:w-full after:h-full 
      after:border-2 after:border-white after:mix-blend-difference 
      after:transition-all hover:after:-translate-x-1 hover:after:-translate-y-1
      
      filter invert dark:invert-0"
      href={URL}
      target={target || ""}>
      {text}
    </a>
  )
}

export default Button