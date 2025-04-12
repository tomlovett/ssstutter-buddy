import React, { useState } from 'react'
import { postRequest } from '@/lib/api'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'

const SelectRolePage = ({ user, token }) => {
  const [role, setRole] = useState('')

  const handleParticipantClick = () =>
    setRole(role === 'participant' ? '' : 'participant')

  const handleResearcherClick = () =>
    setRole(role === 'researcher' ? '' : 'researcher')

  const handleNextClick = async () => {
    try {
      await postRequest(`/u/${user.id}/select-role`, { role }, { token })
        .then(response => response.json())
        .then(({ researcher, participant }) => {
          if (researcher) {
            router.visit(`/r/${researcher.id}/edit`)
          } else {
            router.visit(`/p/${participant.id}/edit`)
          }
        })
    } catch (_error) {
      console.error(_error)
      toast.error('Error selecting role. Please reload and try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">
        Select The Role For Your Account
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Participant Button */}
        <div className="flex-1">
          <button
            onClick={handleParticipantClick}
            className={`w-full p-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xl font-semibold transition-colors ${role === 'participant' ? 'ring-4 ring-blue-300' : ''}`}
          >
            Participant
          </button>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-justify">
              You are a person who stutters (PWS) who is interested in
              participating in research studies centered around stuttering.
              <br />
              <br />
              You will use SSStutterBuddy to connect to research studies being
              conducted near you or online.
            </p>
          </div>
        </div>

        {/* Researcher Button */}
        <div className="flex-1">
          <button
            onClick={handleResearcherClick}
            className={`w-full p-8 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xl font-semibold transition-colors ${role === 'researcher' ? 'ring-4 ring-green-300' : ''}`}
          >
            Researcher
          </button>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 text-justify">
              You are a researcher at an academic or therapeutic institution who
              conducts research on stuttering.
              <br />
              <br />
              You will use SSStutterBuddy to connect with PWS who are interested
              in participating in your studies.
              <br />
              <br />
              Please note: All new researcher accounts are manually reviewed by
              the SSStutterBuddy team.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
          Back
        </button>
        <button
          onClick={handleNextClick}
          disabled={!role}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            role
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-blue-300 text-white cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SelectRolePage
