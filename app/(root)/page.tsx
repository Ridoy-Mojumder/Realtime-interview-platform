import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>AI-Powered Mock Interviews & Real-Time Feedback</h2>
        <p className='text-lg'>Practice real interview questions & get instant feedback.</p>
        <Button asChild className='bg-primary w-fit max-sm:w-full'>
          <Link href='/interview'>Start Practicing</Link>
        </Button>
      </div>
      <div>
        <Image src="/robot.png" alt="Interview Illustration" width={400} height={400} className='max-sm:hidden'/>
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Past Interviews</h2>
      <div className='interview-section flex flex-wrap gap-6'>
        {dummyInterviews.length > 0 ? (
          dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))
        ) : (
          <p>You haven&apos;t taken any interviews yet.</p>
        )}
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Pick Your Interview</h2>
      <div className='interview-section flex flex-wrap gap-6'>
        {dummyInterviews.length > 0 ? (
          dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))
        ) : (
          <p>You haven&apos;t taken any interviews yet.</p>
        )}
      </div>
    </section>
    </>
  )
}

export default page