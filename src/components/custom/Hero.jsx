import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 mt-20">
      {/* Heading */}
      <h1 className="font-extrabold text-[40px] sm:text-[50px] leading-tight">
        <span className="text-[#0a90c5]">
          Discover Your Next Adventure with AI:
        </span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>

      {/* Subtext */}
      <p className="text-xl text-gray-500 mt-6 max-w-2xl">
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interests and budget.
      </p>

      {/* Call-to-action button */}
      <div className="mt-6">
        <Link to="/create-trip">
          <Button size="lg" className="text-white bg-black hover:bg-gray-800">
            Get Started, It’s Free
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Hero
