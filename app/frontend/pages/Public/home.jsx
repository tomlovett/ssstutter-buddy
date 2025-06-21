import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="flex flex-col gap-[24px] w-full h-full align-middle gap-4 mt-4">
      <section className="intro w-full min-h-[250px] rounded-md bg-blue-100">
        <div className="p-10">
          <h2 className="font-bold mt-4">
            Join a community driving research innovation!
          </h2>
          <h3 className="font-bold mt-4">launches Summer 2025</h3>
          <div className="mt-4">
            <Button target="_blank" href="https://forms.gle/iYjiV8Uzc9oQMAeS8">
              Sign Up
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full min-h-[200px]">
        <p>
          SSStutterBuddy is entirely free-to-use for both researchers and PWS.
          We're not here to make money, <b>we're here to make a difference</b>.
          If you or your child have a stutter, you can support hard-working
          researchers as they advance our knowledge of stuttering's causes,
          expression, and treatment by particiating in studies. As a nice bonus,
          most studies compensate participants for their time and effort. So you
          can <b>do a good deed and get paid for it as well!</b>
        </p>
        <p className="lead self-center lg:self-start">
          You might be surprised, but the biggest impediment to stuttering
          research is usually not funding, research ideas, even technology —
          it's finding enough PWS to participate in the study!
        </p>
      </section>
    </div>
  )
}

export default Home
