import Image from 'next/image'
import Link from 'next/link'

import { NavBar } from './common'
import { MailingList } from './MailingList'

function ApplyButton() {
  return (
    <>
      <Link href="/apply">
        <button className='applyButton'>
          Apply Today!
        </button>
      </Link>
    </>
  )
}

function TracksButton() {
  return (
    <>
      <Link href="/tracks">
        <button className='applyButton secondaryButton'>
          View Tracks
        </button>
      </Link>
    </>
  )
}

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <h1>Welcome to InfraJam!</h1>
      <p>
        InfraJam is an in-development infrastructure-focused hackathon
        that is planned to be hosted at UC Irvine. The event brings
        together students across universities to build, break,
        and scale real infrastructure over a single weekend.
      </p>

      <p>
        And during that weekend, you will be able to attend workshops and join social events
        with other talented students.
      </p>

      <div className='horizontal'>
        {/* Comment out the apply button until apps open */}
        {/*<ApplyButton />*/}
        <TracksButton />
      </div>

      <h1>Be The First To Know!</h1>
      <p>
        Join our mailing list for updates and to be informed when
        applications open!
      </p>
      <MailingList />

      <h1>Thanks To Our Sponsors</h1>
      {/* This is for when we have actual sponsors to showcase */}
      <div className='horizontal sponsors'>
      </div>

      <h1>Brought to you by</h1>
      <div className="horizontal">
        <a href="https://alugatuci.org" target="_blank"><Image alt="ALUG@UCI" width="300" height="175" src="/alug-logo.png" /></a>
      </div>
    </>
  );
}
