import { Suspense } from 'react'
import EventCalendar from '@/components/EventCalendar'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

// Loading fallback component
function EventCalendarLoading() {
  return (
    <div className="min-h-screen bg-[#03045e] py-35 lg:px-20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading events...</p>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <div>
      <Navigation/>
      <Suspense fallback={<EventCalendarLoading />}>
        <EventCalendar enableAdmin={false}/>
      </Suspense>
      <Footer/>
    </div>
  )
}
export default Page