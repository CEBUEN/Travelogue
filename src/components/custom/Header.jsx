// this will be fixed throughout the project

import React from 'react'
import { Button } from '@/components/ui/button'
import TravelogueLogo from '@/assets/TravelogueLogoHorizontal.svg' // use the new horizontal logo

function Header() {
  return (
    <header className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo + Title block */}
      <div className="flex items-center gap-3">
        <img
          src={TravelogueLogo}
          alt="Travelogue logo"
          className="h-10 w-auto sm:h-12 select-none"
          draggable={false}
        />
      </div>

      {/* Action buttons */}
      <div>
        <Button>Sign In</Button>
      </div>
    </header>
  )
}

export default Header
