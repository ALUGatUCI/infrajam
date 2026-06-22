'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import './common.css'

type NavButtonProps = {
  text: string
  link: string
}

export function NavButton(props: NavButtonProps) {
  const pathname = usePathname()
  const isCurrent = pathname === props.link

  return (
    <Link href={props.link}>
      <button className={isCurrent ? 'currentNavButton navButton' : 'navButton'}>
        {props.text}
      </button>
    </Link>
  )
}

export function NavBar() {
  return (
    <>
      <br/>
      <div className='navBar'>
        <NavButton text='Home' link='/'></NavButton>
        <NavButton text='Apply' link='/apply'></NavButton>
        <NavButton text='Tracks' link='/tracks'></NavButton>
      </div>
      <br/>
    </>
  )
}