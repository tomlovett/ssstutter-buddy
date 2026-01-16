import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import PublicFooter from '@/components/Layout/PublicFooter'

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-slate-600 font-sans">
            Everything you need to know about SSStutterBuddy
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="public">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                Will people know that I am on SSStutterBuddy?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  No. SSStutterBuddy is a sealed environment. No data on participants, studies, or researchers
                  is publicly available.
                  <br />
                  <br />
                  Participants cannot see other participants on the platform. Only vetted researchers are able
                  to view anonymized participant data on the platform.{' '}
                  <span className="font-semibold">
                    There is no way for strangers or even other PWS to see who is on the platform.
                  </span>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mydata">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                What will researchers be able to see about me?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  A researcher will not be able to see any information about you unless you express interest
                  in one of their studies.
                  <br />
                  <br />
                  Researchers will be able to see your{' '}
                  <span className="font-semibold">
                    anonymous handle, age, sex, and distance from the study location
                  </span>
                  .
                  <br />
                  <br />
                  Your name and email will not be displayed to that researcher unless you confirm interest in
                  their study. Until then, they will only be able to see your anonymous handle and distance
                  from their location.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="money">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                How does SSStutterBuddy make money?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  That's the neat part. <span className="font-semibold">It doesn't.</span> SSStutterBuddy does
                  not take any of the compensation given to study participants, nor does it charge researchers
                  for posting studies.
                  <br />
                  <br />
                  Our mission is to help advance stuttering research. As such, we feel that any money
                  earmarked for research should go either towards the participants or the study itself, not a
                  third-party application.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="costs">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                But building a web application is expensive. How can SSStutterBuddy do it without money?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  The most expensive part of creating a new web application is not the technology,{' '}
                  <span className="font-semibold">it's paying the developers who write the code.</span>
                  <br />
                  <br />
                  SSStutterBuddy's founder, Tom Lovett, is a professional web developer who has donated his
                  time to build this project. Other tech professionals have also donated their time to help
                  build the project.
                  <br />
                  <br />
                  <span className="font-semibold">If you would like to volunteer for the project</span>, send
                  an email to tom at tomlovett dot com. Technical skills are preferred, but anyone can help!
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                I live in ____. Can I still join SSStutterBuddy?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  <span className="font-semibold">Yes!</span> SSStutterBuddy is available for PWS and
                  researchers all over the world. Our location-matching algorithm services 251 different
                  countries!
                  <br />
                  <br />
                  The website itself is only available in English for now, but free translation services like
                  Google Translate can be used until we support more.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="compensation">
              <AccordionTrigger className="text-lg font-medium text-slate-900 px-4 py-5 hover:no-underline">
                Do I have to accept the money for participating in a study?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <p className="text-slate-600 whitespace-pre-line text-left font-sans">
                  Most institutions require that researchers <i>give</i> you the advertised remuneration. That
                  said, you may have to take it but you don't have to keep it.
                  <br />
                  <br />
                  There's nothing stopping you from passing it along to your grandma, your favorite nephew, or
                  a charity.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}

export default FAQ
