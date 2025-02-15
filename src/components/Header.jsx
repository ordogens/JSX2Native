import './../styles/header.css'
// import { Controls } from './Controls'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Header = () => {
  return (
    <header className='Header'>
      <h1>JSX2Native</h1>
      {/* <Controls /> */}
      <ThemeSwitcher />
    </header>
  )
}
